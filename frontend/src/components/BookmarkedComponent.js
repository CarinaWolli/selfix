import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { OpenInNew } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: '30vh',
  },
  image: {
    height: '20vh',
    width: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
  },
  link: {
    color: '#FFF',
  },
}));

function BookmarkedComponent(props) {
  const classes = useStyles();

  return !props.item ? (
    <Card elevation={0} className={classes.card}>
      <CardContent />
    </Card>
  ) : (props.uri === 'tutorial' ? 
    <Link to={`/${props.uri}/${props.item.tutorial._id}/${props.item.component._id}`} className={classes.link}>
      <Card elevation={0} className={classes.card}>
        <CardMedia className={classes.image} component="img" image={props.item.tutorial.imageUrl} title={props.item.tutorial.name} />
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
            <Typography variant="body1">
              <div>
                <b>{props.item.tutorial.name}</b><br/>for: <b>{props.item.component.name}</b>
              </div>
            </Typography>
            <IconButton aria-label="open">
              <OpenInNew />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions />
      </Card>
    </Link> :
    <Link to={`/${props.uri}/${props.item._id}`} className={classes.link}>
      <Card elevation={0} className={classes.card}>
        <CardMedia className={classes.image} component="img" image={props.item.imageUrl} title={props.item.name} />
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
            <Typography variant="body1">{props.item.name}</Typography>
            <IconButton aria-label="open">
              <OpenInNew />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions />
      </Card>
    </Link>
  );
}

BookmarkedComponent.propTypes = {
  item: PropTypes.object,
  uri: PropTypes.string,
};

export default withRouter(connect()(BookmarkedComponent));
