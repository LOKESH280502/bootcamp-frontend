

import React from 'react'
import { Link } from "react-router-dom"
import BlurText from '../animations/BlurText';

const Welcome = () => {
  return (
    <>
      <section
  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
  style={{
    backgroundImage: "url('https://st2.depositphotos.com/1518767/6905/i/450/depositphotos_69053067-stock-photo-composite-image-of-hands-holding.jpg')"
  }}
>

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/20"></div>

  {/* Content */}
  <div className="relative z-10 text-white text-center max-w-2xl">

    <BlurText
      className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg"
      text="Welcome to BootCamp Portal!"
      delay={150}
      animateBy="words"
      direction="top"
    />

    <BlurText
      className="text-base md:text-2xl mb-6 leading-relaxed drop-shadow-md"
      text="Learn, Build, and Grow with modern technologies"
      delay={150}
      animateBy="words"
      direction=""
    />

    <Link
      to="/login"
      className="inline-block px-6 py-3 bg-white text-black  font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition"
    >
      Get Started..
    </Link>

  </div>

</section>
    </>
  )
}

export default Welcome