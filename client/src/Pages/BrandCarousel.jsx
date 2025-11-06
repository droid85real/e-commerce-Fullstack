// BrandCarousel.jsx
import Marquee from "react-fast-marquee";

const BrandCarousel = () => {
const brands = [
  "https://upload.wikimedia.org/wikipedia/commons/1/1d/Meesho_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", //
  "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",//
  "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",//
  "https://upload.wikimedia.org/wikipedia/commons/8/83/H%26M-Logo.svg",
];


  return (
    <div className="py-4 bg-white">
      <Marquee speed={40} gradient={false}>
        {brands.map((brand, index) => (
          <div key={index} className="mx-8">
            <img src={brand} alt="brand" className="w-24 h-24 object-contain" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandCarousel;
