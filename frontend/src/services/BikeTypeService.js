import HttpService from './HttpService';

export default class BikeTypeService {
  static baseURL() {
    return 'http://localhost:4000/biketypes';
  }

  static getBikeTypes() {
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

  static getBikeType(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeTypeService.baseURL()}/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bike type');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
