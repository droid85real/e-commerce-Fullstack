// product.controller.js
import ProductRepository from "./product.repository.js";

export default class ProductController{

    getAllProducts(req,res){
        const products=ProductRepository.getAll();
        res.status(200).send(products);
    }
}