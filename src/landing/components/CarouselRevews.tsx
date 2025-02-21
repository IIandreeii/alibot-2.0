import React, { useEffect, useRef } from 'react';
import './Components.css'

const brands = [
  { id: 1, name: 'Brand 1', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Brand 2', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Brand 3', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Brand 4', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Brand 5', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Brand 6', image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Brand 7', image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Brand 8', image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Brand 9', image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Brand 10', image: 'https://via.placeholder.com/150' }
];

const CarouselReviews = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft >= scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
      }
    }, 15);

    carouselRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      carouselRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden flex mb-20" ref={carouselRef}>
      <div className="flex gap-8 w-max">
        {brands.concat(brands).map((brand, index) => (
          <div className="carousel-item" key={index}>
            <p>
              Me sirvió mucho la información que recibí debido a que yo realizó importaciones y no tenía idea de esta página.
            </p>

            <div className="carousel-item__info">
              <div>
                <img className="card-comment-profile" src="https://storage.googleapis.com/storage-beta.arkabia.com/public/assets/images/png/comment5.png" />
              </div>
              <div>
                <p>Eloy Durán 
                  <img src="https://storage.googleapis.com/storage-beta.arkabia.com/public/assets/images/png/verify_blue.png" alt="" />
                </p>
                <small>@dechinaaperu.com</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselReviews;
