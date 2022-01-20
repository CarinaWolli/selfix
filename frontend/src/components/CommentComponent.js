import React, { useState } from 'react';
import { Container, TextField, Typography, Link, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentService from '../services/CommentService';
import TutorialTextStepService from '../services/TutorialTextStepService';
import TutorialVideoStepService from '../services/TutorialVideoStepService';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import CommentRowComponent from './CommentRowComponent';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FileuploadComponent from './FileuploadComponent';
import FileuploadService from '../services/FileuploadService';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    marginTop: '30px',
  },
  button: {
    textTransform: 'none',
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: '15px',
    display: 'block',
  },
  sameLine: {
    display: 'inline-block',
    marginRight: '4px',
  },
  buttons: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
  },
}));

/**
 * Component for comment section
 * @param {props} props
 */
function CommentComponent(props) {
  const classes = useStyles();
  const [textComment, setTextComment] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [reload, setReload] = React.useState(true);
  const [step, setStep] = React.useState([]);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState();
  const [errorText, setErrorText] = useState('');
  const user = useSelector((state) => state.user);

  React.useEffect(async () => {
    try{
      let dataStep = {};
      if (props.type === 'text') {
        dataStep = await TutorialTextStepService.getTutorialTextStep(props.stepId);
      } else if (props.type === 'video') {
        dataStep = await TutorialVideoStepService.getTutorialVideoStep(props.stepId);
      }
      setStep(dataStep);
      setComments(dataStep.comments);
    } catch(e) {
      console.log(e);
    }
  }, [reload]);

  const createComment = async (comment) => {
    try {
      var stepData = step;
      comment.creationDate = new Date();
      const newComment = await CommentService.createComment(comment);
      stepData.comments.push(newComment);
      setStep(stepData);
      props.changeNrOfComments(step.comments.length);
      if (props.type === 'text') {
        await TutorialTextStepService.updateTutorialTextStep(step);
      } else if (props.type === 'video') {
        await TutorialVideoStepService.updateTutorialVideoStep(step);
      }
      setComments(step.comments);
      setTextComment('');
    } catch (err) {
      console.error(err);
    }
  };

  function uploadFile(fileToUpload, fileToUploadName, error) {
    setFile(fileToUpload);
    setFileName(fileToUploadName);
    setErrorText(error);
  }

  function removeFile() {
    setFile(undefined);
    setFileName('');
  } 

  function postComment() {
    (async () => {
      let fileuploadResponse = {};
      let comment = {};
      if(file){
        try{
          fileuploadResponse = await FileuploadService.uploadCommentImage(file, user.user._id);
          setFile(undefined);
          setFileName('');
          setErrorText('');
          if (fileuploadResponse.files && fileuploadResponse.files.length > 0) {
            comment.imageUrl = fileuploadResponse.files[0];
          }

        } catch(e){
          setErrorText('Error while uploading file. Please try again later.');
          return;
        }
      }

      comment.commentText = textComment;
      comment.userId = user.user._id;

      createComment(comment);
      setErrorText('');
    })();
  }

  function handleTextFieldChange(e) {
    setTextComment(e.target.value);
  }

  function redirectToLogin() {
    props.history.push('/login');
  }

  if (Object.keys(user).length !== 0) {
    return (
      <Container>
        {comments.map((com, index) => {
          return (
            <CommentRowComponent
              key={index}
              comment={com}
              curUser={user.user._id}
              setReload={setReload}
              reload={reload}
              type={props.type}
              step={step}
              changeNrOfComments={props.changeNrOfComments}
              uploadFunction={uploadFile}
            />
          );
        })}

        <TextField
          label="Add comment"
          multiline
          rows={3}
          variant="outlined"
          className={classes.textField}
          value={textComment}
          onChange={handleTextFieldChange}
          onKeyPress={(event) => {
            if(event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              postComment();
            }
          }}
          InputProps={{
            endAdornment: <FileuploadComponent files={1} sizeLimit={10 * 1024 * 1024} allowedMimeTypes={['image/png', 'image/jpeg']} uploadFunction={uploadFile} />,
          }}
        />

        <List>
          {file !== undefined && (
            <ListItem>
              <ListItemText primary={fileName} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={removeFile}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
          {errorText !== '' && <Alert severity="error">{errorText}</Alert>}
        </List>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={postComment}
            className={classes.button}
            disabled={textComment.length === 0}
          >
            Post comment
          </Button>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        {comments.length === 0 ? (
          <div>
            <Typography variant="title" className={classes.bold}>
              0 comments
            </Typography>
            <Typography variant="subtitle2" className={classes.sameLine}>
              You must be{' '}
            </Typography>
            <Link href="#" onClick={redirectToLogin} color="primary" className={classes.sameLine}>
              {'logged in'}
            </Link>
            <Typography variant="subtitle2" className={classes.sameLine}>
              to post a comment.
            </Typography>
          </div>
        ) : (
          comments.map((com, index) => {
            return <CommentRowComponent key={index} comment={com} curUser={undefined} comments={comments} setComments={setComments} step={step} uploadFunction={uploadFile} />;
          })
        )}
      </Container>
    );
  }
}

CommentComponent.propTypes = {
  stepId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changeNrOfComments: PropTypes.func.isRequired,
};

export default withRouter(CommentComponent);
