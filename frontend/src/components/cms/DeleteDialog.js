import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';

const DeleteDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to delete {'"'}
        {props.name ? props.name : ''}
        {'"'}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={props.handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={props.handleDelete} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  name: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DeleteDialog;
