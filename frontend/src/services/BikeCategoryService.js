import HttpService from './HttpService';

export default class BikeTypeService {
  static baseURL() {
    return 'http://localhost:4000/bikeCategories';
  }

  static getBikeCategories() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        this.baseURL(),
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }


}
