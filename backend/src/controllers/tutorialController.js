'use strict';

const mongoose = require('mongoose');

const TutorialModel = require('../models/tutorial');

const TutorialVideoStepModel = require('../models/tutorialvideostep');
const TutorialTextStepModel = require('../models/tutorialtextstep');
const ToolCategoryModel = require('../models/toolcategory');
const ToolOptionModel = require('../models/tooloption');
const BikeComponentModel = require('../models/bikecomponent');
const UserModel = require('../models/user');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  }

  // handle the request
  try {
    let tut = req.body.tutorial;
    tut.creator = req.userId;
    // put referenced step ids in this array
    let textStepIds = [];
    let videoStepIds = [];

    let textSteps = req.body.textSteps;
    let videoSteps = req.body.videoSteps;
    let bikeComponentIds = req.body.bikeComponentIds;

    const createTutorial = async () => {
      // create tutorial steps in database
      await asyncForEach(textSteps, async (step) => {
        step.creator = req.userId;
        let createdStep = await TutorialTextStepModel.create(step);
        textStepIds.push(createdStep._id);
      });

      await asyncForEach(videoSteps, async (step) => {
        step.creator = req.userId;
        let createdStep = await TutorialVideoStepModel.create(step);
        videoStepIds.push(createdStep._id);
      });

      // add step ids to the tutorial
      tut.textSteps = textStepIds;
      tut.videoSteps = videoStepIds;

      // create tutorial in database
      let tutorial = await TutorialModel.create(tut);

      // update bike component tutorial references
      await asyncForEach(bikeComponentIds, async (id) => {
        await BikeComponentModel.findOneAndUpdate(
          { _id: id },
          { tutorial: tutorial._id },
          {
            timestamps: false,
            new: true,
            runValidators: true,
          }
        ).exec();
      });

      // return created tutorial
      return res.status(201).json(tutorial);
    };

    createTutorial();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const removeOne = async (id) => {
  await TutorialModel.findByIdAndRemove(id, { useFindAndModify: false }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (!doc) {
      console.log('Doc not found');
    } else {
      doc.textSteps.forEach((stepId) => {
        TutorialTextStepModel.findByIdAndRemove(stepId).exec();
      });

      doc.videoSteps.forEach((stepId) => {
        TutorialVideoStepModel.findByIdAndRemove(stepId).exec();
      });

      // remove tutorial references from bike components
      BikeComponentModel.updateMany({ tutorial:id }, { tutorial: null }).exec();
      // remove reference in tutorials
      UserModel.updateMany({},{ $pullAll: { tutorialBookmarks: [id]}}).exec();
    }
  }).catch((e) => console.log(e));
};

