import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Grid,
  TextField,
  InputLabel,
  Slider,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from '@material-ui/core';
import Image from 'material-ui-image';
import StepperText from './StepperText';
import FileuploadComponent from '../FileuploadComponent';
import { Close } from '@material-ui/icons';
import FileuploadService from '../../services/FileuploadService';

const SelfixSlider = withStyles({
  root: {
    color: '#fa7132',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

/**
 * Step one tutorial creation
 * @param {props} props
 */
function TutorialCreationStepOne(props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const handleDifficultyChange = (event, newValue) => {
    let difficulty;
    switch (newValue) {
      case 0:
        difficulty = 'Easy';
        break;
      case 1:
        difficulty = 'Medium';
        break;
      case 2:
        difficulty = 'Hard';
        break;
      default:
        difficulty = 'Medium';
    }
    props.handleSliderChange('difficulty', difficulty);
  };

  const handleTimeRequiredChange = (event, newValue) => {
    props.handleSliderChange('timeRequired', newValue);
  };

  function uploadFile(fileToUpload, fileToUploadName, error) {
    props.setErrorText(error);
    props.setTutorialFile(fileToUpload);
  }

  function removeIcon() {
    props.setTutorialFile(undefined);
    if (props.tutorial.imageUrl !== '') {
      setDeleteDialogOpen(true);
    }
  }

  const handleDeleteFile = () => {
    (async () => {
      setDeleteDialogOpen(false);
      const imageUrl = props.tutorial.imageUrl;
      props.tutorial.imageUrl = '';
      try {
        await FileuploadService.deleteFile(imageUrl);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const difficultyMarks = [
    {
      value: 0,
      label: 'Easy',
    },
    {
      value: 1,
      label: 'Medium',
    },
    {
      value: 2,
      label: 'Hard',
    },
  ];

  const timeMarks = [
    {
      value: 5,
      label: '5',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 60,
      label: '60',
    },
    {
      value: 90,
      label: '90',
    },
    {
      value: 120,
      label: '120',
    },
  ];

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid style={{ minHeight: '60vh' }} container spacing={3} alignItems="flex-start">
        <StepperText
          type="title"
          primaryText="Basic Tutorial Information"
          secondaryText="Upload an image. Enter a title and a description."
        />

        <Grid style={{ minHeight: '45vh' }} item container xs={5} sm={4} md={3} alignItems="flex-start">
          <Grid item container spacing={1} xs={12}>
            <Grid item xs={12}>
              <Paper variant="outlined">
                <Image
                  loading={false}
                  src={props.tutorialFile ? URL.createObjectURL(props.tutorialFile) : props.tutorial.imageUrl}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Upload file"
                variant="outlined"
                value={props.tutorialFile ? props.tutorialFile.name : props.tutorial.imageUrl}
                fullWidth
                required
                InputProps={{
                  endAdornment: !(props.tutorialFile || props.tutorial.imageUrl) ? (
                    <FileuploadComponent
                      files={1}
                      sizeLimit={10 * 1024 * 1024}
                      allowedMimeTypes={['image/png', 'image/jpeg']}
                      uploadFunction={uploadFile}
                    />
                  ) : (
                    <Close onClick={removeIcon} />
                  ),
                }}
              />
              <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogContent>
                  <DialogContentText>{'Are you sure you want to delete the file?'}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteFile} color="primary" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container spacing={3} xs={7} sm={8} md={9} alignItems="flex-start">
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              name="name"
              value={props.tutorial.name}
              onChange={props.handleTutorialChange}
              required
              multiline
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={props.tutorial.description}
              onChange={props.handleTutorialChange}
              required
              multiline
              fullWidth
              rows={10}
            />
          </Grid>

          <Grid container item xs={12} justify="space-around">
            <Grid item xs={12} md={3}>
              <InputLabel>Difficulty</InputLabel>
              <SelfixSlider
                defaultValue={1}
                aria-labelledby="discrete-slider-custom"
                step={1}
                min={0}
                max={2}
                marks={difficultyMarks}
                name="difficulty"
                onChange={handleDifficultyChange}
                aria-label="pretto slider"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputLabel>Time Required [minutes]</InputLabel>
              <SelfixSlider
                defaultValue={60}
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider-custom"
                step={5}
                min={5}
                max={120}
                marks={timeMarks}
                name="timeRequired"
                onChange={handleTimeRequiredChange}
                aria-label="pretto slider"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <footer>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <Button type="button" disabled variant="outlined" color="primary">
              Back
            </Button>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </Grid>
      </footer>
    </form>
  );
}

TutorialCreationStepOne.propTypes = {
  tutorial: PropTypes.object.isRequired,
  tutorialFile: PropTypes.object,
  handleTutorialChange: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  setErrorText: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default TutorialCreationStepOne;
