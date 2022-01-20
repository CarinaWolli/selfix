import React from 'react';
import TutorialService from '../services/TutorialService';
import BikeComponentService from '../services/BikeComponentService';
import ToolCategoryService from '../services/ToolCategoryService';
import TutorialCreationStepOne from '../components/cms/TutorialCreationStepOne';
import TutorialCreationStepTwo from '../components/cms/TutorialCreationStepTwo';
import TutorialCreationStepThree from '../components/cms/TutorialCreationStepThree';
import { Grid, Card, CardContent, Typography, Stepper, Step, StepLabel } from '@material-ui/core';
import FileuploadService from '../services/FileuploadService';
import { Alert } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  main: {
    marginLeft: '280px',
    marginRight: '50px',
    height: '100%',
  },
}));

function TutorialCreation(props) {
  const classes = useStyles();
  const stepLabels = ['Basic Tutorial Information', 'Tutorial Steps', 'Related Products'];

  const [editMode, setEditMode] = React.useState();
  const [tutorialFetched, setTutorialFetched] = React.useState(false);
  const [componentsFetched, setComponentsFetched] = React.useState(false);
  const [toolsFetched, setToolsFetched] = React.useState(false);
  const [errorText, setErrorText] = React.useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState([]);
  const [bikeComponents, setBikeComponents] = React.useState([]);
  const [toolCategories, setToolCategories] = React.useState([]);
  const [tutorialFile, setTutorialFile] = React.useState();
  const [progress, setProgress] = React.useState(0);
  const [tutorial, setTutorial] = React.useState({
    name: '',
    description: '',
    imageUrl: '',
    difficulty: 'Medium',
    timeRequired: 60,
  });

  React.useEffect(async () => {
    if (props.match.params.tutorial) {
      setEditMode(true);

      try {
        const tutorial = await TutorialService.getTutorialWithBikeComponents(props.match.params.tutorial);
        setTutorial(tutorial);

        const tutorialSteps = tutorial.steps.map((obj) => {
          const step = {};
          step.title = obj.title;
          step.description = obj.description;
          step.mediaUrl = obj.mediaUrl;
          step.isPicStep = obj.type === 'text' ? true : false;
          return step;
        });
        setSteps(tutorialSteps);

        setTutorialFetched(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      setEditMode(false);
    }
  }, [props.match.params.tutorial]);

  React.useEffect(() => {
    if (tutorialFetched && componentsFetched && toolsFetched) {
      handleSelection(bikeComponents, setBikeComponents, tutorial.bikeComponents.map((obj) => obj._id), true);
      handleSelection(toolCategories, setToolCategories, tutorial.toolCategories.map((obj) => obj._id), true);
    }
  }, [tutorialFetched, componentsFetched, toolsFetched]);

  React.useEffect(async () => {
    try {
      if (props.match.params.tutorial) {
        const data = await BikeComponentService.getAvailableBikeComponents(props.match.params.tutorial);
        setBikeComponents(data.map((obj) => ({ ...obj, selected: false })));
        setComponentsFetched(true);
      } else {
        const data = await BikeComponentService.getUnmappedBikeComponents();
        setBikeComponents(data.map((obj) => ({ ...obj, selected: false })));
      }
    } catch(e) {
      setErrorText(e);
    }
  }, [props.match.params.tutorial]);

  React.useEffect(async () => {
    try{
      let data = await ToolCategoryService.getToolCategories();
      setToolCategories(data.map((obj) => ({ ...obj, selected: false })));
      setToolsFetched(true);
    } catch(e) {
      setErrorText(e);
    }
  }, [props.match.params.tutorial]);

  const addStep = (step) => {
    let updatedSteps = [...steps];
    updatedSteps.push(step);
    setSteps(updatedSteps);
  };

  const updateStep = (step, id) => {
    let updatedSteps = [...steps];
    updatedSteps[id] = step;
    setSteps(updatedSteps);
  };

  const deleteStep = (id) => {
    let updatedSteps = [...steps];
    updatedSteps.splice(id, 1);
    setSteps(updatedSteps);
  };

  const handleSliderChange = (propertyName, newValue) => {
    setTutorial({
      ...tutorial,
      [propertyName]: newValue,
    });
  };

  const handleTutorialChange = (event) => {
    setTutorial({
      ...tutorial,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Sets the selected property to boolVal for the object of the
   * state object with id in selectedIds.
   * @param {*} state
   * @param {*} setFunc
   * @param {*} selectedIds
   * @param {*} boolVal
   */
  const handleSelection = (state, setFunc, selectedIds, boolVal) => {
    const selectedItems = state
      .filter((obj) => selectedIds.includes(obj._id))
      .map((obj) => ({ ...obj, selected: boolVal }));

    let rest = state.filter((obj) => !selectedIds.includes(obj._id));
    if (boolVal === true) {
      rest = state.filter((obj) => !selectedIds.includes(obj._id)).map((obj) => ({ ...obj, selected: !boolVal }));
    }
    setFunc([...rest, ...selectedItems]);
  };

  const handleBCSelection = (rows) => {
    handleSelection(bikeComponents, setBikeComponents, rows.map((obj) => obj._id), true);
  };
  const handleDeselectBC = (id) => {
    handleSelection(bikeComponents, setBikeComponents, [id], false);
  };

  const handleTCSelection = (rows) => {
    handleSelection(toolCategories, setToolCategories, rows.map((obj) => obj._id), true);
  };
  const handleDeselectTC = (id) => {
    handleSelection(toolCategories, setToolCategories, [id], false);
  };

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const postTutorial = async () => {
    try {
      setProgress(0);
      let requestBody = {};
      requestBody.tutorial = tutorial;
      let fileuploadResponse = {};
      if (tutorialFile) {
        try {
          fileuploadResponse = await FileuploadService.uploadCMS(tutorialFile, 'tutorial');
          if (fileuploadResponse.files && fileuploadResponse.files.length > 0) {
            requestBody.tutorial.imageUrl = fileuploadResponse.files[0];
          } else {
            setErrorText('Tutorial:' + fileuploadResponse.message);
            setProgress(0);
            return;
          }
        } catch (e) {
          setErrorText('Tutorial: Error while file upload. Please go back to step 1.');
          setProgress(0);
          return;
        }
      }
      setProgress(5);
      requestBody.tutorial.toolCategories = [];
      requestBody.tutorial.toolCategories = toolCategories.filter((obj) => obj.selected).map((obj) => obj._id);

      requestBody.bikeComponentIds = bikeComponents.filter((obj) => obj.selected).map((obj) => obj._id);

      requestBody.textSteps = []; // List of text step objects
      requestBody.videoSteps = []; // List of video step objects

      await asyncForEach(steps, async (step) => {
        if (step.file) {
          try {
            fileuploadResponse = await FileuploadService.uploadCMS(step.file, 'tutorialstep');
            if (fileuploadResponse.files && fileuploadResponse.files.length > 0) {
              step.mediaUrl = fileuploadResponse.files[0];
            } else {
              setErrorText('Step ' + step.title + ':' + fileuploadResponse.message);
              setProgress(0);
              return;
            }
          } catch (e) {
            setErrorText('Step ' + step.title + ': Error while uploading file. Please go back to step 2.');
            setProgress(0);
            return;
          }
        }
        setProgress(progress + 100 / (steps.length + 1));
        delete step.file;
      });

      steps.map((step, index) => {
        step['position'] = index;
        const isPicStep = step.isPicStep;
        delete step.isPicStep;

        if (isPicStep) {
          requestBody.textSteps.push(step);
        } else {
          requestBody.videoSteps.push(step);
        }
      });

      if (editMode) {
        await TutorialService.updateTutorial(requestBody);
      } else {
        await TutorialService.createTutorial(requestBody);
      }

      setProgress(100);
      props.history.push('/admin/tutorials');
    } catch (error) {
      console.error(error);
      setProgress(0);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.main}>
      <Card>
        <CardContent>
          <Grid container spacing={5} justify="center" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h4" noWrap>
                Create New Tutorial
              </Typography>
              {errorText && (
                <Alert severity="error" onClose={() => setErrorText(undefined)}>
                  {errorText}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {stepLabels.map((label, index) => {
                  return (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>

            <Grid item xs={10}>
              {(() => {
                switch (activeStep) {
                  case 0:
                    return (
                      <TutorialCreationStepOne
                        setErrorText={setErrorText}
                        setTutorialFile={setTutorialFile}
                        tutorialFile={tutorialFile}
                        handleTutorialChange={handleTutorialChange}
                        handleSliderChange={handleSliderChange}
                        tutorial={tutorial}
                        handleSubmit={handleNext}
                      />
                    );
                  case 1:
                    return (
                      <TutorialCreationStepTwo
                        editMode={editMode}
                        setErrorText={setErrorText}
                        addStep={addStep}
                        updateStep={updateStep}
                        deleteStep={deleteStep}
                        setSteps={setSteps}
                        steps={steps}
                        handleBack={handleBack}
                        handleSubmit={handleNext}
                      />
                    );
                  case 2:
                    return (
                      <TutorialCreationStepThree
                        handleTCSelection={handleTCSelection}
                        handleDeselectBC={handleDeselectBC}
                        bikeComponents={bikeComponents}
                        handleBCSelection={handleBCSelection}
                        handleDeselectTC={handleDeselectTC}
                        toolCategories={toolCategories}
                        tutorialFile={tutorialFile}
                        handleBack={handleBack}
                        handleSubmit={postTutorial}
                      />
                    );
                }
              })()}
            </Grid>
          </Grid>
        </CardContent>
        {progress > 0 && <LinearProgress variant="determinate" value={progress} />}
      </Card>
    </div>
  );
}

export default TutorialCreation;
