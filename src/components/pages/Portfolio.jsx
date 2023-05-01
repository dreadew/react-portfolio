import React, { useLayoutEffect } from 'react'
import PortfolioGrid from '../PortfolioGrid/PortfolioGrid'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const Portfolio = () => {
  useLayoutEffect(() => {
    let hash = this.props.location.hash.replace('#', '');
    if (hash) {
      let node = ReactDOM.findDOMNode(this.refs[hash]);
      if (node) {
        node.scrollIntoView();
      }
    }
  }, [])
  return (
    <motion.div initial="hidden" animate="enter" exit="exit" variants={variants} transition={{duration: 0.4, type: 'easeInOut'}} style={{ position: 'relative' }} >
      <PortfolioGrid />
    </motion.div>
  )
}

export default Portfolio