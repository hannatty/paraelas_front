import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://paraelas-back.onrender.com/projects'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValuetitle(event) {
    setTitle(event.target.value)
  }

  function handleInputValuedescription(event) {
    setDescription(event.target.value)
  }

  function handleInputValueimage(event) {
    setImage(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', title, description, image)

    async function sendData() {
      await Axios.post(baseURL, {
        title: title,
        description: description,
        image: image
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setTitle('')
    setDescription('')
    setImage('')
  }

  return (
    <>
      <Header
        title='Por Elas Para Elas'
        subtitle='Conheça iniciativas de impacto feitas por mulheres para mulheres!'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.image} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.title}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.description}</p>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Conhece uma iniciativa feita por mulheres e para mulheres? Cadastra aqui!</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValuetitle} 
            placeholder="Digite o nome da iniciativa"
            value={title}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueimage} 
            placeholder="Digite o link da imagem"
            value={image}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValuedescription} 
            placeholder="Digite uma pequena descrição sobre essa iniciativa"
            value={description}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Cadastrar</button>
          {success && <p className={styles.feedback_message}>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}
