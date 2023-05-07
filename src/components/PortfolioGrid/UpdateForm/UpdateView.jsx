import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { db, storage } from '../../../firebase'
import styles from './UpdateView.module.scss'

const UpdateView = (data) => {
  const form = useRef()
  const [f_title, setTitle] = useState(data.data[0].title);
  const [f_link, setLink] = useState(data.data[0].link);
  const [f_subject, setSubject] = useState(data.data[0].subject);
  const [f_image, setImage] = useState(data.data[0].image);
  const [f_client, setClient] = useState(data.data[0].client);
  const [f_task, setTask] = useState(data.data[0].task);
  const [f_role, setRole] = useState(data.data[0].role);
  const [f_overview, setOverview] = useState(data.data[0].overview);
  const [f_type, setType] = useState(data.data[0].type);
  const [imagePreview, setImagePreview] = useState();
  function handleTitle(e) {
        e.preventDefault();
        setTitle(e.target.value);
  }
  function handleLink(e) {
    e.preventDefault();
    setLink(e.target.value);
  }
  function handleSubject(e) {
    e.preventDefault();
    setSubject(e.target.value);
  }
  function handleImage(e) {
    e.preventDefault();
    setImage(e.target.files[0]);
  }
  function getFile(e)
  {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  function handleClient(e) {
    e.preventDefault();
    setClient(e.target.value);
  }
  function handleTask(e) {
    e.preventDefault();
    setTask(e.target.value);
  }
  function handleRole(e) {
    e.preventDefault();
    setRole(e.target.value);
  }
  function handleOverview(e) {
    e.preventDefault();
    setOverview(e.target.value);
  }
  function handleType(e) {
    e.preventDefault();
    setType(e.target.value);
  }
  const updateWork = (e) => {
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
    console.log(image)
    if (title) {
      const colRef = collection(db, 'portfolio')
      const q = query(colRef, where('title', '==', data.data[0].title))
      onSnapshot(q, (snapshot) => {
          let idList = []
          snapshot.docs.map((doc) => {
              idList.push({ ...doc.data(), id: doc.id })
          })
          if (image !== undefined)
          {
            let storageRef = ref(storage, `portfolio/${image.name}`)
            uploadBytes(storageRef, image)
            .then(
                (snapshot) => {
                    getDownloadURL(snapshot.ref)
             .then((DownloadURL) => {
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
                        }, idList[0].id)
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
                        }, idList[0].id)
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
                    }, idList[0].id)
                }
            )
            return;
          }
          saveWork({
            title,
            link,
            subject,
            image: f_image,
            client,
            task,
            role,
            overview,
            type,
          }, idList[0].id)
      })
     }
    }

  const saveWork = async (work, id) => {
    try {
        if (id !== undefined) {
            await updateDoc(doc(db, 'portfolio', id), work)
            //window.location.reload(false)
            toast.success("Updated", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    } catch (error) {
        alert(error)
    }
  }

  return (
    <div className={styles['update']}>
        <form ref={form} onSubmit={updateWork} className={styles['update-form']}>
                <div className={styles['update-wrapper']}>
                    <input className={styles['form-input']} type="text" placeholder='Title' onChange={handleTitle} value={f_title} />
                    <input className={styles['form-input']} type="text" placeholder='Link' onChange={handleLink} value={f_link} />
                    <textarea className={styles['form-input']} type="text" placeholder='Subject' onChange={handleSubject} value={f_subject} />
                    <input className={styles['form-input']} type="file" onChange={handleImage && getFile} />
                    <textarea className={styles['form-input']} type="text" placeholder='Client' onChange={handleClient} value={f_client} />
                    <input className={styles['form-input']} type="text" placeholder='Task' onChange={handleTask} value={f_task} />
                    <input className={styles['form-input']} type="text" placeholder='Role' onChange={handleRole} value={f_role} />
                    <textarea className={styles['form-input']} type="text" placeholder='Overview' onChange={handleOverview} value={f_overview} />
                    <input className={styles['form-input']} type="text" placeholder='Type' onChange={handleType} value={f_type} />
                    <div className={styles['update-button-wrapper']}>
                        <button className={styles['form-btn']} type="submit">Apply</button>
                    </div>
                </div>
        </form>
        <img className={styles['form-img']} src={typeof f_image === "" ? imagePreview : f_image} alt="" />
    </div>
  )
}

export default UpdateView