import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToolOptionTable from '../components/cms/ToolOptionTable';
 
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

function ToolOptionsAdminView() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <ToolOptionTable />
    </div>
  );
}

export default ToolOptionsAdminView;
