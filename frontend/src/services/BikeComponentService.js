import HttpService from './HttpService';

export default class BikeComponentService {
  static baseURL() {
    return 'http://localhost:4000/bikeComponents';
  }

  static getAvailableBikeComponents(tutorial) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeComponentService.baseURL()}/available/${tutorial}`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUnmappedBikeComponents() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeComponentService.baseURL()}/unmapped`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getBikeComponents() {
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

  static getBikeComponent(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeComponentService.baseURL()}/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bike component');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
