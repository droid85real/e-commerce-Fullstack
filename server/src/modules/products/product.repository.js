//product.repository.js
import ProductModel from "./product.model.js";

export default class ProductRepository {
  static getAll() {
    return products;
  }

  // static method to get one product
  static getOne(id) {
    return products.find((p) => p.id == id);
  }

  // static method to get filtered product
  static getFiltered(minPrice, maxPrice, category) {
    return products.filter((p) => {
      return (
        (!minPrice || p.price >= parseFloat(minPrice)) &&
        (!maxPrice || p.price < parseFloat(maxPrice)) &&
        (!category || p.category.toLowerCase() == category.toLowerCase())
      );
    });
  }
}

// Sample test products
var products = [
  new ProductModel(
    1,
    "Nike Air Max 270",
    "Lightweight, stylish, and incredibly comfortable sneakers for everyday use.",
    7499.0,
    "https://dummyimage.com/200x200/000/fff&text=Nike+Air+Max+270",
    "Footwear",
    ["7", "8", "9", "10"],
    3,
    "12"
  ),
  new ProductModel(
    2,
    "Apple iPhone 14",
    "Latest iPhone with A15 Bionic chip, Super Retina XDR display, and improved battery life.",
    79999.0,
    "https://dummyimage.com/200x200/333/fff&text=iPhone+14",
    "Electronics",
    [],
    3,
    "15"
  ),
  new ProductModel(
    3,
    "Levi's Denim Jacket",
    "Classic fit denim jacket with modern trims and comfortable stitching.",
    3499.0,
    "https://dummyimage.com/200x200/123456/ffffff&text=Levi's+Jacket",
    "Clothing",
    ["S", "M", "L", "XL"],
    3,
    "15"
  ),
  new ProductModel(
    4,
    "Sony WH-1000XM5",
    "Industry-leading noise cancellation headphones with premium sound quality.",
    29990.0,
    "https://dummyimage.com/200x200/000/aaa&text=Sony+XM5",
    "Audio",
    [],
    4,
    "15"
  ),
  new ProductModel(
    5,
    "Samsung 55'' 4K UHD Smart TV",
    "Smart LED TV with crystal-clear visuals, 4K resolution, and smart connectivity.",
    42999.0,
    "https://dummyimage.com/200x200/000000/00ffcc&text=Samsung+4K+TV",
    "Electronics",
    [],
    2,
    "15"
  ),
  new ProductModel(
    6,
    "Puma Sports T-shirt",
    "Breathable, sweat-wicking t-shirt for gym and outdoor workouts.",
    899.0,
    "https://dummyimage.com/200x200/ff0066/ffffff&text=Puma+Tee",
    "Clothing",
    ["S", "M", "L"],
    5,
    "15"
  ),
];
