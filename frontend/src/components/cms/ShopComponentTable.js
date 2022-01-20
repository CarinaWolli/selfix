import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';
import { Delete } from '@material-ui/icons';
import ShopComponentService from '../../services/ShopComponentService';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import DeleteDialog from './DeleteDialog';

const ThumbRenderer = (params) => {
  return (<Zoom wrapStyle={{ display: 'block'}}><img loading='lazy' src={params.value} alt='Thumbnail' style={{display: 'block', width: 35, height: 'auto' }} /></Zoom>);
};

const LinkRenderer = (params) => {
  return (<a href={params.value} target='_blank' rel='noreferrer'>Link</a>);
};

const DeleteButtonRenderer = () => {
  return <Delete fontSize='small' style={{display: 'block', margin: 'auto'}}/>;
};

const dateFormatter = (params) => {
  const date = params.value;
  let momentDate = moment(date);
  return momentDate.toString();
};

const ShopComponentTable = () => {

  const [tableData,setTableData] = React.useState([]);

  React.useEffect(async () => {
    try {
      const shopComponents = await ShopComponentService.getShopComponents();
      setTableData(shopComponents);
    } catch(e) {
      console.log(e);
    }
  }, []);

  const [componentToDelete,setComponentToDelete] = React.useState(null);
  const handleCloseDelete = () => {
    setComponentToDelete(null);
  };

  const handleDelete = async () => {
    try{
      await ShopComponentService.deleteShopComponent(componentToDelete._id);
      setTableData(tableData.filter((value) => value._id !== componentToDelete._id));
    } catch(e) {
      console.log(e);
    }
    setComponentToDelete(null);
  };


  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 600 }}>
      <AgGridReact rowData={tableData}
        onFirstDataRendered={onFirstDataRendered}
        onGridSizeChanged={onGridSizeChanged}
        frameworkComponents={{
          thumbrenderer: ThumbRenderer,
          deletebutton: DeleteButtonRenderer,
          linkrenderer: LinkRenderer,
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
        <AgGridColumn
          field='bikeComponents'
          valueFormatter={(params) => params.value.length}
        />
        <AgGridColumn
          field='creationDate'
          minWidth={80}
          headerName='Creation Date'
          valueFormatter={dateFormatter}
        />
        <AgGridColumn
          field='lastUpdatedDate'
          minWidth={80}
          headerName='Last Update'
          valueFormatter={dateFormatter}
        />
        <AgGridColumn
          width={20}
          onCellClicked={(params) => {
            setComponentToDelete(params.data);
          }}
          cellStyle={{
            'height': '100%',
            'display': 'flex ',
            'justify-content': 'center',
            'align-items': 'center ',
          }}
          cellRenderer='deletebutton'
        />
      </AgGridReact>
      <DeleteDialog
        open={componentToDelete !== null}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        name={componentToDelete ? componentToDelete.name : ''}
      />
    </div>
  );
};

export default ShopComponentTable;
