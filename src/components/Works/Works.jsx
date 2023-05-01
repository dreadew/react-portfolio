import React, { useLayoutEffect, useRef, useState } from 'react'
import styles from './Works.module.scss'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase'

function Works() {
    const [portfolio, setPortfolio] = useState([])
    const [mouse, setMouse] = useState(false)
    const imgWrapperRef = useRef([])
    const workLinkRefs = useRef([])
    const revealRefs = useRef([])
    
    const addToImgRefs = (el) => {
        if (el && !imgWrapperRef.current.includes(el))
            imgWrapperRef?.current.push(el)
    }

    const addToRevealRefs = (el) => {
        if (el && !revealRefs.current.includes(el))
            revealRefs?.current.push(el)
    }

    const addToLinkRefs = (el) => {
        if (el && !workLinkRefs.current.includes(el))
            workLinkRefs?.current.push(el)
    }

    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio'))
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()))
    }

    useLayoutEffect(() => {
        getPortfolio();
    }, [])

    function onMouseEvent(e) {
        if (e.target.parentElement.parentElement.href !== undefined)
            setMouse(e.target.parentElement.parentElement.href.split("/")[4]?.replace("%20", " "))
        else if (e.target.parentElement.href !== undefined)
            setMouse(e.target.parentElement.parentElement.href.split("/")[4]?.replace("%20", " "))
        else if (e.target?.href !== undefined)
            setMouse(e?.target?.href?.split("/")[4]?.replace("%20", " "))
        else
            setMouse(e?.target?.parentElement?.parentElement?.parentElement?.href?.split("/")[4]?.replace("%20", " "))
    }

    function onMouseLeave(e) {
        if (e.target.parentElement.parentElement.href !== undefined)
            setMouse(e.target.parentElement.parentElement.href.split("/")[4]?.replace("%20", " "))
        else if (e.target.parentElement.href !== undefined)
            setMouse(e.target.parentElement.parentElement.href.split("/")[4]?.replace("%20", " "))
        else if (e.target?.href !== undefined)
            setMouse(e?.target?.href?.split("/")[4]?.replace("%20", " ") + "leave")
        else
            setMouse(e?.target?.parentElement?.parentElement?.href?.split("/")[4]?.replace("%20", " ") + "leave")
        setTimeout(() => {
            setMouse(false)
        }, 450)
    }

    const { isIntersected } = useReveal(revealRefs, portfolio)

    const transition_delay = 100;
  return (
    <section className={styles['works']}>
        <div className={styles['works-textbox']}>
            <h1 className={styles['works-title']} ref={addToRevealRefs}><span style={{transitionDelay: `${transition_delay*(1)}ms`}} className={isIntersected ? styles['active'] : ''}>Latest works</span></h1>
            <p className={styles['works-desc']} ref={addToRevealRefs}><span style={{transitionDelay: `${transition_delay*(2)}ms`}} className={isIntersected ? styles['active'] : ''}>Below is a few of my most recent projects. To view all work, head over to the <Link to="/works">project page</Link>.</span></p>
        </div>
        <div className={styles['works-wrapper']}>
            <ul className={styles['works-list']}>
                { portfolio.map((item, idx) => (
                    <li className={styles['works-item']} key={`works item ${idx}`}>
                        <Link onMouseOver={onMouseEvent} onMouseLeave={onMouseLeave} ref={addToLinkRefs} to={`/works/${item.title}`} className={styles['works-link']}>
                            <div className={styles['link-text__wrapper']}>
                                <p ref={addToRevealRefs} className={styles['link-text']}><span style={{transitionDelay: `${transition_delay*(idx+1)}ms`}} className={isIntersected ? styles['active'] : ''}>{ item.title }</span></p>
                                <p ref={addToRevealRefs} className={styles['link-text']}><span style={{transitionDelay: `${transition_delay*(idx+1)}ms`}} className={isIntersected ? styles['active'] : ''}>{ item.subject }</span></p>
                                <p ref={addToRevealRefs} className={styles['link-text']}><span style={{transitionDelay: `${transition_delay*(idx+1)}ms`}} className={isIntersected ? styles['active'] : ''}>{ item.subject }</span></p>
                            </div>
                        </Link>
                    </li>
                )) }
            </ul>
            <div className={styles['works-img__wrapper']}>
                { portfolio?.map((item, idx) => (
                    <div className={(
                        () => {
                            if (mouse === item.title)
                                return styles['works-img'] + ' ' + styles['active']
                            else if (mouse === item.title + "leave")
                                return styles['works-img'] + ' ' + styles['deactive']
                            else
                                return styles['works-img']
                            }
                            )()
                        } id={`img-${item.title}`} key={`works img ${idx}`} ref={addToImgRefs}>
                        <img src={item.image} alt="" />
                    </div>
                )) }
            </div>
        </div>
    </section>
  )
}

export default Works
