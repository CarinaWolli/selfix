import HttpService from './HttpService';

export default class CommentService {
  static baseURL() {
    return 'http://localhost:4000/comments';
  }

  static createComment(comment) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        CommentService.baseURL(),
        comment,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getComments() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        this.baseURL(),
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteComment(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${CommentService.baseURL()}/${id}`,
        function(data) {
          if (data.message !== undefined) {
            resolve(data.message);
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

  static updateComment(comment) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${comment._id}`,
        comment,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

}