import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import { useParams } from "react-router"
import { useSelector } from "react-redux"

import styles from "./AddComment.module.scss"
import { stringAvatar } from "../../utils/setColorAvatart"
import isAuth from "../../utils/isAuth"
import axios from '../../utils/axios'


export const Index = ({ setComments, comments }) => {
  const { id } = useParams()
  const [text, setText] = useState('')

  const userData = useSelector(state => state.auth.data)

  const onSubmit = () => {
    const comment = {
      text,
      postId: id,
      _id: Date.now(),
      user: userData
    }
    comments.push(comment)
    setComments([...comments])
    setText('')
    axios.post(`/posts/${id}/comments`, { text, postId: id, commentsCount: comments.length })
      .then(() => {
        axios.get(`/comments/${id}`)
          .then(res => setComments(res.data))
          .catch(err => console.log('Ошибка получения комментов ' + err))
      })
      .catch(err => console.log('Ошибка создания коммента ' + err))
  }
  return (
    isAuth()
    &&
    <div className={styles.root}>
      {
        userData.avatarUrl
          ?
          <Avatar
            classes={{ root: styles.avatar }}
            src={`${userData.avatarUrl}`}
            alt={userData.fullName}
          />
          :
          <Avatar
            classes={{ root: styles.avatar }}
            {...stringAvatar(userData.fullName)}
          />
      }
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          onChange={e => setText(e.target.value)}
          value={text}
          multiline
          fullWidth
        />
        <Button variant="contained" disabled={!text} onClick={onSubmit}>Отправить</Button>
      </div>
    </div>
  )
}
