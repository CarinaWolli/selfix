import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Badge, Fab, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function BikeResultTutorialPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bikeComponentList, setBikeComponentList] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  React.useEffect(() => {
    if (props.bikeComponents != undefined && props.bikeComponents.length > 0) {
      setBikeComponentList(props.bikeComponents.filter(comp => comp.tutorial != null));
    }
  }, []);

  return (
    <div className={props.className}>
      <Badge badgeContent={bikeComponentList.length} color="primary">
        <Fab
          disabled={bikeComponentList.length <= 0}
          style={bikeComponentList.length <= 0 ? { color: 'rgb(30,20,10,0.8)', background: 'rgb(244,125,47,0.5)' } : null}
          color="primary"
          variant="extended"
          size="medium"
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onClick={handleClick}>
          <Typography style={bikeComponentList.length <= 0 ? null : { fontWeight: 600 }}>{props.name}</Typography>
        </Fab>
      </Badge>
      <Popover
        id={id}
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >

        {bikeComponentList.length === 0 ? (
          <Typography className={classes.typography}>No tutorials available!</Typography>
        ) : (
          <List className={classes.root}>
            <ListItem>
              <ListItemText>
                <Typography variant="body1" style={{ fontWeight: 600 }}>{`Tutorials related to ${
                  props.name
                }`}</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            {bikeComponentList.map((tutComp,i) => {
              return (
                <ListItem key={i} button component="a"
                  onClick={() =>
                    props.history.push('/tutorial/'+tutComp.tutorial._id+'/'+tutComp._id)
                  }>
                  <ListItemAvatar>
                    <Avatar alt="tutorial image" src={tutComp.tutorial.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={tutComp.tutorial.name} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Popover>
    </div>
  );
}

BikeResultTutorialPopover.propTypes = {
  bikeComponents: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withRouter(BikeResultTutorialPopover);
