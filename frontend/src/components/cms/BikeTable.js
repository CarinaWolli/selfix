import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { withRouter } from 'react-router-dom';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';
import { Edit, Delete, Remove } from '@material-ui/icons';
import BikeService from '../../services/BikeService';
import BikeBrandService from '../../services/BikeBrandService';
import BikeTypeService from '../../services/BikeTypeService';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import DeleteDialog from './DeleteDialog';
import DeleteManyDialog from './DeleteManyDialog';

const ThumbRenderer = (params) => {
  return (
    <Zoom wrapStyle={{ display: 'block' }}>
      <img loading="lazy" src={params.value} alt="Thumbnail" style={{ display: 'block', width: 35, height: 'auto' }} />
    </Zoom>
  );
};

const EditButtonRenderer = () => {
  return <Edit fontSize="small" style={{ display: 'block', margin: 'auto' }} />;
};

const DeleteButtonRenderer = () => {
  return <Delete fontSize="small" style={{ display: 'block', margin: 'auto' }} />;
};

const dateFormatter = (params) => {
  const date = params.value;
  let momentDate = moment(date);
  return momentDate.toString();
};

const EditDialog = (props) => {
  const [bike, setBike] = React.useState(null);

  React.useEffect(() => {
    setBike(props.bike);
  }, [props.bike]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.bike ? props.bike.name : ''}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          value={bike ? bike.name : ''}
          onChange={(event) => {
            setBike({
              ...bike,
              name: event.target.value,
            });
          }}
          fullWidth
        />
        <TextField
          margin="dense"
          id="desc"
          label="Description"
          value={bike ? bike.description : ''}
          onChange={(event) => {
            setBike({
              ...bike,
              description: event.target.value,
            });
          }}
          fullWidth
          multiline
        />
        <TextField
          margin="dense"
          id="image"
          label="Image"
          value={bike ? bike.imageUrl : ''}
          onChange={(event) => {
            setBike({
              ...bike,
              imageUrl: event.target.value,
            });
          }}
          fullWidth
        />
        <div>
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Bike Type</InputLabel>
            <Select
              value={bike ? (bike.bikeType ? bike.bikeType : '') : ''}
              onChange={(event) => {
                setBike({
                  ...bike,
                  bikeType: event.target.value,
                });
              }}
            >
              {props.types.map((type, index) => (
                <MenuItem key={index} value={type._id}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Bike Brand</InputLabel>
            <Select
              value={bike ? (bike.brand ? bike.brand : '') : ''}
              onChange={(event) => {
                setBike({
                  ...bike,
                  brand: event.target.value,
                });
              }}
            >
              {props.brands.map((brand, index) => (
                <MenuItem key={index} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => props.handleEdit(bike)} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const BikeTable = (props) => {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDeleteMany, setOpenDeleteMany] = React.useState(false);
  const [bikesToDelete, setBikesToDelete] = React.useState(null);

  const [bikeToEdit, setBikeToEdit] = React.useState(null);

  const handleClickOpenDelete = (bike) => {
    setBikeToEdit(bike);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setBikeToEdit(null);
  };

  const handleDelete = () => {
    BikeService.deleteBike(bikeToEdit._id);
    setTableData(tableData.filter((value) => value._id !== bikeToEdit._id));
    setOpenDelete(false);
    setBikeToEdit(null);
  };

  const handleClickOpenDeleteMany = () => {
    setBikesToDelete(gridApi ? gridApi.getSelectedRows().map((value) => value._id) : []);
    setOpenDeleteMany(true);
  };

  const handleCloseDeleteMany = () => {
    setBikesToDelete(null);
    setOpenDeleteMany(false);
  };

  const handleDeleteMany = async () => {
    try{
      await BikeService.deleteMany(bikesToDelete);
      setTableData(tableData.filter((value) => !bikesToDelete.includes(value._id)));
    } catch(e) {
      console.log(e);
    }
    setBikesToDelete(null);
    setOpenDeleteMany(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = (bike) => {
    setBikeToEdit(bike);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setBikeToEdit(null);
  };

  const handleEdit = (bike) => {
    const updatedBike = {
      ...bike,
      brand: bike.brand,
      bikeType: bike.bikeType,
    };
    setTableData(
      tableData.map((value) => {
        if (value._id === updatedBike._id) {
          return updatedBike;
        } else {
          return value;
        }
      })
    );
    BikeService.updateBike(updatedBike);
    setOpenEdit(false);
    setBikeToEdit(null);
  };

  const [brands, setBrands] = React.useState([]);
  const [brandsMap, setBrandsMap] = React.useState({});

  const [types, setTypes] = React.useState([]);
  const [typesMap, setTypesMap] = React.useState({});

  const [tableData,setTableData] = React.useState([]);
  const [gridApi,setGridApi] = React.useState(null);

  React.useEffect(async () => {
    try{
      const typeResult = await BikeTypeService.getBikeTypes();
      let newTypesMap = {};
      typeResult.forEach((element) => {
        newTypesMap[element._id] = element.title;
      });
      setTypes(typeResult);
      setTypesMap(newTypesMap);

      const brandResult = await BikeBrandService.getBikeBrands();
      let newBrandsMap = {};
      brandResult.forEach(element => {
        newBrandsMap[element._id] = element.name;
      });
      setBrands(brandResult);
      setBrandsMap(newBrandsMap);
      const bikeResult = await BikeService.getBikes();
      setTableData(bikeResult);
    } catch(e) {
      console.log(e);
    }
  }, []);

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
        rowSelection="multiple"
        enableBrowserTooltips
      >
        <AgGridColumn
          field="imageUrl"
          minWidth={20}
          headerName="Thumbnail"
          checkboxSelection={true}
          cellRenderer="thumbrenderer"
        />
        <AgGridColumn
          field="name"
          minWidth={80}
          onCellClicked={(params) => {
            props.history.push('/bike/' + params.data._id);
          }}
          tooltipField='name'
        />
        <AgGridColumn
          headerName="Bike Type"
          field="bikeType"
          minWidth={80}
          valueFormatter={(params) => {
            return typesMap[params.value] ? typesMap[params.value] : '';
          }}
        />
        <AgGridColumn
          headerName="Brand"
          field="brand"
          minWidth={80}
          valueFormatter={(params) => {
            return brandsMap[params.value] ? brandsMap[params.value] : '';
          }}
        />
        <AgGridColumn field="creationDate" minWidth={80} headerName="Creation Date" valueFormatter={dateFormatter} />
        <AgGridColumn field="lastUpdatedDate" minWidth={80} headerName="Last Update" valueFormatter={dateFormatter} />
        <AgGridColumn
          width={20}
          cellRenderer="editbutton"
          onCellClicked={(params) => {
            handleClickOpenEdit(params.data);
          }}
          cellStyle={{
            height: '100%',
            display: 'flex ',
            'justify-content': 'center',
            'align-items': 'center ',
          }}
        />
        <AgGridColumn
          width={20}
          onCellClicked={(params) => {
            handleClickOpenDelete(params.data);
          }}
          cellStyle={{
            height: '100%',
            display: 'flex ',
            'justify-content': 'center',
            'align-items': 'center ',
          }}
          cellRenderer="deletebutton"
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
      <DeleteDialog
        open={openDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        name={bikeToEdit ? bikeToEdit.name : ''}
      />
      <DeleteManyDialog
        open={openDeleteMany}
        handleClose={handleCloseDeleteMany}
        handleDelete={handleDeleteMany}
        names={gridApi ? gridApi.getSelectedRows().map((item) => item.name) : []}
      />
      <EditDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        handleEdit={handleEdit}
        bike={bikeToEdit}
        brands={brands}
        types={types}
      />
    </div>
  );
};

export default withRouter(BikeTable);
