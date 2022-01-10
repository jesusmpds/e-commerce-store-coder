module.exports = class {
  constructor(model) {
    this.model = model;
  }

  async findUserByID(id) {
    try {
      const user = await this.model.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email: email }).lean();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(userInfo) {
    try {
      const newCreatedUser = await this.model.create(userInfo);
      return newCreatedUser;
    } catch (error) {
      console.log(error);
    }
  }
};
