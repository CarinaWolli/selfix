import HttpService from './HttpService';

export default class TutorialService {
  static baseURL() {
    return 'http://localhost:4000/tutorials';
  }

  static getTutorials() {
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

  static getTutorial(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${TutorialService.baseURL()}/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving tutorial');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTutorialWithToolOptions(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${TutorialService.baseURL()}/tools/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving tutorial');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getTutorialWithBikeComponents(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${TutorialService.baseURL()}/bikecomponents/${id}`,
        function(data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject('Error while retrieving tutorial');
          }
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createTutorial(tutorial) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        TutorialService.baseURL(),
        tutorial,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateTutorial(tutorial) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${tutorial.tutorial._id}`,
        tutorial,
        function(data) {
          resolve(data);
        },
        function(textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteTutorial(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${TutorialService.baseURL()}/${id}`,
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

  static deleteManyTutorials(tutorialIds) {
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
          tutorialIds: tutorialIds
        }
      );
    });
  }
}
