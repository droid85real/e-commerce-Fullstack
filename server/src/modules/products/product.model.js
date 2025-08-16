// product.model.js
export default class ProductModel{
    constructor(id,name,desc,price,imageUrl,category,sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }
}