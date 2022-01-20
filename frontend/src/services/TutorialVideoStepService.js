import HttpService from './HttpService';

export default class TutorialVideoStepService {
  static baseURL() {
    return 'http://localhost:4000/tutorialVideoSteps';
  }

  static getTutorialVideoStep(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${TutorialVideoStepService.baseURL()}/${id}`,
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

  static updateTutorialVideoStep(tutorialVideoStep) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/comments/${tutorialVideoStep._id}`,
        tutorialVideoStep,
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
