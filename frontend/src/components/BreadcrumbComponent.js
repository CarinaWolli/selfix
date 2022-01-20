import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Breadcrumbs, Link, Paper } from '@material-ui/core';
import { Home, NavigateNext } from '@material-ui/icons';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  breadcrumbContainer: {
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  link: {
    fontSize: '1.1em',
    display: 'flex'
  },
  paper: {
    width: '',
    padding: theme.spacing(2)
  }
}));

function BikeResultTutorialPopover(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.breadcrumbContainer}>
      <Paper className={classes.paper}>
        <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNext fontSize="small" />}>
          {<Link
            key={'home'}
            onClick={() => props.history.push('/')}
            color={'inherit'}
            className={classes.link}>
            <Home fontSize='small'/>
          </Link>}
          {props.links.map((link,i) => <Link
            className={classes.link}
            key={i}
            onClick={() => props.history.push(link.href)}
            color={i === (props.links.length - 1) ? 'primary' : 'inherit'}
            aria-current={i === (props.links.length - 1) ? 'page' : null}
          >
            {link.name}
          </Link>)}
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

BikeResultTutorialPopover.propTypes = {
  links: PropTypes.array.isRequired
};

export default withRouter(BikeResultTutorialPopover);
