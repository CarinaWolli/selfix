import HttpService from './HttpService';

export default class AffiliateProductService {
  static baseURL() {
    return 'http://localhost:4000/affiliateproducts';
  }

  static getAffiliateProducts() {
    return new Promise((resolve, reject) => {
      try {
        HttpService.get(
          this.baseURL(),
          function (data) {
            resolve(data);
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      } catch(e) {
        console.log(e);
      }
    });
  }

  static getUnmappedAffiliateProducts() {
    return new Promise((resolve, reject) => {
      try {
        HttpService.get(
          this.baseURL() + '/unmapped',
          function (data) {
            resolve(data);
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      } catch(e) {
        console.log(e);
      }
    });
  }

  static getUnmappedAffiliateProductCount() {
    return new Promise((resolve, reject) => {
      try {
        HttpService.get(
          this.baseURL() + '/unmappedCount',
          function (data) {
            resolve(data);
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      } catch(e) {
        console.log(e);
      }
    });
  }

  static mapAffiliatesToBikeComponents(affiliateIds, bikeComponentIds) {
    this.mapAffiliates(affiliateIds, bikeComponentIds, null);
  }

  static mapAffiliatesToToolsCategories(affiliateIds, toolCategoryIds) {
    this.mapAffiliates(affiliateIds, null, toolCategoryIds);
  }

  static mapAffiliates(affiliateIds, bikeComponentIds, toolCategoryIds) {
    return new Promise((resolve, reject) => {
      try {
        HttpService.post(
          this.baseURL() + '/mapping',
          {
            affiliateProducts: affiliateIds,
            bikeComponents: bikeComponentIds,
            toolCategories: toolCategoryIds
          },
          function (data) {
            resolve(data);
          },
          function (textStatus) {
            reject(textStatus);
          }
        );
      } catch(e) {
        console.log(e);
      }
    });
  }


}