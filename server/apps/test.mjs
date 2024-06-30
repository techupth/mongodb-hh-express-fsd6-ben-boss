productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = ObjectId(req.params.productId);
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
    return res.json({
      message: `$error`,
    });
  }
});
