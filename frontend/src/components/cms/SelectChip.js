import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Chip } from '@material-ui/core';

function SelectChip(props) {
  return (
    <Grid container spacing={1}>
      {props.selected.map((nameAndId, index) => (
        <Grid item xs={12} key={index}>
          <Chip
            label={nameAndId[0]}
            color={index % 2 === 0 ? 'primary' : 'secondary'}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onDelete={() => {
              props.handleDeselect(nameAndId[1]);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

SelectChip.propTypes = {
  selected: PropTypes.array.isRequired,
  handleDeselect: PropTypes.func.isRequired,
};

export default SelectChip;
