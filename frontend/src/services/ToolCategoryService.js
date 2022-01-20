import HttpService from './HttpService';

export default class ToolCategoryService {
  static baseURL() {
    return 'http://localhost:4000/toolCategories';
  }

  static getToolCategories() {
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
}
