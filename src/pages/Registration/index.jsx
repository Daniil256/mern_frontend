import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'danya',
      email: 'daniil123@sowbaka.ru',
      password: '12345',
    },
    // onChange при отправке, all всегда
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    // if (data.payload.token) {
    //   window.localStorage.setItem('token', data.payload.token)
    // }
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
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          type="email"
          className={styles.field}
          fullWidth />

        <TextField
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          type="password"
          fullWidth
          className={styles.field} />
        <Button disabled={!isValid} size="large" type="submit" variant="contained"
          fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
