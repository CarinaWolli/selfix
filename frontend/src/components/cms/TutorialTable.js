import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { withRouter } from 'react-router-dom';
import TutorialService from '../../services/TutorialService';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';
import { Edit ,Delete, Remove } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import DeleteDialog from './DeleteDialog';
import DeleteManyDialog from './DeleteManyDialog';

const ThumbRenderer = (params) => {
  return (<Zoom wrapStyle={{ display: 'block'}}><img loading='lazy' src={params.value} alt='Thumbnail' style={{display: 'block', width: 35, height: 'auto' }} /></Zoom>);
};

const EditButtonRenderer = () => {
  return <Edit fontSize='small' style={{display: 'block', margin: 'auto'}}/>;
};

const DeleteButtonRenderer = () => {
  return <Delete fontSize='small' style={{display: 'block', margin: 'auto'}}/>;
};

const dateFormatter = (params) => {
  const date = params.value;
  let momentDate = moment(date);
  return momentDate.toString();
};

const TutorialTable = (props) => {

  const [open, setOpen] = React.useState(false);
  const [openDeleteMany, setOpenDeleteMany] = React.useState(false);
  const [tutorialsToDelete, setTutorialsToDelete] = React.useState(null);

  const [tutorialToDelete, setTutorialToDelete] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTutorialToDelete(null);
  };

  const handleDelete = () => {
    TutorialService.deleteTutorial(tutorialToDelete._id);
    setTableData(tableData.filter((value) => value._id !== tutorialToDelete._id));
    setOpen(false);
    setTutorialToDelete(null);
  };

  const handleClickOpenDeleteMany = () => {
    setTutorialsToDelete(gridApi ? gridApi.getSelectedRows().map((value) => value._id) : []);
    setOpenDeleteMany(true);
  };

  const handleCloseDeleteMany = () => {
    setTutorialsToDelete(null);
    setOpenDeleteMany(false);
  };

  const handleDeleteMany = async () => {
    try {
      await TutorialService.deleteManyTutorials(tutorialsToDelete);
      setTableData(tableData.filter((value) => !tutorialsToDelete.includes(value._id)));
    } catch(e) {
      console.log(e);
    }
    setTutorialsToDelete(null);
    setOpenDeleteMany(false);
  };


  const [tableData,setTableData] = React.useState([]);
  const [gridApi,setGridApi] = React.useState(null);

  React.useEffect(async () => {
    try{
      const result = await TutorialService.getTutorials();
      setTableData(result);
    }catch(e) {
      console.log(e);
    }
  },[]);

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 600 }}>
      <AgGridReact rowData={tableData}
        onGridReady={(params) => setGridApi(params.api)}
        onFirstDataRendered={onFirstDataRendered}
        onGridSizeChanged={onGridSizeChanged}
        frameworkComponents={{
          thumbrenderer: ThumbRenderer,
          editbutton: EditButtonRenderer,
          deletebutton: DeleteButtonRenderer,
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
          cellRenderer='thumbrenderer'
          checkboxSelection={true}
        />
        <AgGridColumn
          field='name'
          minWidth={80}
          onCellClicked={(params) => {
            props.history.push('/tutorial/' + params.data._id);
          }}
          tooltipField='name'
        />
        <AgGridColumn
          field='description'
          minWidth={80}
          maxWidth={400}
        />
        <AgGridColumn
          field='textSteps.length'
          headerName='Text Steps'
          minWidth={20}
        />
        <AgGridColumn
          field='videoSteps.length'
          headerName='Video Steps'
          minWidth={20}
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
          cellRenderer='editbutton'
          onCellClicked={(params)=> props.history.push('/admin/tutorialcreation/' + params.data._id)}
          cellStyle={{
            'height': '100%',
            'display': 'flex ',
            'justify-content': 'center',
            'align-items': 'center ',
          }}
        />
        <AgGridColumn
          width={20}
          cellRenderer='deletebutton'
          cellStyle={{
            'height': '100%',
            'display': 'flex ',
            'justify-content': 'center',
            'align-items': 'center ',
          }}
          onCellClicked={(params) => {
            setTutorialToDelete(params.data);
            handleClickOpen();
          }}
        />
      </AgGridReact>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<Remove />}
        style={{
          display: 'flex',
          marginLeft: 'auto',
          marginTop: '5px',
          marginBottom: '8px'
        }}
        onClick={handleClickOpenDeleteMany}
      >
        Delete Selected
      </Button>
      <DeleteManyDialog
        open={openDeleteMany}
        handleClose={handleCloseDeleteMany}
        handleDelete={handleDeleteMany}
        names={gridApi ? gridApi.getSelectedRows().map((item) => item.name) : []}
      />
      <DeleteDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        name={tutorialToDelete ? tutorialToDelete.name : ''}/>
    </div>
  );
};

export default withRouter(TutorialTable);
