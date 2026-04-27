import type { Request, Response } from "express";

import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

export const addComment = async (req: Request, res: Response) => {
  try {
    // first get user id , and then product id and , we add comment to it

    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // the route is api/comments/:productId
    // so we can get product id from req.params

    const productId = req.params.productId as string;
    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    // {} need because req body is in the form of obj
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // and check if the product exists or not
    const product = await queries.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // then add comment
    const comment = await queries.createComment({
      userId: userId,
      productId: productId,
      content: content,
    });

    res.status(201).json({ comment, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const commentId = req.params.commentId as string;
    if (!commentId) {
      return res.status(400).json({ message: "Comment id is required" });
    }

    // check if comment exists and belongs to the current user
    const existingComment = await queries.getCommentById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    const comment = await queries.deleteComment(commentId);
    res.status(200).json({ comment, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};
