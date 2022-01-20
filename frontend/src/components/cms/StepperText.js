import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function StepperText(props) {
  switch (props.type) {
    case 'title':
      return (
        <Grid hidden={props.hidden} item xs={12}>
          <Typography variant="h5">{props.primaryText}</Typography>
          <Typography variant="body1" color="textSecondary">
            {props.secondaryText}
          </Typography>
        </Grid>
      );
    case 'heading':
      return (
        <Grid hidden={props.hidden} item xs={12}>
          <Typography variant="h6" noWrap>
            {props.primaryText}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {props.secondaryText}
          </Typography>
        </Grid>
      );
    case 'error':
      return (
        <Grid hidden={props.hidden} item xs={12}>
          <Typography variant="body1" color="error">
            {props.errorText}
          </Typography>
        </Grid>
      );
  }
}

StepperText.propTypes = {
  type: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  errorText: PropTypes.string,
};

export default StepperText;
