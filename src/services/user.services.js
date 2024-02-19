import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { userDao } = factory;
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  #generateToken(user) {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
  }

  createUser = async (obj) => {
  try {
    const newUser = await userDao.create(obj);
    if (!newUser) throw new Error("Validation Error!");
    else return newUser;
  } catch (error) {
    console.log(error);
  }
};

  async login(user) {
    try {
      const userExist = await userDao.login(user);
      if(userExist) return this.#generateToken(userExist);
      else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async geUserByEmail(email){
  try {
    const user = await userDao.getByEmail(email);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};
}
