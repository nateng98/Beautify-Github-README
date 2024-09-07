import React from 'react'
import Container from './Container'
import { payment } from '../assets'
import FooterTop from './FooterTop'
import FooterNavigation from './FooterNavigation'

const Footer = () => {
  return (
	<div className='mt-10'>
    <FooterTop />
    <FooterNavigation />
    <Container className='flex flex-col md:flex-row items-center gap-4 justify-between'>
      <p>2024 &copy; nathaniel nguyen</p>
      <img src={payment} alt="payment-img" />
    </Container>
  </div>
  )
}

export default Footer