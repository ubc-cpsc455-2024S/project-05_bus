import express from "express";
import GroupController from "../controllers/groupController.js";

const router = express.Router();

router.get("/", GroupController.getAllGroups);
router.get("/:id", GroupController.getGroup);
router.post("/", GroupController.createGroup);
router.patch("/:groupID", GroupController.updateName);
router.patch("/:groupID/:userID", GroupController.addMember);
router.patch("/remove/:groupID/:userID", GroupController.removeMember);
router.delete("/:id", GroupController.deleteGroup);

export default router;
