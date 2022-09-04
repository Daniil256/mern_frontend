import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router';
import isAuth from '../../utils/isAuth';

export const Registration = () => {
  const [isErrorLogin, setIsErrorLogin] = useState('')
  const dispatch = useDispatch()
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'danya',
      password: '12345',
    },
    // onChange при отправке, all всегда
    mode: 'onChange'
  })
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if (data.error) {
      if (data.error.message === 'Request failed with status code 402') {
        return setIsErrorLogin('Такое имя уже существует')
      }
      return setIsErrorLogin('Ошибка регистрации')
    }
    if (data.payload.token) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  if (isAuth()) {
    return <Navigate to="/" />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
          type="fullName"
          className={styles.field}
          label="Полное имя"
          fullWidth />

        <TextField
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          type="password"
          fullWidth
          className={styles.field} />
        <Button disabled={!isValid} size="large" type="submit" variant="contained" fullWidth >
          Зарегистрироваться
        </Button>
      </form>
      <span style={{ fontWeight: 600 }} >{isErrorLogin}</span>
    </Paper>
  );
};
