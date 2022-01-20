import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from '@material-ui/core';
import StepperText from './StepperText';
import SelectTable from './SelectTable';

/**
 * Step three tutorial creation
 * @param {props} props
 */
function TutorialCreationStepThree(props) {
  const [paramsApiBC, setParamsApiBC] = React.useState(null);
  const [paramsApiTC, setParamsApiTC] = React.useState(null);

  const handleConfirmBC = () => {
    props.handleBCSelection(paramsApiBC.getSelectedRows());
  };

  const handleConfirmTC = () => {
    props.handleTCSelection(paramsApiTC.getSelectedRows());
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.handleSubmit();
      }}
    >
      <Grid style={{ minHeight: '60vh' }} container spacing={3} alignItems="flex-start" justify="center">
        <StepperText
          type="title"
          primaryText={'Related Products'}
          secondaryText="Select the bike components that match this tutorial and select the necessary tools."
        />

        <Grid style={{ minHeight: '45vh' }} item container spacing={2} xs={12}>
          <SelectTable
            data={props.bikeComponents}
            handleConfirm={handleConfirmBC}
            handleDeselect={props.handleDeselectBC}
            title="Select Bike Components"
            columns={[
              { field: 'componentPart', name: 'Component Part', sortable: true, minWidth: 250 },
              { field: 'name', name: 'Name', sortable: true, minWidth: 250 },
            ]}
            setParamsApi={setParamsApiBC}
          />

          <SelectTable
            data={props.toolCategories}
            handleConfirm={handleConfirmTC}
            handleDeselect={props.handleDeselectTC}
            title="Select Tool Categories"
            columns={[
              { field: 'imageUrl', name: 'Image', sortable: false, minWidth: 50, cellRenderer: 'imagerenderer' },
              { field: 'name', name: 'Name', sortable: true, minWidth: 250 },
            ]}
            setParamsApi={setParamsApiTC}
          />
        </Grid>
      </Grid>
      <footer>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item>
            <Button type="button" variant="contained" color="primary" onClick={props.handleBack}>
              Back
            </Button>
          </Grid>

          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </footer>
    </form>
  );
}

TutorialCreationStepThree.propTypes = {
  handleBCSelection: PropTypes.func.isRequired,
  handleDeselectBC: PropTypes.func.isRequired,
  bikeComponents: PropTypes.array.isRequired,
  handleTCSelection: PropTypes.func.isRequired,
  handleDeselectTC: PropTypes.func.isRequired,
  toolCategories: PropTypes.array.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default TutorialCreationStepThree;
