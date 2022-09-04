import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import axios, { baseURL } from '../../utils/axios'
import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { Navigate, useNavigate, useParams } from 'react-router'
import isAuth from '../../utils/isAuth'
import { TagsBlock } from '../../components'
import { fetchCreatePost, fetchPosts } from '../../redux/slices/posts'
import { useDispatch } from 'react-redux'

export const AddPost = () => {
  const inputFileRef = React.useRef(null)
  const { id } = useParams()

  const [text, setText] = React.useState('')
  const [error, setError] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [tag, setTag] = React.useState('')
  const [tags, setTags] = React.useState(['#ВРЕМЕНИ.NET', '#NOTIME'])
  const [imageUrl, setImageUrl] = React.useState('')

  const onChangeTags = (e) => {
    setTag(e)
    if (e[e.length - 1] === ' ') {
      e = "#" + e.replace(/[!@#$%^&*()-+=/?.,<>~`"№;:]/g, '').match(/\S/g).join('')
      if (!tags.includes(e)) tags.push(e)
      setTag('')
    }
  }

  useEffect(() => {
    if (id) {
      try {
        axios.put(`/posts/${id}`).then(({ data }) => {
          setTitle(data.title)
          setText(data.text)
          setImageUrl(data.imageUrl && data.imageUrl)
          setTags(data.tags.join(' ').replace(/\#/))
        })
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
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
      setError(err.message)
    }
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onChange = React.useCallback((value) => {
    setText(value)
  }, [])

  const onSubmit = async () => {
    try {
      const fields = {
        _id: Date.now(),
        title,
        text,
        tags,
        imageUrl,
      }
      dispatch(fetchCreatePost(fields))

      navigate('/')

      // id ? await axios.patch(`/posts/${id}`, fields)
      //   : await axios.post('/posts', fields)

    } catch (err) {
      console.log(err)
      setError(err.message)
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
      }
    }),
    []
  )
  if (!isAuth()) {
    return <Navigate to="/" />
  }
  return (
    <Paper style={{ padding: 30 }}>
      {error &&
        <div style={{ fontWeight: 600, margin: '10px 0' }}>{error}</div>
      }
      <input type="file" id="input" ref={inputFileRef} onChange={handleChangeFile} hidden />
      <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={baseURL + imageUrl} alt="Uploaded" />
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
      <TagsBlock items={tags} isEditable setTags={setTags} />

      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tag}
        onChange={(e) => onChangeTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit} disabled={!text}>
          {id ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  )
}
