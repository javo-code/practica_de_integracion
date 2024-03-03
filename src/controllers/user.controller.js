import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
const userService = new UserService();
import UserMongoDao from "../persistence/daos/mongoDB/users/user.dao.js";
const userDao = new UserMongoDao();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const exist = await userDao.getByEmail(email);
    if (exist) return res.status(400).json({ msg: "User already exists" });
    const user = { first_name, last_name, email, age, password };
    const newUser = await userDao.createUser(user);
    res.json({
      msg: "Register OK",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

  login = async (req, res, next) => {
    try {
      const token = await userService.login(req.body);
      if (!token) createResponse(res, 404, "Error login");
      else {
        res.header("Authorization", token);
        createResponse(res, 200, token);
      }
    } catch (error) {
      next(error);
    }
  };

  profile = (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
        first_name,
        last_name,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  };
}
