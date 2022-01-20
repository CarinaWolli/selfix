import HttpService from './HttpService';

export default class UserService {
  static baseURL() {
    return 'http://localhost:4000/bookmark';
  }

  static getBikeBookmarks() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/bookmarkBike`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bookmarks');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static bookmarkBike(bikeId) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${UserService.baseURL()}/bookmarkBike`,
        {
          bikeId: bikeId,
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

  static removeBookmarkBike(bikeId) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${UserService.baseURL()}/removeBookmarkBike`,
        {
          bikeId: bikeId,
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

  static getTutorialBookmarks() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/bookmarkTutorial`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving bookmarks');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static bookmarkTutorial(tutorialBookmark) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${UserService.baseURL()}/bookmarkTutorial`,
        {
          tutorialBookmark: tutorialBookmark,
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

  static removeBookmarkTutorial(tutorialBookmark) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${UserService.baseURL()}/removeBookmarkTutorial`,
        {
          tutorialBookmark: tutorialBookmark,
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
}