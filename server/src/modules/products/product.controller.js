// product.controller.js
import ProductRepository from "./product.repository.js";

export default class ProductController{

    getAllProducts(req,res){
        const products=ProductRepository.getAll();
        res.status(200).send(products);
    }

    // middleware to get one product
    getOneProduct(req,res){
        const productFound=ProductRepository.getOne(req.params.id);
        if(productFound){
            res.status(200).send(productFound);
        }else{
            res.status(404).send("Product not found");
        }
    }

    // middleware to get filtered products
    getFilteredProducts(req,res){
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;

        const result=ProductRepository.getFiltered(minPrice,maxPrice,category);
       
        if(result && result.length>0){
            res.status(200).send(result);
        }else{
            res.status(404).send("Product not found");
        }
    }
}