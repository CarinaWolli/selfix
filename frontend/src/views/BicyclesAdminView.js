import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BikeTable from '../components/cms/BikeTable';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
 
const useStyles = makeStyles(() => ({
  main: {
    marginLeft: '280px',
    marginRight: '50px',
    height: '100%'
  },
  button: {
    display: 'flex',
    marginLeft: 'auto',
    marginTop: '5px',
    marginBottom: '8px',
  }
}));

function BicyclesAdminView() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Add Bicycle
      </Button>
      <BikeTable/>
    </div>
  );
}

export default BicyclesAdminView;
