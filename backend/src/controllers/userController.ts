import type { Request, Response } from "express";

import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

export async function syncUser(req: Request, res: Response) {
  try {

    // we use getAuth to get the user id from the request
    // and then we will use the user id to find in our database
    // if not found , we create it
    // if found , we update it
    


    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // we have to use upsert user . why can't we use simple insert?
    // because user may already exist
    // if user already exist , we have to update the user
    // if user does not exist , we have to insert the user
    // so we have to use upsert user

    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    });

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to sync user" });
  }
}
