import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

// list every products even though user not logged in -> public
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json({ products, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", success: false });
  }
}

// get product detail , also comments and comment authors
// public access

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    //to get data from url we use req.params
    // to type id from req.params -> we use "as string"
    // this is because typescript think req.params is unknown
    // so we need to tell typescript that req.params is a string

    const id = req.params.id as string;
    if (!id) {
      throw new Error("Product id is required");
    }

    const product = await queries.getProductById(id);
    if (!product)
      return res
        .status(404)
        .json({ message: "product not found", success: false });

    res.status(200).json({ product, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch product", success: false });
  }
};

// get product by current user -> protected route

export const getProductByUser = async (req: Request, res: Response) => {
  try {
    // get user id

    const { userId } = getAuth(req);
    if (!userId) {
      throw new Error("User not found");
    }

    // after getting user id , go to fetch products

    const products = await queries.getProductsByUserId(userId);

    res.status(200).json({ products, success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", success: false });
  }
};

// create product -> protected route

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new Error("user not found");
    }

    // destrcture from the request body
    const { imageUrl, title, description } = req.body;

    if (!imageUrl || !title || !description) {
      throw new Error("All fields are required");
    }

    // after getting all the data ,

    const product = await queries.createProduct({
      title: title,
      description: description,
      imageUrl: imageUrl,
      userId: userId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create product",
      success: false,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const id = req.params.id as string;
    if (!id) {
      throw new Error("product id is required");
    }

    // destrcture from the request body
    const { imageUrl, title, description } = req.body;

    if (!imageUrl || !title || !description) {
      throw new Error("All fields are required");
    }

    // check if product belong to current user
    const exisingProduct = await queries.getProductById(id);
    if (!exisingProduct) {
      throw new Error("product not found");
    }

    if (exisingProduct.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // then update
    const product = await queries.updateProduct(id, {
      title: title,
      description: description,
      imageUrl: imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update product",
      success: false,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const id = req.params.id as string;
    if (!id) {
      throw new Error("product id is required");
    }

    // check if product belong to current user
    const exisingProduct = await queries.getProductById(id);

    if (!exisingProduct) {
     return  res.status(404).json({
        message: "product not found",
        success: false,
      });
    }

    if (exisingProduct.userId !== userId) {
      return res.status(403).json({
        message: "You can only delete your own products",
        success: false,
      });
    }

    // then delete
    const product = await queries.deleteProduct(id);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete product",
      success: false,
    });
  }
};
