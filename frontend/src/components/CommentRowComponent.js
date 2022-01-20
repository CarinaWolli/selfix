import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, IconButton, TextField, Divider, Dialog, DialogContent, DialogContentText, DialogActions, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import UserService from '../services/UserService';
import Grid from '@material-ui/core/Grid';
import CommentService from '../services/CommentService';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Clear } from '@material-ui/icons';
import FileuploadService from '../services/FileuploadService';
import FileuploadComponent from './FileuploadComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import List from '@material-ui/core/List';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const useStyles = makeStyles((theme) => ({
  userName: {
    fontWeight: 'bold',
    paddingRight: '10px',
  },
  date: {
    color: '#9F9D9D',
    fontWeight: 'normal'
  },
  textField: {
    width: '100%',
  },
  button: {
    height: '25px',
    marginTop: '5px',
    marginRight: '10px',
    marginBottom: '10px',
    fontSize: '12px',
    textTransform: 'none',
    background: theme.palette.secondary.light
  },
  chatIcon: {
    marginTop: '5px',
  },
  divider: {
    marginTop: '10px',
    marginBottom: '30px',
  },
  image: {
    maxWidth: '70%',
    height: 'auto',
    border: 'solid 0.5px',
    borderColor: 'lightgray',
    borderRadius: 4
  },
  imageEdit: {
    maxWidth: '70%',
    height: 'auto',
    border: 'solid 0.5px',
    borderColor: 'lightgray',
    borderRadius: 4
  },
  imageDiv: {
    maxWidth: '70%',
    height: 'auto',
    display: 'flex',
  },
  imgDelete: {
    top: 0,
    color: 'red',
    marginLeft: -22,
  },
  commentButtons: {
    alignContent: 'end'
  },
  whiteSpaceText: {
    whiteSpace: 'pre-line',
  }
}));

/**
 * Component for comment section
 * @param {props} props
 */
