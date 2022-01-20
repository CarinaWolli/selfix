import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShopComponentTable from '../components/cms/ShopComponentTable';
 
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

function ShopComponentAdminView() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <ShopComponentTable />
    </div>
  );
}

export default ShopComponentAdminView;
