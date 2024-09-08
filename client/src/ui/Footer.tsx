import React from 'react'
import Container from './Container'
import { payment } from '../assets'
import FooterNavigation from './FooterNavigation'

const Footer = () => {
  return (
	<div className='mt-10 bg-darkText'>
    <FooterNavigation />
    <Container className='flex flex-col md:flex-row items-center gap-4 justify-between mt-10 text-whiteText'>
      <p>2024 &copy; nathaniel nguyen</p>
      <img src={payment} alt="payment-img" />
    </Container>
  </div>
  )
}

export default Footer