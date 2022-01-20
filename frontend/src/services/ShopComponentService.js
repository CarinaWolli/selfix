import HttpService from './HttpService';

export default class ShopComponentService {
  static baseURL() {
    return 'http://localhost:4000/shopComponents';
  }

  static getShopComponents() {
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

  static deleteShopComponent(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${this.baseURL()}/${id}`,
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

  static listByBikeComponent(bikeComponent) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ShopComponentService.baseURL()}/${bikeComponent}`,
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
