import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserDaoMongoDB from "../persistence/daos/mongoDB/users/user.dao.js";
const userDao = new UserDaoMongoDB();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
  
  try {
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, PRIVATE_KEY);
    console.log("decode::", decode); //payload ---> {userId: id de mongo}
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });

    // Verifico vida del token
    const now = Math.floor(Date.now() / 1000); //Guardo el tiempo actual en segundos.
    const tokenExp = decode.exp; // Vida del token.
    const timeUntilExp = tokenExp - now; // Vida restante del token en segundos.

    if (timeUntilExp <= 300) { // 300 segundos = 5 minutos.     
      const newToken = userDao.generateToken(user, '15m'); // Renuevo el token y su vida.
      console.log('>>>>>>SE RENOVO EL "TOKEN"');
      res.set("Authorization", `Bearer ${newToken}`); // Agregar el nuevo token al encabezado (HEADER)
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
