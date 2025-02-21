import React from 'react'
import Styles from './styles.module.scss'
import { CtaButton } from 'landing/components/button'
import CarouselReviews from 'landing/components/carouselReviews'

export const Reviews = () => {
    const { container, containerCarrousel } = Styles

  return (
    <div className={container}>
      <h3>
        4.9/5
        <div>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <p>basado en 27 reseñas de</p>
        <img src="https://www.arkabia.com/images/google-review.png" alt="" />
      </h3>
      {/*<CtaButton />
      
      <div className={containerCarrousel}>
        <CarouselReviews />
      </div>*/}
    </div>
  )
}
