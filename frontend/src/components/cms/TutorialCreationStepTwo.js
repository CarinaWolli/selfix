import React from 'react';
import {
  Grid,
  Box,
  Paper,
  Card,
  CardContent,
  TextField,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import StepperText from './StepperText';
import FileuploadComponent from '../FileuploadComponent';
import Image from 'material-ui-image';
import { Close } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RootRef from '@material-ui/core/RootRef';
import FileuploadService from '../../services/FileuploadService';

const useStyles = makeStyles({
  stepListCard: {
    height: '100%',
    borderWidth: '1px',
    borderColor: '#616161',
    maxHeight: '100%',
    overflow: 'auto',
  },
  stepCard: {
    minHeight: '43vh',
    borderWidth: '1px',
    borderColor: '#616161',
  },
  child: {
    height: 272,
    overflow: 'auto',
  },
  cardContent: {
    padding: '0px',
  },
  listRoot: {
    width: '100%',
  },
  button: {
    width: '100%',
    borderRadius: 0,
  },
  listItemText: {
    fontSize: '0.8em',
  },
});

const listTitle = (step) => {
  let title;
  const limit = 20;
  if (step.title) {
    if (step.title.length > limit) {
      title = `${step.title.substring(0, limit)}...`;
    } else {
      title = step.title;
    }
  } else {
    title = 'No title yet';
  }
  return title;
};

/**
 * Step two tutorial creation
 * @param {props} props
 */
function TutorialCreationStepTwo(props) {
  const classes = useStyles();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [allOtherStepsFilled, setAllOtherStepsFilled] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [step, setStep] = React.useState({
    title: '',
    description: '',
    mediaUrl: '',
    isPicStep: true,
    file: undefined,
  });

  React.useEffect(() => {
    setStep(props.steps[stepIndex]);
  }, [stepIndex]);

  React.useEffect(() => {
    let filled = true;

    if (props.steps.length === 0) {
      filled = false;
    }

    props.steps.forEach((step) => {
      const stepTitleFilled = step.title && step.title !== '';
      const stepDescriptionFilled = step.description && step.description !== '';
      const stepHasFile = step.file || step.mediaUrl !== '';

      const allRequiredFilled = stepTitleFilled && stepDescriptionFilled && stepHasFile;
      if (!allRequiredFilled) {
        filled = false;
      }
    });

    setAllOtherStepsFilled(filled);
  }, [props.steps]);

  const addStep = (isPicStep) => {
    setStepIndex(props.steps.length);
    const newStep = {
      title: '',
      description: '',
      mediaUrl: '',
      isPicStep: !!isPicStep,
      file: undefined,
    };
    props.addStep(newStep);
    setStep(newStep);
  };

  function deleteStep(index) {
    const stepToDelete = props.steps[index];
    if (props.editMode) {
      (async () => {
        try {
          await FileuploadService.deleteFile(stepToDelete.mediaUrl);
        } catch (e) {
          console.log(e);
        }
      })();
    }

    if (props.steps.length === 1) {
      setStepIndex(-1);
    } else if (index === 0) {
      setStepIndex(0);
      setStep(props.steps[index + 1]);
    } else {
      setStepIndex(index - 1);
      setStep(props.steps[index - 1]);
    }
    props.deleteStep(index);
  }

  function handleChange(event) {
    const updatedStep = {
      ...step,
      [event.target.name]: event.target.value,
    };

    setStep(updatedStep);
    props.updateStep(updatedStep, stepIndex);
  }

  const handleDeleteFile = (step) => {
    (async () => {
      setDeleteDialogOpen(false);
      if (step.file) {
        step.file = undefined;
      } else {
        try {
          const imageUrl = step.mediaUrl;
          step.mediaUrl = '';
          await FileuploadService.deleteFile(imageUrl);
        } catch (e) {
          props.setErrorText('Error while deleting file for step ' + step.title);
        }
      }
      props.updateStep(step, stepIndex);
    })();
  };

  function uploadFile(fileToUpload, fileName, error) {
    step.file = fileToUpload;
    handleChange(event);
    props.setErrorText(error);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reorderedSteps = reorder(props.steps, result.source.index, result.destination.index);
    setStepIndex(result.destination.index);
    setStep(props.steps[result.destination.index]);
    props.setSteps(reorderedSteps);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: 'rgb(235,235,235)',
    }),
  });

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid style={{ minHeight: '60vh' }} container spacing={3} alignItems="flex-start">
        <StepperText
          type="title"
          primaryText="Tutorial Steps"
          secondaryText="Upload an image. Enter a title and a description."
        />
        <Grid style={{ minHeight: '45vh' }} item container>
          <Grid item container spacing={3} xs={12}>
            <Grid item xs={12} md={3}>
              <Card className={classes.stepListCard} variant="outlined">
                <CardContent className={classes.cardContent}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        style={{ background: 'lightgrey' }}
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          addStep(true);
                        }}
                        endIcon={<ImageIcon />}
                      >
                        Add
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        style={{ background: 'lightgrey' }}
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          addStep(false);
                        }}
                        endIcon={<VideocamIcon />}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                  <div className={classes.listRoot}>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided) => {
                          return (
                            <RootRef rootRef={provided.innerRef}>
                              <List disablePadding>
                                {props.steps.map((step, index) => {
                                  return (
                                    <Draggable key={index} draggableId={`step-${index}`} index={index}>
                                      {(provided, snapshot) => (
                                        <ListItem
                                          dense
                                          divider
                                          ContainerComponent="li"
                                          ContainerProps={{
                                            ref: provided.innerRef,
                                          }}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                          button
                                          selected={stepIndex === index}
                                          onClick={() => {
                                            setStep(step);
                                            setStepIndex(index);
                                          }}
                                        >
                                          <ListItemIcon>
                                            {step.isPicStep ? (
                                              <ImageIcon fontSize="small" />
                                            ) : (
                                              <VideocamIcon fontSize="small" />
                                            )}
                                          </ListItemIcon>
                                          <ListItemText
                                            classes={{
                                              primary: classes.listItemText,
                                              secondary: classes.listItemText,
                                            }}
                                            primary={`Step ${index + 1}`}
                                            secondary={listTitle(step, index)}
                                          />
                                          <ListItemSecondaryAction hidden={!!snapshot.isDragging}>
                                            <IconButton
                                              edge="end"
                                              aria-label="delete"
                                              onClick={() => deleteStep(index)}
                                            >
                                              <HighlightOffIcon fontSize="small" />
                                            </IconButton>
                                          </ListItemSecondaryAction>
                                        </ListItem>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </List>
                            </RootRef>
                          );
                        }}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            {props.steps.length > 0 ? (
              <Grid item container spacing={2} alignItems="flex-start" xs md>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems="flex-start" spacing={2}>
                    <Grid item container xs={12} md={4} spacing={2}>
                      <Grid item xs={12}>
                        {step.isPicStep ? (
                          <Paper variant="outlined">
                            <Box>
                              <Image loading={false} src={step.file ? URL.createObjectURL(step.file) : step.mediaUrl} />
                            </Box>
                          </Paper>
                        ) : (
                          <Paper elevation={0} variant={step.file || step.mediaUrl ? null : 'outlined'}>
                            <Box>
                              {step.file ? (
                                <ReactPlayer url={URL.createObjectURL(step.file)} controls={true} width="100%" height="100%" />
                              ) : step.mediaUrl ? (
                                <ReactPlayer url={step.mediaUrl} controls={true} width="100%" height="100%" />
                              ) : (
                                <Image loading={false} />
                              )}
                            </Box>
                          </Paper>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Upload file"
                          variant="outlined"
                          value={step.file ? step.file.name : step.mediaUrl}
                          fullWidth
                          required
                          InputProps={{
                            endAdornment: !(step.file || step.mediaUrl) ? (
                              <FileuploadComponent
                                files={1}
                                sizeLimit={100 * 1024 * 1024}
                                allowedMimeTypes={step.isPicStep ? ['image/png', 'image/jpeg'] : ['video/mp4']}
                                uploadFunction={uploadFile}
                              />
                            ) : (
                              <Close onClick={() => setDeleteDialogOpen(true)} />
                            ),
                          }}
                        />
                      </Grid>
                      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                        <DialogContent>
                          <DialogContentText>{'Are you sure you want to delete the file?'}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={() => handleDeleteFile(step)} color="primary" autoFocus>
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                    <Grid item container xs md spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={step.title}
                          id="outlined-basic"
                          label="Title"
                          variant="outlined"
                          size="small"
                          name="title"
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={step.description}
                          id="outlined-multiline-static"
                          label="Description"
                          multiline
                          rows={12}
                          variant="outlined"
                          name="description"
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={8}>
                {props.steps.length <= 0 ? (
                  <StepperText
                    type="heading"
                    primaryText="No tutorial steps yet!"
                    secondaryText="Use the buttons on the left to add either an image-based or a video-based tutorial step."
                  />
                ) : (
                  <StepperText
                    type="heading"
                    primaryText="You already created some tutorial steps."
                    secondaryText="Click on a step on the left to edit it or add a new step by using the buttons below."
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Grid>

        {!allOtherStepsFilled ? (
          <StepperText
            type="error"
            errorText="At least one tutorial step has not been filled out yet. To continue you must first finish each step."
          />
        ) : (
          <StepperText type="heading" secondaryText="Created all necessary steps? Click 'Next' to continue." />
        )}
      </Grid>
      <footer>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <Button type="button" variant="contained" color="primary" onClick={props.handleBack}>
              Back
            </Button>
          </Grid>

          <Grid item>
            <Button disabled={!allOtherStepsFilled} type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </Grid>
      </footer>
    </form>
  );
}

TutorialCreationStepTwo.propTypes = {
  editMode: PropTypes.bool.isRequired,
  steps: PropTypes.array.isRequired,
  addStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  setErrorText: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default TutorialCreationStepTwo;
