import { Router } from "express";

import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// get -> api/products -> public route

router.get("/", productController.getAllProducts);

// get product detail -> api/products/:id public route
router.get("/:id", productController.getProductDetail);

// get product by current user -> api/products/my> protected route
router.get("/my", requireAuth(), productController.getProductByUser)

// create product => protected route
router.post("/",requireAuth(),productController.createProduct)

// update product => protected route
router.put("/:id",requireAuth(),productController.updateProduct)

// delete product => protected route
router.delete("/:id",requireAuth(),productController.deleteProduct)

export default router;
