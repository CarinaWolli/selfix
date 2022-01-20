import HttpService from './HttpService';

export default class BikeService {
  static baseURL() {
    return 'http://localhost:4000/bikes';
  }

  static getBikes() {
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

  static getPopulatedBikes() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeService.baseURL()}/populated`,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getBike(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeService.baseURL()}/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bike');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static searchBike(searchString) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeService.baseURL()}/search/${searchString}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bike');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static searchBikeByCategory(biketype, brand) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${BikeService.baseURL()}/categorySearch/${biketype}/${brand}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bikes');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteBike(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${BikeService.baseURL()}/${id}`,
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

  static deleteMany(bikeIds) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        this.baseURL(),
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        },
        {
          bikeIds: bikeIds,
        },
      );
    });
  }

  static updateBike(bike) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${bike._id}`,
        bike,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createBike(bike) {
    bike.id = Math.floor(Math.random() * 100000000 + 1).toString();

    return new Promise((resolve, reject) => {
      HttpService.post(
        BikeService.baseURL(),
        bike,
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
