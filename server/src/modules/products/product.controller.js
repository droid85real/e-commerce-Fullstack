// product.controller.js
export default class ProductController {
  constructor(productRepository) {
    this.productRepo = productRepository;
  }

  // middleware to get all products
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productRepo.getAll();

      if (products.length === 0)
        return res.status(404).json({ message: "No products found" });

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // middleware to get one product
  getOneProduct = async (req, res) => {
    try {
      const result = await this.productRepo.getOne(req.params.id);

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json(result.product);
        case "INVALID_ID":
          return res.status(400).json({ message: "Invalid product ID" });
        case "NOT_FOUND":
          return res.status(404).json({ message: "Product not found" });
        default:
          return res
            .status(500)
            .json({ message: "Unexpected repository result" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // middleware to get filtered products
  getFilteredProducts = async (req, res) => {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const result = await this.productRepo.getFiltered(
        minPrice,
        maxPrice,
        category
      );

      switch(result.status){
        case "SUCCESS":
            return res.status(200).json(result.products);
        case "NOT_FOUND":
            return res.status(404).json({ message: "Product not found" });
        default:
            return res.status(500).json({ message: "Unexpected repository result" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // TODO: only admin and seller can delete
  deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const userRole=req.userRole
    const productId=req.params.id;

    // Basic validation
    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const result = await this.productRepo.deleteOne(userId,userRole,productId);

    switch (result.status) {
      case "SUCCESS":
        return res.status(200).json({ message: "Product deleted successfully" });
      case "INVALID_PRODUCT_ID":
          return res.status(400).json({ message: "Invalid product ID format" });
      case "INVALID_USER_ID":
          return res.status(400).json({ message: "Invalid user ID format" });
      case "ITEM_NOT_FOUND":
          return res.status(404).json({ message: "Item not found" });
      case "UNAUTHORIZED":
          return res.status(401).json({ message: "Only admin can delete product" });
      default:
        return res.status(500).json({ message: "Unexpected repository result" });
    }
  } catch (error) {
    console.error("Controller deleteProduct error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// TODO: only admin can add product or seller
addProduct = async (req, res) => {
  try {
    const userId=req.userId;
    const userRole=req.userRole;
    const result = await this.productRepo.addOne(userId,userRole,req.body);

    switch (result.status) {
      case "SUCCESS":
        return res.status(201).json({
          message: "Product added successfully",
          product: result.product,
        });
      case "INVALID_DATA":
        return res.status(400).json({ 
          message: "Invalid product data",
          details: result.details // Send detailed error messages
        });
      case "INVALID_USER_ID":
          return res.status(400).json({ message: "Invalid user ID format" });
      case "UNAUTHORIZED":
          return res.status(401).json({ message: "Unauthorized" });
      default:
        return res.status(500).json({ message: "Unexpected repository result" });
    }
  } catch (error) {
    console.error("Controller addProduct error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  };
}
