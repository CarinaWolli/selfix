import HttpService from './HttpService';
import base64 from 'react-native-base64';
export default class FileuploadService {

  static baseURL() {
    return 'http://localhost:5000';
  }

  static uploadCommentImage(file, userId) {
    let formData = new FormData();
    formData.append('userId',userId);
    formData.append('action', 'comments');
    formData.append('comment-image', file);
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    return new Promise((resolve, reject) => {
      fetch(`${FileuploadService.baseURL()}/upload`, {
        method: 'POST',
        headers: config,
        body: formData,
      })
        .then(function (response) {
        //handle success
          return resolve(response.json());
        })
        .catch(function (response) {
        //handle error
          console.log(response);
          reject(response);
        });
    });
  }

  static uploadCMS(file, action) {
    let formData = new FormData();
    formData.append('action', action);
    formData.append('file', file);
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    return new Promise((resolve, reject) => {
      fetch(`${FileuploadService.baseURL()}/uploadCMS`, {
        method: 'POST',
        headers: config,
        body: formData,
      })
        .then(function (response) {
        //handle success
          return resolve(response.json());
        })
        .catch(function (response) {
        //handle error
          console.log(response);
          reject(response);
        });
    });
  }

  static deleteFile(name) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${FileuploadService.baseURL()}/delete/${base64.encode(name)}`,
        function(data) {
          if (data.deleted !== undefined) {
            resolve(data.deleted);
          } else {
            reject('Error while deleting');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static checkFileSize(event, sizeLimit) {
    let files = event.target.files;
    let size = sizeLimit;
    let err = '';
    for (const f of files) {
      if (f.size > size) {
        err += f.type + 'is too large, please pick a smaller file\n';
      }
    }
    if (err !== '') {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  }

  static checkMimeType(event, types) {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // loop access array
    for (const f of files) {
      // compare file type find doesn't matach
      if (types.every(type => f.type !== type)) {
        // create error message and assign to container
        err += f.type + ' is not a supported format\n';
      }
    }

    if (err !== '') { // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  }

}
