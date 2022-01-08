const mongoDAO = require("./mongoDB/dao/index");

module.exports = class {
  static get(type) {
    switch (type) {
      case "MONGO":
        return mongoDAO;
      case "MEM":
        return require("./memory/dao/index");
    }
  }
};