const remove = async (req, res) => {
  try {
    await removeOne(req.params.id);
    return res.status(200).json({
      message: `Deleted tutorial with id ${req.params.id}`
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const deleteMany = (req, res) => {
  let deletedTutorialIds = [];
  req.body.tutorialIds.forEach(async (id) => {
    try {
      await removeOne(id);
      deletedTutorialIds.push(id);
    } catch (err) {
      console.log('Failed to delete a tutorial');
    }
  });
  return res.status(200).json({
    deletedTutorialIds
  });
};

const read = async (req, res) => {
  try {
    // get tutorial with id from database
    let tutorial = await TutorialModel.findById(req.params.id);

    // get referenced tutorial steps
    await tutorial
      .populate({ path: 'videoSteps', model: TutorialVideoStepModel })
      .populate({ path: 'textSteps', model: TutorialTextStepModel })
      .populate({ path: 'toolCategories', model: ToolCategoryModel })
      .execPopulate();

    // if no tutorial with id is found, return 404
    if (!tutorial) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Tutorial not found',
      });
    }

    // return gotten tutorial
    return res.status(200).json(tutorial);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const readWithToolOptions = async (req, res) => {
  try {
    // get tutorial with id from database
    let tutorial = await TutorialModel.findById(req.params.id);

    // get referenced tutorial steps
    await tutorial
      .populate({ path: 'videoSteps', model: TutorialVideoStepModel })
      .populate({ path: 'textSteps', model: TutorialTextStepModel })
      .populate({ path: 'toolCategories', model: ToolCategoryModel })
      .execPopulate();

    // if no tutorial with id is found, return 404
    if (!tutorial) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Tutorial not found',
      });
    }

    let tools = {};
    await asyncForEach(tutorial.toolCategories, async (toolCategory) => {
      let toolOptions = await ToolOptionModel.find({
        toolCategory: toolCategory,
      })
        .limit(2)
        .exec();

      tools[toolCategory.name] = toolOptions;
    });
    tutorial.toolOptions = tools;

    // return gotten tutorial
    return res.status(200).json(tutorial);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const readWithBikeComponents = async (req, res) => {
  try {
    // get tutorial with id from database
    let tutorial = await TutorialModel.findById(req.params.id);

    // get referenced tutorial steps
    await tutorial
      .populate({ path: 'videoSteps', model: TutorialVideoStepModel })
      .populate({ path: 'textSteps', model: TutorialTextStepModel })
      .populate({ path: 'toolCategories', model: ToolCategoryModel })
      .execPopulate();

    // if no tutorial with id is found, return 404
    if (!tutorial) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Tutorial not found',
      });
    }

    let bikeComponents = await BikeComponentModel.find({ tutorial: tutorial }).exec();
    tutorial.bikeComponents = bikeComponents;

    // return gotten tutorial
    return res.status(200).json(tutorial);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    // get all tutorials in database
    let tutorials = await TutorialModel.find({})
      .populate({ path: 'videoSteps', model: TutorialVideoStepModel })
      .populate({ path: 'textSteps', model: TutorialTextStepModel })
      .populate({ path: 'toolCategories', model: ToolCategoryModel })
      .exec();

    // return gotten tutorials
    return res.status(200).json(tutorials);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });
  }

  // handle the request
  try {
    let tut = req.body.tutorial;
    tut.lastEditor = req.userId;
    // put referenced step ids in this array
    let textStepIds = [];
    let videoStepIds = [];

    let textSteps = req.body.textSteps;
    let videoSteps = req.body.videoSteps;
    let bikeComponentIds = req.body.bikeComponentIds;

    // contains the step ids that do not exist anymore in incoming update
    let textStepIdsToDelete = tut.textSteps.filter((s) => !textSteps.map((s) => s.id).includes(s.id)).map((s) => s.id);
    let videoStepIdsToDelete = tut.videoSteps
      .filter((s) => !videoSteps.map((s) => s.id).includes(s.id))
      .map((s) => s.id);

    const updateTutorial = async () => {
      // delete abandoned tutorial steps in database
      textStepIdsToDelete.forEach((stepId) => {
        TutorialTextStepModel.findByIdAndRemove(stepId).exec();
      });

      videoStepIdsToDelete.forEach((stepId) => {
        TutorialVideoStepModel.findByIdAndRemove(stepId).exec();
      });

      // update/create tutorial steps in database
      await asyncForEach(textSteps, async (step) => {
        if (!step._id) {
          step._id = new mongoose.Types.ObjectId();
        }

        step.creator = req.userId;
        const createdStep = await TutorialTextStepModel.findOneAndUpdate({ _id: step._id }, step, {
          upsert: true,
          timestamps: false,
          new: true,
          runValidators: true,
        }).exec();

        textStepIds.push(createdStep._id);
      });

      await asyncForEach(videoSteps, async (step) => {
        if (!step._id) {
          step._id = new mongoose.Types.ObjectId();
        }

        step.creator = req.userId;
        const createdStep = await TutorialVideoStepModel.findOneAndUpdate({ _id: step._id }, step, {
          upsert: true,
          timestamps: false,
          new: true,
          runValidators: true,
        }).exec();

        videoStepIds.push(createdStep._id);
      });

      // overwrite steps with updated list of step ids
      tut.textSteps = textStepIds;
      tut.videoSteps = videoStepIds;

      // find and update tutorial with id
      let tutorial = await TutorialModel.findByIdAndUpdate(req.params.id, tut, {
        new: true,
        runValidators: true,
      }).exec();

      // remove tutorial references from removed bike components
      let previousComponents = await BikeComponentModel.find({ tutorial: tutorial._id }).exec();
      let bikeComponentIDsRemoved = previousComponents
        .map((obj) => obj._id)
        .filter((id) => !bikeComponentIds.includes(id));

      bikeComponentIDsRemoved.forEach((id) => {
        BikeComponentModel.findOneAndUpdate(
          { _id: id },
          { tutorial: null },
          {
            timestamps: false,
            new: true,
            runValidators: true,
          }
        ).exec();
      });

      // update bike component tutorial references
      await asyncForEach(bikeComponentIds, async (id) => {
        await BikeComponentModel.findOneAndUpdate(
          { _id: id },
          { tutorial: tutorial._id },
          {
            timestamps: false,
            new: true,
            runValidators: true,
          }
        ).exec();
      });

      // return updated tutorial
      return res.status(200).json(tutorial);
    };

    updateTutorial();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

module.exports = {
  create,
  read,
  readWithToolOptions,
  readWithBikeComponents,
  list,
  remove,
  update,
  deleteMany
};
