import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AffiliateMapping from '../components/cms/AffiliateMapping';

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

const AffiliateMappingView = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.main}>
      <AffiliateMapping/>
    </div>
  );
};

export default AffiliateMappingView;
