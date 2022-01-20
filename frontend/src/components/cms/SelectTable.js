import React from 'react';
import PropTypes from 'prop-types';
import { OpenInNew } from '@material-ui/icons';
import { Card, CardContent, Input, Grid, Select, FormControl, InputLabel } from '@material-ui/core';
import SelectionDialog from './SelectionDialog';
import SelectChip from './SelectChip';

function SelectTable(props) {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const onGridReady = (params) => {
    params.api.forEachNode((node) => {
      if (node.data.selected === true) {
        node.setSelected(true);
      }
    });

    props.setParamsApi(params.api);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    props.handleConfirm();
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" square>
        <CardContent>
          <SelectionDialog
            data={props.data}
            columns={props.columns}
            open={openDialog}
            title={props.title}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            onGridReady={onGridReady}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>{props.title}</InputLabel>
            <Select
              required
              IconComponent={OpenInNew}
              multiple
              value={props.data.filter((obj) => obj.selected).map((obj) => [obj.name, obj._id])}
              input={<Input />}
              onOpen={() => {
                setOpen(false);
                setOpenDialog(true);
              }}
              open={open}
              renderValue={(selected) => <SelectChip selected={selected} handleDeselect={props.handleDeselect} />}
            />
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}

SelectTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleDeselect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  setParamsApi: PropTypes.func.isRequired,
};

export default SelectTable;
