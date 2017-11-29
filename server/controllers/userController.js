import userModel from '../models/user';


class User {

  static createUser(req, res) {
    userModel.create(req.body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default User;
