import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Box, Link } from '@material-ui/core';
import BookmarkButton from './BookmarkButton';
import { withRouter } from 'react-router';

const useStyles = makeStyles(() => ({
  image: {
    width: 300,
    height: 'auto',
  },
  button: {
    textTransform: 'none',
    fontWeight: 'bold',
    paddingLeft: '10px',
  },
}));

function BikeSearchListItem(props) {
  const classes = useStyles();

  return (
    <Card display="flex">
      <Box m={3} display="flex" flexDirection="row" alignItems="flex-start">
        <Box bgcolor="white">
          <Link
            onClick={() => {
              props.history.push('/bike/' + props.bike._id);
            }}
          >
            <CardMedia component="img" className={classes.image} image={props.bike.imageUrl} title={props.bike.name} />
          </Link>
        </Box>
        <Box flexGrow={1}>
          <CardContent flex-grow={4} display="flex">
            <Typography gutterBottom variant="h5">
              {props.isBikeResultView ? (
                <Typography variant="h5">{props.bike.name}</Typography>
              ) : (
                <Link
                  onClick={() => {
                    props.history.push('/bike/' + props.bike._id);
                  }}
                >
                  {props.bike.name}
                </Link>
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.bike.description}
            </Typography>

            {props.isBikeResultView ? (
              <Box mt={5}>
                <Typography variant="body1">
                  To see a list of related tutorials select an area on the bicycle below!
                </Typography>
              </Box>
            ) : null}
          </CardContent>
        </Box>
        <Box flex-grow={1}>
          <BookmarkButton bookmarked={props.bookmarked} size={40} bookmarkFunc={props.bookmarkFunc} />
        </Box>
      </Box>
    </Card>
  );
}

BikeSearchListItem.propTypes = {
  bike: PropTypes.object.isRequired,
  bookmarked: PropTypes.bool.isRequired,
  bookmarkFunc: PropTypes.func.isRequired,
  isBikeResultView: PropTypes.bool,
};

export default withRouter(BikeSearchListItem);
