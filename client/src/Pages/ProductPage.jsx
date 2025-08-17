import React, { useEffect, useState } from 'react'
import ProductCard from '../component/ProductCard'

const ProductPage = () => {

    const [data, setData] = useState([])


    const fetchData = async () => {
        let response = await fetch('https://dummyjson.com/products');
        let json = await response.json();
        return json.products;
    }
    useEffect(() => {
        (async () => {
            const newData = await fetchData();
            setData(newData);
        })();
    }, []);
    return (
<div className="grid grid-cols-[30%_70%]">
    <div></div>
<div>
     <p className='text-black font-bold text-[25px] text-lg p-5 items-center justify-center flex'>Our Collection </p>
               <div className="grid grid-cols-4 gap-3 p-3">
            {data.map((item, index) => (
                 <ProductCard
                    id={item.id}
                    key={index}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    dicountPercentage={item.dicountPercentage}
                />
            ))}
        </div>
</div>
</div>
    )
}

export default ProductPage
