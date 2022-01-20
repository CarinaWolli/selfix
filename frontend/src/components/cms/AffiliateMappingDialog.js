import React from 'react';
import PropTypes from 'prop-types';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { Dialog, DialogTitle, DialogActions, DialogContent, Button, DialogContentText } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

const ThumbRenderer = (params) => {
  return (<Zoom><img loading='lazy' src={params.value} alt='Thumbnail' style={{display: 'block', width: 35, height: 'auto' }} /></Zoom>);
};

const AffiliateMappingDialog = (props) => {

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  return <Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth
    maxWidth={'md'}
  >
    <DialogTitle id='alert-dialog-title'>Mapping of affiliate products to {props.tableSelect === 'tools' ? 'Tool Categories': 'Bike Components'}</DialogTitle>
    <DialogContent>
      <div style={{ width: '100%'}}>
        <div className='ag-theme-alpine' style={{ height: 400, width: '45%', float: 'left'}}>
          <AgGridReact
            rowData={props.selectedAffiliates}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
            defaultColDef={{
              sortable: true,
              filter: true,
            }}
            frameworkComponents={{
              thumbrenderer: ThumbRenderer
            }}
            enableBrowserTooltips
          >
            <AgGridColumn
              field='imageUrl'
              minWidth={20}
              headerName='Thumbnail'
              cellRenderer='thumbrenderer'
            />
            <AgGridColumn
              field='name'
              tooltipField='name'
            />
            <AgGridColumn
              headerName='Merchant'
              field='merchant_name'
              minWidth={80}
            />
          </AgGridReact>
        </div>
        <div style={{ width: '10%', float: 'left', height: 400, display: 'flex', justifyContent: 'center'}}>
          <ArrowForward style={{ display: 'block', margin: 'auto'}} />
        </div>
        <div className='ag-theme-alpine' style={{ height: 400, width: '45%', float: 'left'}}>
          <AgGridReact
            applyColumnDefOrder={true}
            rowData={props.selectedMapped}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
            defaultColDef={{
              sortable: true,
              filter: true,
            }}
            frameworkComponents={{
              thumbrenderer: ThumbRenderer
            }}
            columnDefs={props.tableSelect === 'tools' ? [
              {
                field: 'imageUrl',
                minWidth: 20,
                headerName: 'Thumbnail',
                cellRenderer: 'thumbrenderer'
              },
              {
                field: 'name',
                minWidth: 80,
                tooltipField: 'name'
              }
            ] : [
              {
                field: 'name',
                minWidth: 80,
                tooltipField: 'name'
              },
              {
                field: 'componentPart',
                minWidth: 80
              }
            ]}
            enableBrowserTooltips
          >
            {props.tableSelect === 'tools' ?
              <AgGridColumn
                field='imageUrl'
                minWidth={20}
                headerName='Thumbnail'
                cellRenderer='thumbrenderer'
              /> : null
            }
            {props.tableSelect !== 'tools' ?
              <AgGridColumn
                field='componentPart'
                minWidth={20}
              /> : null
            }
            <AgGridColumn
              field='name'
            />
          </AgGridReact>
        </div>
      </div>
      <DialogContentText style={{ color: 'red'}}>
        {props.errorText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color='secondary'>
        Cancel
      </Button>
      <Button
        onClick={props.handleConfirm}
        color='primary'
        autoFocus
        disabled={props.selectedMapped.length === 0 || props.selectedAffiliates === 0}
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>;
};

AffiliateMappingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedAffiliates: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedMapped: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  tableSelect: PropTypes.string.isRequired,
  errorText: PropTypes.string,
};

export default AffiliateMappingDialog;