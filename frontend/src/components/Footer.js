import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles((theme) => ({
  footerRoot: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
    marginTop: 'auto',
    backgroundColor: 'lightgrey',
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
}));

/**
 * Footer of the app
 * @param {props} props
 */
function Footer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.history.location.pathname.substring(0, 6) === '/admin' ? null : (
        <footer className={classes.footerRoot}>
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <CopyrightIcon />
            <Typography variant="h6">SELFIX</Typography>
          </Box>
        </footer>
      )}
    </React.Fragment>
  );
}

export default withRouter(Footer);
