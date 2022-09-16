import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import isAuth from '../../utils/isAuth';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { fetchAllComments } from '../../redux/slices/comments';

export const Header = () => {
  const dispatch = useDispatch()

  const onClickLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  }

  const reloadPosts = () => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchAllComments())
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to='/' className={styles.logo} onClick={reloadPosts}>
            Времени.net
          <span className={styles.border}></span>
            </Link>
          <div className={styles.buttons}>
            {isAuth() ? (
              <>
                <Link to="/add_note">
                  <Button>Создать заметку</Button>
                </Link>
                <Button onClick={onClickLogout}>Выйти</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button >Войти</Button>
                </Link>
                <Link to="/register">
                  <Button >Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
