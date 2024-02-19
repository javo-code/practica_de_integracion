import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import userValidator from "../middlewares/userValidator.js";
import UserCntroller from "../controllers/user.controller.js"

const router = Router();
const controller = new UserCntroller();

router.get("/", controller.getAll)
    .get("/:id", controller.getById)
    .post("/", controller.create)
    .put("/:id", controller.update)
    .delete("/:id", controller.delete)
    .post("/register", userValidator, controller.register)
    .post("/login", controller.login)
    .get("/private", verifyToken, (req, res) => {
  const { first_name, last_name, email, role } = req.user;
    res.json({
      status: "success",
      userData: {
        first_name,
        last_name,
        email,
        role,
      },
    });
    })
  
    .get('/logout', (req, res) => {
      try {
          req.session.destroy((err) => {
              if (err) {
                console.error("Error closing session:", err);
                throw new Error("The session couldn't be destroyed la sesión");
              }
                console.log('Sesión de usuario destruida con éxito.');
                res.redirect('/login');
          });
      } catch (error) {
          console.error('Error al destruir la sesión:', error);
          return res.status(500).send('Error al cerrar sesión');
      }
  });

export default router;
