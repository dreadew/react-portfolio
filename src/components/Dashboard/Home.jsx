import React, { useRef, useState } from 'react'
import styles from './Dashboard.module.scss'
import { auth, storage, db } from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const form = useRef()
  const submitWork = (e) => {
    e.preventDefault()
    const title = form.current[0]?.value
    const link = form.current[1]?.value
    const subject = form.current[2]?.value
    const image = form.current[3]?.files[0]
    const client = form.current[4]?.value
    const task = form.current[5]?.value
    const role = form.current[6]?.value
    const overview = form.current[7]?.value
    const type = form.current[8]?.value

   if (title)
   {
    const storageRef = ref(storage, `portfolio/${image.name}`)
    uploadBytes(storageRef, image).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((DownloadURL) => {
          saveWork({
            title,
            link,
            subject,
            image: DownloadURL,
            client,
            task,
            role,
            overview,
            type,
          })
        }, () => {
          saveWork({
            title,
            link,
            subject,
            image: null,
            client,
            task,
            role,
            overview,
            type,
          })
        })
      }, () => {
        saveWork({
          title,
          link,
          subject,
          image: null,
          client,
          task,
          role,
          overview,
          type,
        })
      }
    )
   }
  }

  const saveWork = async (work) => {
    try {
      await addDoc(collection(db, 'portfolio'), work)
      window.location.reload(false)
      toast.success("Created", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      alert(error)
    }
  }

  const logout = async () => {
    try {
      auth.signOut()
      toast.success('Success!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (err) {
      alert(err);
    }
  }

  const [image, setImage] = useState()
  function getFile(e)
  {
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className={styles['dashboard']}>
        <form ref={form} onSubmit={submitWork} className={styles['dashboard-form']}>
            <div className={styles['dashboard-wrapper']}>
              <input className={styles['form-input']} type="text" placeholder='Title' />
              <input className={styles['form-input']} type="text" placeholder='Link' />
              <textarea className={styles['form-input']} type="text" placeholder='Subject' />
              <input className={styles['form-input']} onChange={getFile} type="file" />
              <textarea className={styles['form-input']} type="text" placeholder='Client' />
            </div>
            <div className={styles['dashboard-wrapper']}>
              <input className={styles['form-input']} type="text" placeholder='Task' />
              <input className={styles['form-input']} type="text" placeholder='Role' />
              <textarea className={styles['form-input']} type="text" placeholder='Overview' />
              <input className={styles['form-input']} type="text" placeholder='Type' />
              <div className={styles['dashboard-button-wrapper']}>
                <button className={styles['form-btn']} type="submit">Submit</button>
                <button onClick={logout} className={styles['form-btn']}>Log out</button>
              </div>
            </div>
        </form>
        {image &&
                (<img src={image} className={styles['form-img']}/>)
        }
    </div>
  )
}

export default Home