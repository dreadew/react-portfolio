import React, { useLayoutEffect, useRef } from 'react'
import styles from './NotFound.module.scss'
import Blob from './Blob/Blob'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'


const Homepage = () => {
  const revealRefs = useRef([]);

  const addToRevealRefs = (el) => {
    if (el && !revealRefs.current.includes(el))
        revealRefs?.current.push(el);
  }

  const { isIntersected } = useReveal(revealRefs, '');
  
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
    <div className={styles['wrapper']}>
        <Canvas style={{height: "40%", maxWidth: "80vw", paddingLeft: "var(--container-margin)", paddingRight: "var(--container-margin)"}} ref={addToRevealRefs} className={isIntersected ? styles['canvas'] + ' ' + styles['active'] : styles['canvas']} camera={{ position: [0.0, 0.0, 4.5] }}>
            <Blob />
        </Canvas>
        <p className={styles['err-desc']} ref={addToRevealRefs}><span className={isIntersected ? styles['active'] : ''}>Page not found</span></p>
        <Link ref={addToRevealRefs} className={styles['err-link']} style={{textDecoration: "none", color: "var(--clr-primary-300)"}} to="/">
          <span className={isIntersected ? styles['active'] : ''}>Back to Index</span>
        </Link>
    </div>
  )
}

export default Homepage