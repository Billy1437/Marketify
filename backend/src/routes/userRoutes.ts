import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";



const router = Router();


// api/users/sync => sync user with clerk => then save user in database
// need requireAuth() to protect the route
// need syncUser() to sync the user with clerk

router.post("/sync",requireAuth(),syncUser);

export default router;
