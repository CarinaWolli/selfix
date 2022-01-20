import React from 'react';
import { Link } from 'react-router-dom';
import {Drawer, Divider, ListItem, ListItemText, Collapse, Badge} from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '240px',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '240px',
  },
  drawerContainer: {
    overflow: 'auto',
    marginTop: '70px'
  },
  title: {
    fontWeight: 'bold'
  }, 
  link: {
    textDecoration: 'none', 
    color: 'black'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedNarrow: {
    width: '60%',
  },
  mappedBadge: {
    float: 'right',
    marginRight: 10
  }
}));

function ContentManagementMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const StyledBadge = withStyles(() => ({
    badge: {
      right: -12,
      top: 0,
      margin: '0 12px',
    },
  }))(Badge);

  const count = useSelector((state) => state.affiliates.count);

  return (
    <div>
      <Grid container>
        <Grid item>
          <Drawer variant='permanent'
            classes={{
              paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerContainer}>
              <List>
                <ListItem className={ classes.title }>Content Management</ListItem>
                <Divider />
                <Link to="/admin/bicycles" style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem button>
                    <ListItemText primary="Bicycles" />
                  </ListItem>
                </Link>
                <Link to="/admin/tutorials" style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem button>
                    <ListItemText primary="Tutorials" />
                  </ListItem>
                </Link>
                <Link to='/admin/bicycles' style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem button>
                    <ListItemText primary="Components" />
                  </ListItem>
                </Link>
                <ListItem button onClick={handleClick}>
                  <ListItemText primary="Affliate Products" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to='/admin/shopComponents' style={{ textDecoration: 'none', color: 'black'}}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Shop Components" />
                      </ListItem>
                    </Link>
                    <Link to='/admin/toolOptions' style={{ textDecoration: 'none', color: 'black' }}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Tool Options" />
                      </ListItem>
                    </Link>
                    <Link to='/admin/affiliate' style={{ textDecoration: 'none', color: 'black' }}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Mapping" className={classes.nestedNarrrow}/>
                        <StyledBadge badgeContent={count} color="primary" className={classes.mappedBadge}>
                          <ListIcon/>
                        </StyledBadge>
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </List>
            </div>
          </Drawer>
        </Grid>
        <Grid item>
          <div>test</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContentManagementMenu;