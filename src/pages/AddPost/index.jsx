import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import axios from '../../../axios'
import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { selectIsAuth } from '../../redux/slices/auth'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router'

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth)
  const inputFileRef = React.useRef(null)
  const { id } = useParams()

  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl && data.imageUrl)
        setTags(data.tags.join(','))
      })
    }
  }, [])

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.log('Ошмбка ' + err)
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onChange = React.useCallback((value) => {
    setText(value)
  }, [])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const fields = {
        title,
        text,
        tags,
        imageUrl
      }
      const { data } =
        id ? await axios.patch(`/posts/${id}`, fields)
          : await axios.post('/posts', fields)

      const _id = id ? id : data._id
      navigate(`/posts/${_id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  )
  if (!isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper style={{ padding: 30 }}>
      <input type="file" id="input" ref={inputFileRef} onChange={handleChangeFile} hidden />
      <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {id ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  )
}
