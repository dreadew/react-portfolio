import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Contact.module.scss'
import { footerLinks } from './footerLinks'
import { useReveal } from '../../hooks/useReveal'
import { useRef } from 'react'

const Contact = () => {
    const revealRefs = useRef([])

    const addToRevealRefs = (el) => {
      if (el && !revealRefs.current.includes(el))
          revealRefs?.current.push(el)
    }
  
    const { isIntersected } = useReveal(revealRefs, '')

    const transition_delay = 200
  return (
    <section className={styles['contact']}>
        <div className={styles['contact-textbox']}>
            <div className={styles['contact-upper']}>
                <h3 className={styles['contact-text']} ref={addToRevealRefs}><span style={{transitionDelay: `${transition_delay*(1)}ms`}} className={isIntersected ? styles['active'] : ''}>Want to work together?</span></h3>
                <h3 className={styles['contact-text']} ref={addToRevealRefs}><span style={{transitionDelay: `${transition_delay*(2)}ms`}} className={isIntersected ? styles['active'] : ''}>Send me a message</span></h3>
            </div>
            <div className={styles['contact-btn__wrapper']}>
                <a href="mailto:arthur833@icloud.com" className={styles['contact-btn']} ref={addToRevealRefs}><span className={isIntersected ? styles['active'] : ''}>dreadew@icloud.com</span></a>
            </div>
        </div>
        <div className={styles['contact-footer']}>
            <ul className={styles['contact-list']}>
                { footerLinks.map((item, idx) => (
                    <li className={styles['contact-item']} key={`contact-link ${idx}`}>
                        <a href={item.link} target="_blank" rel="noreferrer" className={styles['contact-link']} ref={addToRevealRefs}>
                            <span style={{opacity: `1`}} className={isIntersected ? styles['active'] : ''}>{item.title}</span>
                            <span style={{opacity: `1`}} className={isIntersected ? styles['active'] : ''}>{item.title}</span>
                        </a>
                    </li>
                )) }
            </ul>
        </div>
    </section>
  )
}

export default Contact