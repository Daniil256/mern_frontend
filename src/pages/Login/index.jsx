import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'daniil123@sowbaka.ru',
      password: '12345',
    },
    // onChange при отправке, all всегда
    mode: 'onChange'
  })

  if (isAuth) {
    return <Navigate to="/" />
  }
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if (data.payload.token) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          type="email"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          type="password"
          fullWidth
        />
        <Button disabled={!isValid} size="large" type="submit" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
