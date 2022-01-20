import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Select, MenuItem, Button } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import AffiliateProductService from '../../services/AffiliateProductService';
import ToolCategoryService from '../../services/ToolCategoryService';
import BikeComponentService from '../../services/BikeComponentService';
import AffiliateMappingDialog from './AffiliateMappingDialog';

import { setAffiliateCount } from '../../redux/actions/affiliateCountAcions';
import { connect } from 'react-redux';

const ThumbRenderer = (params) => {
  return (<Zoom wrapStyle={{ display: 'block'}}><img loading='lazy' src={params.value} alt='Thumbnail' style={{display: 'block', width: 35, height: 'auto' }} /></Zoom>);
};

const LinkRenderer = (params) => {
  return (<a href={params.value} target='_blank' rel='noreferrer'>Link</a>);
};

const AffiliateMapping = (props) => {

  const [affiliateProducts, setAffiliateProducts] = React.useState([]);

  React.useEffect(async () => {
    try {
      setAffiliateProducts(await AffiliateProductService.getUnmappedAffiliateProducts());
    } catch(e) {
      console.log(e);
    }
  },[]);

  const [toolCategories, setToolCategories] = React.useState([]);

  React.useEffect(async () => {
    try{
      setToolCategories(await ToolCategoryService.getToolCategories());
    } catch(e) {
      console.log(e);
    }
  },[]);

  const [bikeComponents, setBikeComponents] = React.useState([]);

  React.useEffect(async () => {
    try {
      setBikeComponents(await BikeComponentService.getBikeComponents());
    } catch(e) {
      console.log(e);
    }
  },[]);

  const [affiliateGridApi,setAffiliateGridApi] = React.useState(null);
  const [mappedGridApi,setMappedGridApi] = React.useState(null);

  const [selectedAffiliates,setSelectedAffiliates] = React.useState([]);
  const [selectedMapped,setSelectedMapped] = React.useState([]);

  const [dialogOpen,setDialogOpen] = React.useState(false);

  const [tableSelect,setTableSelect] = React.useState('tools');

  const [dialogErrorText,setDialogErrorText] = React.useState('');

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };
  
  return <div style={{height: 600 }}>
    <div style={{ width: '100%' ,height: 55}}>
      <div style={{ width: '35%', float: 'right', padding: 10}}>
        <Select
          value={tableSelect}
          onChange={(event) => {
            setTableSelect(event.target.value);
          }}
          style={{ width: '100%', fontSize: '1.25em'}}
        >
          <MenuItem value={'tools'}>Tool Categories</MenuItem>
          <MenuItem value={'components'}>Bike Components</MenuItem>
        </Select>
      </div>
    </div>
    <div className='ag-theme-alpine' style={{ height: '100%', width: '60%', float: 'left'}}>
      <AgGridReact rowData={affiliateProducts}
        onGridReady={(params) => setAffiliateGridApi(params.api)}
        onFirstDataRendered={onFirstDataRendered}
        onGridSizeChanged={onGridSizeChanged}
        frameworkComponents={{
          thumbrenderer: ThumbRenderer,
          linkrenderer: LinkRenderer
        }}
        defaultColDef={{
          sortable: true,
          filter: true,
        }}
        rowSelection='multiple'
        enableBrowserTooltips
      >
        <AgGridColumn
          field='imageUrl'
          minWidth={20}
          headerName='Thumbnail'
          checkboxSelection={true}
          cellRenderer='thumbrenderer'
        />
        <AgGridColumn
          headerName='Merchant'
          field='merchant_name'
          minWidth={80}
        />
        <AgGridColumn
          field='name'
          minWidth={80}
          tooltipField='name'
        />
        <AgGridColumn
          field='affiliateLink'
          minWidth={80}
          cellRenderer='linkrenderer'
        />
        <AgGridColumn
          field='price'
          valueFormatter={(params) => params.value ? params.value + '€' : '-/-'}
        />
      </AgGridReact>
    </div>
    <div style={{ width: '5%', float: 'left', height: '100%', display: 'flex', justifyContent: 'center'}}>
      <ArrowForward style={{ display: 'block', margin: 'auto'}} />
    </div>
    <div style={{ height: '100%', width: '35%', float: 'left', display: 'block'}}>
      <div className='ag-theme-alpine' style={{ height: '100%', width: '100%'}}> 
        <AgGridReact rowData={tableSelect === 'tools' ? toolCategories : bikeComponents}
          onGridReady={(params) => setMappedGridApi(params.api)}
          onFirstDataRendered={onFirstDataRendered}
          onGridSizeChanged={onGridSizeChanged}
          frameworkComponents={{
            thumbrenderer: ThumbRenderer
          }}
          defaultColDef={{
            sortable: true,
            filter: true,
          }}
          onGridColumnsChanged={onGridSizeChanged}
          applyColumnDefOrder={true}
          columnDefs={tableSelect === 'tools' ? [
            {
              field: 'imageUrl',
              minWidth: 20,
              headerName: 'Thumbnail',
              checkboxSelection: true,
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
              checkboxSelection: true,
              tooltipField: 'name'
            },
            {
              field: 'componentPart',
              minWidth: 80
            }
          ]}
          rowSelection={tableSelect === 'tools' ? 'single' : 'multiple'}
          enableBrowserTooltips
        />
      </div>
    </div>
    <Button
      variant='contained'
      style={{ marginTop: 10, float: 'right', width: '35%'}}
      color='primary'
      onClick={() => {
        if(affiliateGridApi && mappedGridApi) {
          setSelectedAffiliates(affiliateGridApi.getSelectedRows());
          setSelectedMapped(mappedGridApi.getSelectedRows());
          setDialogOpen(true);
        }
      }}
    >
      Confirm Mapping
    </Button>
    <AffiliateMappingDialog
      selectedAffiliates={selectedAffiliates}
      selectedMapped={selectedMapped}
      tableSelect={tableSelect} 
      open={dialogOpen}
      errorText={dialogErrorText}
      handleClose={() => {
        setSelectedAffiliates([]);
        setSelectedMapped([]);
        setDialogErrorText('');
        setDialogOpen(false);
      }}
      handleConfirm={async () => {
        try {
          if(tableSelect === 'tools') {
            await AffiliateProductService.mapAffiliatesToToolsCategories(
              selectedAffiliates.map(item => item._id),
              selectedMapped.map((item) => item._id),
            );
          } else {
            await AffiliateProductService.mapAffiliatesToBikeComponents(
              selectedAffiliates.map(item => item._id),
              selectedMapped.map((item) => item._id),
            );
          }
          setSelectedAffiliates([]);
          setSelectedMapped([]);
          setDialogErrorText('');
          const newAffiliates = 
            await AffiliateProductService.getUnmappedAffiliateProducts();
          props.setAffiliateCountRedux(newAffiliates.length);
          setAffiliateProducts(newAffiliates);
          setDialogOpen(false);
        } catch(error) {
          setDialogErrorText(error);
        }
      }}
    />
  </div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAffiliateCountRedux: (count) => dispatch(setAffiliateCount(count)),
    dispatch
  };
};

export default connect(null,mapDispatchToProps)(AffiliateMapping);