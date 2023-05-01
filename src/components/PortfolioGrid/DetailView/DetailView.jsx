import React, { useLayoutEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import styles from './Detailview.module.scss'
import {motion} from 'framer-motion'
import { query, getDocs, collection, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../../../firebase'
import { toast } from 'react-toastify';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import 'react-toastify/dist/ReactToastify.css';
import UpdateView from '../UpdateForm/UpdateView'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const DetailView = () => {
  const { id } = useParams()
  const [update, setUpdate] = useState(false)
  const [portfolio, setPortfolio] = useState([])
  const [user, setUser] = useState(null)
  const auth = getAuth()
  const navigate = useNavigate();
  const deletePost = async () => {
    const colRef = collection(db, 'portfolio')
    const q = query(colRef, where('title', '==', id))
    onSnapshot(q, (snapshot) => {
      let title = []
      snapshot.docs.map((doc) => {
        title.push({...doc.data(), id:doc.id})
      })
      deleteDoc(doc(db, 'portfolio', title[0].id));
      navigate("/works")
      toast.success("Deleted", {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }
  useLayoutEffect(() => {
    const getPortfolio = async () => {
      const querySnapshot = await getDocs(collection(db, 'portfolio'))
      setPortfolio(querySnapshot.docs.map((doc) => doc.data()).filter((data) => data.title === id))
    }
    onAuthStateChanged(auth, (user) => {
      if (!user) return setUser(null)
      return setUser(user)
    })
    getPortfolio()
  }, [auth, id])
  return (
    portfolio.filter((data => data.title === id)).map((item) => (
      <motion.section className={styles['detailview']} initial="hidden" animate="enter" exit="exit" variants={ variants } transition={{ duration: 0.4, type: 'easeInOut' }} style={{ position: 'relative' }} key={`${item.title}`}>
          <div className={styles['detailview-left']}>
            <h1 className={styles['detailview-title']}><span>{item.title}</span></h1>
            <p className={styles['detailview-desc']}><span>{item.subject}</span></p>
          </div>
          <div className={styles['detailview-right']}>
            <Breadcrumbs />
            <a className={styles['detailvew-img-wrapper']} target="_blank" rel="noreferrer" href={"https://" + item.link}>
              <img src={item.image} className={styles['detailview-img']} alt="" />
            </a>
          </div>
          <div className={styles['detail-work']}>
            <div className={styles['work-textbox']}>
              <div className={styles['work-info']}>
                <p className={styles['work-title']}><span>Client info</span></p>
                <h5 className={styles['work-text']}><span>{item.client}</span></h5>
              </div>
              <div className={styles['work-info']}>
                <p className={styles['work-title']}><span>Our task</span></p>
                <h5 className={styles['work-text']}><span>{item.task}</span></h5>
              </div>
              <div className={styles['work-info']}>
                <p className={styles['work-title']}><span>Our role</span></p>
                <h5 className={styles['work-text']}><span>{item.role}</span></h5>
              </div>
              <div className={styles['work-info']}>
                <p className={styles['work-title']}><span>Overview</span></p>
                <h5 className={styles['work-text']}><span>{item.overview}</span></h5>
              </div>
              { user &&
                <div className={styles['work-info']}>
                  <p className={styles['work-title']}><span>Actions with this post</span></p>
                  <div className={styles['work-btn-wrapper']}>
                    <button onClick={deletePost} className={styles['work-btn']}><span>Delete</span></button>
                    <button onClick={() => setUpdate(!update)} className={styles['work-btn']}><span>Update</span></button>
                  </div>
                </div>
              }
            </div>
          </div>
          {
            user && update && <UpdateView data={portfolio} />
          }
      </motion.section>
    ))
  )
}

export default DetailView
