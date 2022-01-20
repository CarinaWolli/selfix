import HttpService from './HttpService';

export default class ToolOptionService {
  static baseURL() {
    return 'http://localhost:4000/toolOptions';
  }

  static getToolOptions() {
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

  static deleteToolOption(id) {
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

  static listByToolCategory(toolCategory) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${ToolOptionService.baseURL()}/${toolCategory}`,
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
