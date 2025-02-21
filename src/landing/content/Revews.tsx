
export const Reviews = () => {
  return (
    <div className="container mx-auto p-4 ">
      <h3 className="text-2xl font-bold text-white">
        4.9/5
        <div className="flex space-x-1">
          <div className="w-4 h-4 bg-yellow-500" />
          <div className="w-4 h-4 bg-yellow-500" />
          <div className="w-4 h-4 bg-yellow-500" />
          <div className="w-4 h-4 bg-yellow-500" />
          <div className="w-4 h-4 bg-yellow-500" />
        </div>
        <p className="text-sm text-gray-600">basado en 27 reseñas de</p>
        <img src="https://www.arkabia.com/images/google-review.png" alt="" className="mt-2" />
      </h3>
      {/*<CtaButton />
      
      <div className="containerCarrousel">
        <CarouselReviews />
      </div>*/}
    </div>
  )
}
