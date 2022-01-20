import React from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { Grid, Card, CardContent, Typography, IconButton, Box, Collapse } from '@material-ui/core';
import { Comment } from '@material-ui/icons';
import CommentComponent from './CommentComponent.js';
import Image from 'material-ui-image';

import TutorialTextStepService from '../services/TutorialTextStepService.js';
import TutorialVideoStepService from '../services/TutorialVideoStepService.js';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600,
  },
  commentIcon: {
    height: 24,
    width: 24,
  },
  descriptionText: {
    whiteSpace: 'pre-line'
  }
}));
 
function TutorialStep(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [nrOfComments, setNrOfComments] = React.useState(props.nrOfComments);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const changeNrOfComments = (newNrOfComments) => {
    setNrOfComments(newNrOfComments);
  };

  React.useEffect(async () => {
    (async () => {
      if (props.type === 'text') {
        const data = await TutorialTextStepService.getTutorialTextStep(props.stepId);
        setNrOfComments(data.comments.length);
      } else if (props.type === 'video') {
        const data = await TutorialVideoStepService.getTutorialVideoStep(props.stepId);
        setNrOfComments(data.comments.length);
      }
    })();
  }, []);

  function MediaDisplay(props) {
    const type = props.type;
    const mediaUrl = props.mediaUrl;
    const description = props.description;
    if (type === 'text') {
      return (
        <Grid item container spacing={5} justify="flex-start">
          <Grid item xs={6} sm={4}>
            <Image disableTransition src={mediaUrl} />
          </Grid>

          <Grid item xs={6} sm={8}>
            <Typography variant="body1" color="textPrimary" className={classes.descriptionText}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      );
    } else if (type === 'video') {
      return (
        <Grid item container spacing={1} justify="flex-start" wrap="wrap">
          <Grid item md={12} lg={7}>
            <ReactPlayer url={mediaUrl} controls={true} />
          </Grid>

          <Grid item md lg>
            <Typography variant="body1" color="textPrimary"  className={classes.descriptionText}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Grid item xs={12}>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item xs={3} sm={2} md={1}>
            <Typography variant="h5" className={classes.title} noWrap>
              Step {props.stepNr + 1}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{props.title}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1} direction="column" alignItems="flex-end">
                  <MediaDisplay type={props.type} mediaUrl={props.mediaUrl} description={props.description} />

                  <Grid item xs={12}>
                    <IconButton onClick={handleExpandClick}>
                      <Comment className={classes.commentIcon} />

                      <Box pl={1}>
                        <Typography>{nrOfComments} Comments</Typography>
                      </Box>
                    </IconButton>
                  </Grid>
                </Grid>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CommentComponent stepId={props.stepId} type={props.type} changeNrOfComments={changeNrOfComments} />
                </Collapse>
              </CardContent>
            </Card>
          </Grid> 
        </Grid>
      </Box>
    </Grid>
  );
}

TutorialStep.propTypes = {
  stepNr: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mediaUrl: PropTypes.string.isRequired,
};

export default TutorialStep;