function CommentRowComponent(props) {
  const classes = useStyles();
  const [userName, setUserName] = React.useState('user');
  const [isEditMode, setIsEditMode] = React.useState(false);
  const firstUpdate = React.useRef(true);
  const date = moment(props.comment.creationDate).format('DD. MMM YYYY');
  const [textComment, setTextComment] = React.useState(props.comment.commentText);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteCommentDialogOpen, setDeleteCommentDialogOpen] = React.useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(undefined);
  const [errorText, setErrorText] = useState('');

  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      setUserName('');
    }
  });

  React.useEffect(async () => {
    try{
      const userData = await UserService.getUser(props.comment.userId);
      setUserName(userData.username);
    } catch(e) {
      console.log(e);
    }
  }, []);

  const handleDeleteDialogClickOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteCommentDialogClickOpen = () => {
    setDeleteCommentDialogOpen(true);
  };

  const handleDeleteCommentDialogClose = () => {
    setDeleteCommentDialogOpen(false);
  };

  const handleDeleteFile = () => {
    (async () => {
      setDeleteDialogOpen(false);
      const imageUrl = props.comment.imageUrl;
      props.comment.imageUrl = '';
      try{
        const result = await FileuploadService.deleteFile(imageUrl);
        console.log(result);
      } catch(e) {
        console.log(e);
      }
      await CommentService.updateComment(props.comment);
    })();
  };

  function deleteComment() {
    (async () => {
      await CommentService.deleteComment(props.comment.id);
      const pos = props.step.comments.map(c => c.id).indexOf(props.comment.id);
      const updatedStep = props.step;
      updatedStep.comments.splice(pos, 1);
      props.changeNrOfComments(updatedStep.comments.length);
      props.setReload(!props.reload);
      setDeleteCommentDialogOpen(false);
    })();
  }

  function changeToEditMode() {
    setIsEditMode(true);
  }

  function closeEditMode() {
    setIsEditMode(false);
  }

  function updateComment() {
    (async () => {
      let fileuploadResponse;
      const comment = props.comment;
      if (file) {
        try{
          fileuploadResponse = await FileuploadService.uploadCommentImage(file, props.comment.userId);
          setFile(undefined);
          setFileName('');
          setErrorText('');
          if (fileuploadResponse != null && fileuploadResponse.files && fileuploadResponse.files.length > 0) {
            comment.imageUrl = fileuploadResponse.files[0];
          }
        } catch(e){
          setErrorText('Error while uploading file');
        }
        
      }

      comment.commentText = textComment;
      CommentService.updateComment(comment);
      setIsEditMode(false);
    })();
  }
 
  function handleTextFieldChange(e) {
    setTextComment(e.target.value);
  }

  function uploadFile(fileToUpload, fileToUploadName, error) {
    setFile(fileToUpload);
    setFileName(fileToUploadName);
    setErrorText(error);
  }

  function removeFile() {
    setFile(undefined);
    setFileName('');
  }

  if (!isEditMode) {
    return (
      <Grid container spacing={5}>
        <Grid item xs={0.5}>
          <ChatBubbleOutlineIcon color="secondary" fontSize="small" className={classes.chatIcon} />
        </Grid>
        <Grid item xs={10} direction="column" spacing={2}>
          <Typography variant="subtitle2">
            <Typography variant="body2" className={classes.userName}>
              {userName}  <span className={classes.date}> {date}</span>
            </Typography>
          </Typography>
          <br />
          {props.comment.imageUrl && (
            <div className={classes.imageDiv}>
              <Zoom>
                <img src={props.comment.imageUrl} className={classes.image} alt={props.comment.imageUrl} />
              </Zoom>
            </div>
          )}
          {props.comment.imageUrl && (<br />)}
          <Typography variant="body2" className={classes.whiteSpaceText}>
            {props.comment.commentText}
          </Typography>

          <Divider variant="middle" className={classes.divider} />
        </Grid>

        <Grid item xs={1.5}>
          {props.comment.userId === props.curUser ? (
            <div>
              <IconButton color="secondary" onClick={changeToEditMode}>
                <EditIcon fontSize="small" />
              </IconButton>
              <Dialog open={deleteCommentDialogOpen} onClose={handleDeleteCommentDialogClose}>
                <DialogContent>
                  <DialogContentText>{'Are you sure you want to delete the comment?'}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteCommentDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={deleteComment} color="primary" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <IconButton color="secondary" onClick={handleDeleteCommentDialogClickOpen} >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>) : (<div />)
          }
        </Grid>

      </Grid>
    );
  } else {
    return (
      <Grid container spacing={5}>
        <Grid item xs={0.5} >
          <ChatBubbleOutlineIcon color="secondary" fontSize="small" className={classes.chatIcon} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body2" className={classes.userName}>
            {userName}  <span className={classes.date}> {date}</span>
          </Typography>
          <br />
          {props.comment.imageUrl && (
            <div className={classes.imageDiv}>
              <img src={props.comment.imageUrl} className={classes.imageEdit} alt="" />
              <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogContent>
                  <DialogContentText>{'Are you sure you want to delete the file?'}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteDialogClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteFile} color="primary" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <Clear className={classes.imgDelete} onClick={handleDeleteDialogClickOpen} />
            </div>
          )}
          {props.comment.imageUrl && (<br />)}
          <TextField
            multiline
            rows={3}
            variant="outlined"
            className={classes.textField}
            value={textComment}
            onChange={handleTextFieldChange}
            onKeyPress={(event) => {
              if(event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                updateComment();
              }
            }}
            InputProps={
              !props.comment.imageUrl && {
                endAdornment: <FileuploadComponent files={1} sizeLimit={10 * 1024 * 1024} allowedMimeTypes={['image/png', 'image/jpeg']} uploadFunction={uploadFile} />,
              }
            }
          />

          <List>
            {file !== undefined && (
              <ListItem>
                <ListItemText primary={fileName} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments" onClick={removeFile}>
                    <DeleteIcon className={classes.deleteIcon} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
            {errorText !== '' && <Alert severity="error">{errorText}</Alert>}
          </List>
          <Button 
            variant="contained"
            onClick={updateComment}
            className={classes.button}
            disabled={textComment.length === 0}
          >
            Update
          </Button>
          <Button variant="contained" onClick={closeEditMode} className={classes.button}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={1.5} />
      </Grid>
    );
  }
}

CommentRowComponent.propTypes = {
  comment: PropTypes.object.isRequired,
  curUser: PropTypes.string.isRequired,
  step: PropTypes.object.isRequired,
  setReload: PropTypes.func,
  reload: PropTypes.bool,
  type: PropTypes.string,
  changeNrOfComments: PropTypes.func,
  comments: PropTypes.array,
  setComments: PropTypes.func,
};

export default CommentRowComponent;
