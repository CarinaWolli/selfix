'use strict';

class BikeCategory {
  constructor(id, name, imageUrl, children) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.children = children;
  }
}
module.exports = BikeCategory;
