import  {Router, Request, Response}  from "express";
import userController from "../controllers/user";

const userRoutes = Router();

userRoutes.get("/", (req: Request, res: Response) => userController.getAll(req, res));
userRoutes.get("/:id", (req: Request, res: Response) => userController.getById(req, res));
userRoutes.post("/", (req: Request, res: Response) => userController.create(req, res));
userRoutes.put("/:id", (req: Request, res: Response) => userController.update(req, res));
userRoutes.delete("/:id", (req: Request, res: Response) => userController.deleteById(req, res));

export default userRoutes;

// router.post("/signUp", signUpController);
// router.post("/signIn", signInController);