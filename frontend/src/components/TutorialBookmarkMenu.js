import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import TutorialService from '../services/TutorialService';
import BikeComponentService from '../services/BikeComponentService';

const useStyles = makeStyles(() => ({
  menuitem: {
    display: 'flex',
    minWidth: '200px',
  },
}));
/**
 * Menu for Bookmark tutorial
 * @param {props} props
 */
function TutorialBookmarkMenu(props) {
  const classes = useStyles();

  const bookmarksRedux = useSelector((state) => state.bookmarks.bookmarkedTutorials);

  const [bookmarks, setBookmarks] = React.useState([]);

  React.useEffect(async () => {
    if(bookmarksRedux.length === 0) {
      setBookmarks(null);
      return;
    }
    let tutorials = [];
    for(let index in bookmarksRedux) {
      try {
        tutorials.push({
          tutorial: await TutorialService.getTutorial(bookmarksRedux[index].tutorialId),
          component: await BikeComponentService.getBikeComponent(bookmarksRedux[index].componentId)
        });
        
      } catch(e) {
        console.log(e);
      }
    }
    console.log(tutorials);
    setBookmarks(tutorials);
  },[bookmarksRedux]);

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
      {!bookmarks? <MenuItem className={classes.menuitem} key={'empty'}>
        {'No bookmarks'}
      </MenuItem> : bookmarks.map((tutorialComp,i) => 
        <MenuItem 
          onClick={() => { 
            props.onClose();
            props.history.push('/tutorial/'+tutorialComp.tutorial._id+'/'+tutorialComp.component._id);
          }} 
          className={classes.menuitem} 
          key={i}
        >
          <div style={{ whiteSpace: 'pre-line'}}><b>{tutorialComp.tutorial.name}</b> for: <b>{tutorialComp.component.name}</b></div>
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
