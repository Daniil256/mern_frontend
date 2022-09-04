import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { fetchAuth } from "../../redux/slices/auth";
import isAuth from "../../utils/isAuth";

export const Login = () => {
  const dispatch = useDispatch()
  const [isErrorLogin, setIsErrorLogin] = useState(false)
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Danya',
      password: '12345',
    },
    // onChange при отправке, all всегда
    mode: 'onChange'
  })

  if (isAuth()) {
    return <Navigate to="/" />
  }
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if (data.error) setIsErrorLogin(true)
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
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
          type="fullName"
          className={styles.field}
          label="Полное имя"
          fullWidth />

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
      {isErrorLogin &&
        <span style={{ fontWeight: 600 }} >Неверный логин или пароль</span>
      }
    </Paper>
  );
};
