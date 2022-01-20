import HttpService from './HttpService';

export default class UserService {
  static baseURL() {
    return 'http://localhost:4000/auth';
  }

  static baseURLUsers() {
    return 'http://localhost:4000/users';
  }

  static register(user, pass, isAdmin) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          username: user,
          password: pass,
          isAdmin: isAdmin,
        },
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static login(user, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/login`,
        {
          username: user,
          password: pass,
        },
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUser(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${UserService.baseURLUsers()}/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving user');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem('jwtToken');
  }
}
