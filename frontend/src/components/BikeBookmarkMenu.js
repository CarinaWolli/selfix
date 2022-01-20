import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Menu, MenuItem} from '@material-ui/core';
import {connect, useSelector} from 'react-redux';
import BikeService from '../services/BikeService';

const useStyles = makeStyles(() => ({
  menuitem: {
    display: 'flex',
    minWidth: '200px',
  },
}));

/**
 * Menu for Bookmark Bike
 * @param {props} props
 */
function TutorialBookmarkMenu(props) {
  const classes = useStyles();

  const bookmarksRedux = useSelector(
    (state) => state.bookmarks.bookmarkedBikes);

  const [bookmarkedBikes, setBookmarkedBikesState] = React.useState([]);

  React.useEffect(async () => {
    try {
      if (bookmarksRedux.length === 0) {
        setBookmarkedBikesState(null);
        return;
      }
      let bikes = [];
      for (let index in bookmarksRedux) {
        try {
          bikes.push(await BikeService.getBike(bookmarksRedux[index]));
        } catch(e) {
          console.log(e);
        }
      }
      setBookmarkedBikesState(bikes);
    } catch(e) {
      console.log(e);
    }
  }, [bookmarksRedux]);

  return (
    <Menu
      open={props.open}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorEl={props.anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {!bookmarkedBikes ? <MenuItem className={classes.menuitem} key={'empty'}>
        {'No bookmarks'}
      </MenuItem> :
        bookmarkedBikes.map((bike, i) => <MenuItem onClick={() => {
          props.onClose();
          props.history.push('/bike/' + bike._id);
        }} className={classes.menuitem} key={i}>
          {bike.name}
        </MenuItem>)}
    </Menu>
  );
}
// attributes of props and their type
TutorialBookmarkMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
};

export default withRouter(connect()(TutorialBookmarkMenu));
