import { Router } from "express";
import { taskController } from "../controllers/task.controller";

const router = Router();

router.get("/", taskController.getAll); // ✅ must exist
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export default router;
