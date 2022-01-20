import HttpService from './HttpService';

export default class TutorialTextStepService {
  static baseURL() {
    return 'http://localhost:4000/tutorialTextSteps';
  }

  static getTutorialTextStep(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${TutorialTextStepService.baseURL()}/${id}`,
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

  static updateTutorialTextStep(tutorialTextStep) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/comments/${tutorialTextStep._id}`,
        {tutorialTextStep},
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
