import React, { useRef, useState } from 'react'
import styles from './PortfolioGrid.module.scss'
import { Link } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { useReveal } from '../../hooks/useReveal'
import { db } from '../../firebase'

const PortfolioGrid = () => {
    const [portfolio, setPortfolio] = useState([])

    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio'))
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()))
    }

    const revealRefs = useRef([])

    const addToRevealRefs = (el) => {
        if (el && !revealRefs.current.includes(el))
            revealRefs?.current.push(el)
    }

    const { isIntersected } = useReveal(revealRefs, portfolio)

    const transition_delay = 200

    useLayoutEffect(() => {
        getPortfolio()
    }, [])
  return (
    <section className={styles['portfolio']}>
        <div className={styles['portfolio-wrapper']}>
            { portfolio?.map((item, idx) =>
            (
                <div className={styles['portfolio-work']} key={`portfolio-item ${idx}`}>
                    <div className={styles['portfolio-text']}>
                        <h4 className={styles['portfolio-title']} ref={addToRevealRefs}><span style={{transitionDelay: `${transition_delay*(idx)}ms`}} className={isIntersected ? styles['active'] : ''}>{ item.title }</span></h4>
                        <p className={styles['portfolio-desc']} ref={addToRevealRefs}><span style={{transitionDelay: `${transition_delay*(idx)}ms`}} className={isIntersected ? styles['active'] : ''}>{ item.subject }</span></p>
                    </div>
                    <Link to={item.title} className={isIntersected ? styles['portfolio-imgbox'] + ' ' + styles['active'] : styles['portfolio-imgbox']} ref={addToRevealRefs}>
                        <img src={item.image} className={styles['portfolio-img']} alt='' />
                    </Link>
                </div>
            )) }
        </div>
    </section>
  )
}

export default PortfolioGrid
