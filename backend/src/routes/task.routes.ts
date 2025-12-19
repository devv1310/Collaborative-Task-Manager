import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", taskController.create);
router.get("/", taskController.getAll);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export default router;
