let express = require("express");
const { loginController,signUpController,logoutController} = require("../Controller/usersController");

let UsersRouter = express.Router();

UsersRouter.post("/logout",logoutController);
UsersRouter.post("/signUp",signUpController);
UsersRouter.post("/login",loginController);

module.exports=UsersRouter;