import React from 'react'
import { useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './About.module.scss'

const About = () => {
  const revealRefs = useRef([])

  const addToRevealRefs = (el) => {
    if (el && !revealRefs.current.includes(el))
        revealRefs?.current.push(el)
  }

  const { isIntersected } = useReveal(revealRefs, '')
  return (
    <section className={styles['about']}>
        <div className={styles['about-upper']}>
            <div className={styles['about-textbox']}>
                <h1 className={styles['about-title']} ref={addToRevealRefs}><span className={isIntersected ? styles['active'] : ''}>About</span></h1>
                <p className={styles['about-desc']} ref={addToRevealRefs}><span className={isIntersected ? styles['active'] : ''}>Dreadew is a freelance and a full-stack developer based in Russia with a passion for building digital services/stuff he wants. He has a knack for all things launching products, from planning and designing all the way to solving real-life problems with code. At the moment he is studying at Kazan University in the field of information systems and technologies.</span></p>
            </div>
        </div>
    </section>
  )
}

export default About