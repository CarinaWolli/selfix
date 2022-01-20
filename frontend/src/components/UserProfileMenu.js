import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {logout} from '../redux/actions';
import {Menu, MenuItem, Avatar, Divider} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {
  setBookmarkedBikes,
  setBookmarkedTutorials
} from '../redux/actions/bookmarkActions';
import PersonIcon from '@material-ui/icons/Person';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  menuitem: {
    display: 'flex',
    minWidth: '200px',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  admin: {
    marginLeft: '8px',
    marginRight: theme.spacing(1),
    fontweight: 'bold',
  }
}));
/**
 * Menu for user management
 * @param {props} props
 */
function KebabMenu(props) {
  const classes = useStyles();

  const onClickLogin = () => {
    // close this menu
    props.onClose();
    // navigate to the login page
    props.history.push('/login');
  };

  const noClickAdminView = () => {
    // close this menu
    props.onClose();
    // navigate to the admin page
    props.history.push('/admin/bicycles');
  };

  const onClickLogout = () => {
    // trigger redux logout action
    props.dispatch(logout());

    props.dispatch(setBookmarkedBikes([]));
    props.dispatch(setBookmarkedTutorials([]));
    // close this menu
    props.onClose();
    // navigate to the home page
    props.history.push('/');
  };

  return (
    <Menu
      open={props.open}
      anchorEl={props.anchor}
      onClose={props.onClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {props.user
        ? 
        [
          <MenuItem key="user" className={classes.menuitem}>
            <Avatar className={classes.avatar}>{props.user.username
              ? props.user.username[0] : ''}</Avatar>
            {props.user.username}
          </MenuItem>,
          props.user.role === 'admin' ? [
            <MenuItem key="admin" className={classes.menuitem} onClick={noClickAdminView}>     
              <PersonIcon className={classes.admin}/>
              Admin view
            </MenuItem>,
          ] : <div/>,
          <Divider key="divider" />,
          <MenuItem key="logout" onClick={onClickLogout} className={classes.menuitem}>
            <ExitToAppIcon className={classes.avatar} />
            Logout
          </MenuItem>,
        ]
        : [
          <MenuItem key="login" onClick={onClickLogin}
            className={classes.menuitem}>
            <VerifiedUserIcon className={classes.avatar}/>
            Login
          </MenuItem>,
        ]}
    </Menu>
  );
}

// attributes of props and their type
KebabMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.object,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object
};


export default withRouter(connect()(KebabMenu));
