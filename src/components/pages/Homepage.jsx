import React, { useLayoutEffect } from 'react'
import Hero from '../Hero/Hero'
import About from '../About/About'
import Works from '../Works/Works'
import Contact from '../Contact/Contact'
import {motion} from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}


const Homepage = () => {
  return (
    <motion.div initial="hidden" animate="enter" exit="exit" variants={ variants } transition={{ duration: 0.4, type: 'easeInOut' }} style={{ position: 'relative' }} >
      <Hero />
      <About />
      <Works />
      <Contact />
    </motion.div>
  )
}

export default Homepage