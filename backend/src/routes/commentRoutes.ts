import { Router  } from "express";

import * as commentController from "../controllers/commentController"
import { requireAuth } from "@clerk/express";



const router = Router()

// add comment to product - api/comments/:productId -> protected route
router.post("/:productId",requireAuth(),commentController.addComment)

// delete comment by id  - api/comments/:commentId -> protected route

router.delete("/:commentId",requireAuth(),commentController.deleteComment)

export default router