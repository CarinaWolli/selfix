import {Drawer, IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {ArrowRightIcon} from '@material-ui/pickers/_shared/icons/ArrowRightIcon';
import {Clear} from '@material-ui/icons';
import BikeCategoryService from '../services/BikeCategoryService';
import {ArrowLeftIcon} from '@material-ui/pickers/_shared/icons/ArrowLeftIcon';
import {connect} from 'react-redux';
import {closeSidebar} from '../redux/actions/sidebarActions';
import logo from '../images/Logo.png';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 300,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 300,
  },
  closeIconGrid: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  },
  drawerHeader:{
    background: theme.palette.primary.main
  },
  categoryHeader: {
    fontWeight: 'bold'
  },
  rightArrow: {
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
}));

/**
 * Sidebar with category search
 * @param {props} props
 */
function CategorySidebar(props) {
  const classes = useStyles();
  const [bikeCategories, setBikeCategories] = React.useState([]);
  const [isRoot, setIsRoot] = React.useState(true);
  const [rootCategory, setRootCategory] = React.useState(null);
  const [categoryTree, setCategoryTree] = React.useState([]);

  React.useEffect(async () => {
    try {
      const categories = await BikeCategoryService.getBikeCategories();
      setIsRoot(true);
      setCategoryTree(categories);
      setBikeCategories(categories);
    } catch (e) {
      console.log(e);
    }
  }, [props.open]);

  return (
    <React.Fragment>
      <Drawer
        onClose={() => props.toggleSidebarClosed()}
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid container className={classes.drawerHeader}>
          <Grid item xs={6}>
            <img src={logo} alt="logo" style={{width: '100%'}}/>
          </Grid>
          <Grid item xs={6} className={classes.closeIconGrid}>
            {isRoot ?
              <IconButton onClick={props.onClose}>
                <Clear/>
              </IconButton> : <IconButton
                onClick={() => {
                  setBikeCategories(categoryTree);
                  setIsRoot(true);
                  setRootCategory(null);
                }}>
                <ArrowLeftIcon/>
              </IconButton>}
          </Grid>
        </Grid>
        <Divider/>
        <List>
          <ListItem className={classes.categoryHeader}>All Categories</ListItem>
          {bikeCategories.map((category) => (
            <ListItem button key={category.id}
              onClick={category.children && category.children.length
                      > 0 ? () => {
                  setBikeCategories(category.children);
                  setIsRoot(false);
                  setRootCategory(category);
                } : () => {
                  rootCategory ? props.history.push(
                    '/categorySearch/' + rootCategory.id + '/'
                          + category.id) : props.history.push(
                    '/categorySearch/' + category.id + '/0');
                  props.toggleSidebarClosed();
                }}>
              <ListItemText primary={category.name}/>
              {category.children && category.children.length > 0 ?
                <ListItemIcon className={classes.rightArrow}>
                  <ArrowRightIcon/>
                </ListItemIcon> : null}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

// attributes of props and their type
CategorySidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebarClosed: () => dispatch(closeSidebar()),
    dispatch
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CategorySidebar));
