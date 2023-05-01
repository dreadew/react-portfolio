import React from 'react'
import { useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Hero.module.scss'


const Hero = () => {
  const revealRefs = useRef([])

  const addToRevealRefs = (el) => {
    if (el && !revealRefs.current.includes(el))
        revealRefs?.current.push(el)
  }

  const { isIntersected } = useReveal(revealRefs, '')

  //const transition_delay = 20

  return (
    <section className={styles['hero']}>
        <div className={styles['hero-textbox']}>
            <h1 className={styles['hero-title']} ref={addToRevealRefs}>
              <span className={isIntersected ? styles['active'] : ''}>Hello, I'm a UX/UI designer and Full-stack developer based in Russia</span>
            </h1>
        </div>
    </section>
  )
}

export default Hero