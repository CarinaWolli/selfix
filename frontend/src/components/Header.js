import React from 'react';
import { AppBar, CssBaseline, IconButton, Toolbar, Badge, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AccountCircle from '@material-ui/icons/AccountCircle';

import UserProfileMenu from './UserProfileMenu';
import BikeBookmarkMenu from './BikeBookmarkMenu';
import TutorialBookmarkMenu from './TutorialBookmarkMenu';
import logo from '../images/Logo.png';
import CategorySidebar from './CategorySidebar';
import AutocompleteSearchComponent from './AutocompleteSearchComponent';
import { connect, useSelector } from 'react-redux';
import { closeSidebar, openSidebar } from '../redux/actions/sidebarActions';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  adminView: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    flexGrow: 1,
  },
  rightSided: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
  },
  logo: {
    maxWidth: 90,
    marginRight: theme.spacing(3),
  },
  searchBar: {
    minWidth: 350,
  },
}));

const StyledBadge = withStyles(() => ({
  badge: {
    right: -4,
    top: 0,
    padding: '0 4px',
  },
}))(Badge);

/**
 * Navigation bar of the app
 * @param {props} props
 */
function Header(props) {
  const classes = useStyles();
  const [menuAnchorUser, setMenuAnchorUser] = React.useState(null);
  const [menuAnchorTutorial, setMenuAnchorTutorial] = React.useState(null);
  const [menuAnchorBike, setMenuAnchorBike] = React.useState(null);

  const sideMenuOpen = useSelector((state) => {
    return state.sidebar.sidebarOpen;
  });

  const user = useSelector((state) => {
    return state.user.user;
  });

  const bookmarksRedux = useSelector((state) => state.bookmarks);

  const onSidebarOpen = () => {
    props.dispatch(openSidebar());
  };

  const onSidebarClose = () => {
    props.dispatch(closeSidebar());
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={props.location.pathname.substring(0, 6) === '/admin' ? classes.adminView : classes.appBar}
      >
        <UserProfileMenu
          open={Boolean(menuAnchorUser)}
          anchor={menuAnchorUser}
          onClose={() => setMenuAnchorUser(null)}
          user={user}
        />
        <BikeBookmarkMenu
          open={Boolean(menuAnchorBike)}
          anchor={menuAnchorBike}
          onClose={() => setMenuAnchorBike(null)}
        />
        <TutorialBookmarkMenu
          open={Boolean(menuAnchorTutorial)}
          anchor={menuAnchorTutorial}
          onClose={() => setMenuAnchorTutorial(null)}
        />
        <Toolbar className={classes.toolbar}>
          {props.location.pathname.substring(0, 6) === '/admin' ? (
            <div />
          ) : (
            <IconButton onClick={onSidebarOpen} edge="start" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
          )}
          <Button style={{ backgroundColor: 'transparent' }} disableRipple>
            <img src={logo} alt="logo" className={classes.logo} onClick={() => props.history.push('/')} />
          </Button>

          <div className={classes.searchBar}>
            <AutocompleteSearchComponent variant={'outlined'} />
          </div>
          <div className={classes.rightSided} />
          <IconButton onClick={(event) => setMenuAnchorTutorial(event.currentTarget)} color="inherit">
            <StyledBadge badgeContent={bookmarksRedux.bookmarkedTutorials.length} color="secondary">
              <BookmarkBorderIcon />
            </StyledBadge>
          </IconButton>
          <IconButton onClick={(event) => setMenuAnchorBike(event.currentTarget)} color="inherit">
            <StyledBadge badgeContent={bookmarksRedux.bookmarkedBikes.length} color="secondary">
              <DirectionsBikeIcon />
            </StyledBadge>
          </IconButton>
          <IconButton onClick={(event) => setMenuAnchorUser(event.currentTarget)} color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CategorySidebar open={sideMenuOpen} onClose={onSidebarClose} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
    dispatch,
  };
};

// connect() establishes the connection to the redux functionalities
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Header)
);
