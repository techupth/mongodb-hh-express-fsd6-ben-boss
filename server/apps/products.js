import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";
const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = await collection.find({}).toArray();
    return res.json({ data: productData });
  } catch (error) {
    return res.json({
      message: `$error`,
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const collection = db.collection("products");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ data: product });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = { ...req.body, create_at: new Date() };
    const newProductData = await collection.insertOne(productData);
    return res.json({
      message: `Product Id (${newProductData.insertedId}) has been created successfully`,
    });
  } catch (error) {
    return res.json({
      message: `$error`,
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection("products");
    const productId = new ObjectId(id);
    const newProductData = { ...req.body };

    await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProductData,
      }
    );

    return res.json({
      message: `Product record (${productId}) has been updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({
      message: `Product record (${id}) has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default productRouter;
