import React, { useState, useRef } from 'react'
import TextField from '@mui/material/TextField'
import SimpleMDE from 'react-simplemde-editor'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HideImageIcon from '@mui/icons-material/HideImage';
import clsx from 'clsx';

import axios, { baseURL } from '../../utils/axios'
import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { Navigate } from 'react-router'
import isAuth from '../../utils/isAuth'
import { TagsBlock } from '../../components'
import { fetchCreatePost, fetchPostsSortByTag, fetchUpdatePost } from '../../redux/slices/posts'
import { useDispatch } from 'react-redux'

export const AddPost = ({ id, editTitle, index, editText, editImageUrl, editTags, setIsEdit, setIsAddNote }) => {
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)

  const [error, setError] = useState('')
  const [title, setTitle] = useState(editTitle || '')
  const [tag, setTag] = useState('')

  const [post, setPost] = useState({
    _id: id || Date.now(),
    title: title,
    text: editText || '',
    tags: editTags ? [...editTags] : ['#ВРЕМЕНИ.NET', '#NOTIME'],
    imageUrl: editImageUrl || '',
  })
  const onChangeTags = (e) => {
    setTag(e)
    if (e[e.length - 1] === ' ') {
      e = "#" + e.replace(/[!@#$%^&*()-+=/?.,<>~`"№;:]/g, '').match(/\S/g).join('')
      if (!post.tags.includes(e)) post.tags.push(e)
      setTag('')
    }
  }

  const postsSortByTag = (tagName) => {
    if (setIsEdit || setIsAddNote) {
      post.tags = post.tags.filter(item => item !== tagName)
      setPost({ ...post })
    } else {
      dispatch(fetchPostsSortByTag(tagName.replace(/#/, '')))
    }
  }

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      const { data } = await axios.post('/uploads', formData)
      post.imageUrl = data.url
      setPost({ ...post })
    } catch (err) {
      console.log('Ошмбка ' + err)
      setError(err.message)
    }
  }

  const onClickRemoveImage = () => {
    post.imageUrl = ''
    setPost({ ...post })
  }
  const onHomeLocate = () => {
    if (id) {
      setIsEdit(false)
    } else {
      setIsAddNote(false)
    }
  }

  const onChange = React.useCallback((value) => {
    post.text = value
  }, [])

  const onSubmit = async () => {
    try {
      post.title = title
      if (post.text || title) {
        if (id) {
          dispatch(fetchUpdatePost({ post, index }))
          setIsEdit(false)
        } else {
          dispatch(fetchCreatePost(post))
          setIsAddNote(false)
        }
      }

    } catch (err) {
      console.warn('onSubmit ' + err)
      setError(err.message)
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '100%',
      autofocus: true,
      placeholder: 'Текст заметки',
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
    <div className={clsx(styles.root, { [styles.rootFull]: false }, { [styles.rootImage]: post.imageUrl })}>
      <div className={clsx(styles.buttons)}>
        <input type="file" id="input" ref={inputFileRef} onChange={handleChangeFile} hidden accept='image/*' />
        <ImageRoundedIcon onClick={() => inputFileRef.current.click()} />
        <SaveRoundedIcon onClick={onSubmit} />
        <CancelRoundedIcon onClick={onHomeLocate} />
        <HideImageIcon onClick={onClickRemoveImage} />
      </div>

      {post.imageUrl && (
        <img
          className={clsx(styles.image)}
          src={baseURL+post.imageUrl}
          alt={post.title}
        />
      )}
      <div className={styles.wrapper}>
        <TextField
          className={clsx(styles.title)}
          variant="standard"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <SimpleMDE
          className={clsx(styles.editor)}
          value={post.text}
          onChange={onChange}
          options={options}
        />
        <TagsBlock
          items={post.tags}
          postsSortByTag={postsSortByTag}
          imageUrl={post.imageUrl}
          add
        />
        <TextField
          className={clsx(styles.tags)}
          variant="standard"
          placeholder="Тэги"
          value={tag}
          onChange={(e) => onChangeTags(e.target.value)}
          fullWidth />
      </div>
    </div>
  )
}
