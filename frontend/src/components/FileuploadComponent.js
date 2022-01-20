import React from 'react';
import FileuploadService from '../services/FileuploadService';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AttachFileOutlined} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  hiddenInput: {
    display: 'none'
  }
}));

function FileuploadComponent(props) {
  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);

  const saveFile = (e) => {
    
    let error = '';
    if(!FileuploadService.checkMimeType(e, props.allowedMimeTypes)) {
      error = 'You can only upload files of type image/png or image/jpeg';
    }
    else if(!FileuploadService.checkFileSize(e, props.sizeLimit)){
      error = 'Uploaded file is too large';
    }
    return error;
  };

  const handleChange = event => {
    const error = saveFile(event);
    if (error === '') {
      props.uploadFunction(event.target.files[0], event.target.files[0].name, '');
    } else {
      props.uploadFunction(undefined, '', error);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return <div>
    <input type="file" onChange={handleChange} ref={hiddenFileInput}
      className={classes.hiddenInput} accept={props.allowedMimeTypes}/>
    <AttachFileOutlined onClick={handleClick}/>
  </div>;

}

// attributes of props and their type
FileuploadComponent.propTypes =
  {
    files: PropTypes.number,
    sizeLimit: PropTypes.number,
    uploadFunction: PropTypes.func.isRequired,
    allowedMimeTypes: PropTypes.array.isRequired
  };

export default connect()(FileuploadComponent);
