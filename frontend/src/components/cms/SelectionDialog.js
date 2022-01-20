import React from 'react';
import PropTypes from 'prop-types';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const rowHeight = 70;

const ImageRenderer = (params) => {
  return (
    <img
      loading="lazy"
      src={params.value}
      alt="Thumbnail"
      style={{
        display: 'block',
        height: 'auto',
        width: rowHeight,
      }}
    />
  );
};

function SelectionDialog(props) {
  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };
  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <Dialog open={props.open} maxWidth="lg" fullWidth={true}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <div className="ag-theme-alpine" style={{ height: 600 }}>
          <AgGridReact
            rowHeight={rowHeight}
            onGridReady={props.onGridReady}
            rowData={props.data}
            rowSelection="multiple"
            rowMultiSelectWithClick={true}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
            frameworkComponents={{
              imagerenderer: ImageRenderer,
            }}
            defaultColDef={{
              sortable: true,
              filter: true,
            }}
          >
            <AgGridColumn checkboxSelection={true} />
            {props.columns.map((col, index) => {
              return (
                <AgGridColumn
                  key={index}
                  sortable={col.sortable}
                  field={col.field}
                  minWidth={col.minWidth}
                  headerName={col.name}
                  cellRenderer={col.cellRenderer}
                />
              );
            })}
          </AgGridReact>
        </div>
      </DialogContent>
      <DialogActions>
        <Grid item container spacing={1} justify="center" alignItems="center" xs={12}>
          <Grid item>
            <Button variant="outlined" onClick={props.handleCancel} color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={props.handleConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

SelectionDialog.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
};

export default SelectionDialog;
