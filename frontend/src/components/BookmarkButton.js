import React from 'react';
import { IconButton } from '@material-ui/core';
import { BookmarkBorder, Bookmark } from '@material-ui/icons';
import PropTypes from 'prop-types';

function BookmarkButton(props) {
  return <IconButton
    onClick={() => props.bookmarkFunc()}
  >{props.bookmarked ? <Bookmark style={{ fontSize: props.size }} /> : <BookmarkBorder style={{ fontSize: props.size }} />}</IconButton>;
}

BookmarkButton.propTypes = {
  bookmarked: PropTypes.bool,
  size: PropTypes.number,
  bookmarkFunc: PropTypes.func,
};

export default BookmarkButton;
