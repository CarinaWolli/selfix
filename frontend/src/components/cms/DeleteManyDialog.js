import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogActions, DialogTitle, Button, DialogContent, List, ListItem } from '@material-ui/core';


const DeleteManyDialog = (props) => {

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id='alert-dialog-title'>Do you want to delete these items?</DialogTitle>
      <DialogContent>
        <List>
          {props.names.map((item,i) => {
            return <ListItem key={i}>
              {item}
            </ListItem>;
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={props.handleDelete} color='primary' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteManyDialog.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default DeleteManyDialog;