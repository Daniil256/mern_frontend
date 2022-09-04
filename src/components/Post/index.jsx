import React from 'react';
import clsx from 'clsx';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReactMarkdown from "react-markdown";

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRemovePosts } from '../../redux/slices/posts';
import { Avatar, AvatarGroup } from '@mui/material';
import { stringAvatar } from '../../utils/setColorAvatart';
import { TagsBlock } from '../TagsBlock';
import { writeDate } from '../../utils/writeDate';

export const Post = ({
  id,
  title,
  text,
  createdAt,
  changedAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable
}) => {
  if (isLoading) {
    return <PostSkeleton />;
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickRemove = () => {
    if (isEditable) {
      dispatch(fetchRemovePosts(id))
    }
  }
  const onClickEdit = () => {
    navigate(`/posts/${id}/edit`)
  }
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost }, { [styles.rootImage]: imageUrl })}>
      {isEditable
        &&
        <div className={styles.editButtons}>
          <EditIcon onClick={onClickEdit} />
          <DeleteIcon onClick={onClickRemove} />
        </div>
      }
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} createdAt={createdAt} changedAt={changedAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {!isFullPost && <ReactMarkdown className={styles.text} children={text} />}
          <ul className={styles.tags}>
            <TagsBlock items={tags} />
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <div className={styles.postDate}>{writeDate(user.createdAt)}</div>
          {user.changedAt
            &&
            <div className={styles.postDate}>Изменено {writeDate(user.changedAt)}</div>
          }
          <ul className={styles.postDetails}>

            <li>
              <EyeIcon />
              <AvatarGroup max={4}>
                {
                  viewsCount.map(item =>
                    item.avatarUrl.length
                      ?
                      <Avatar
                        key={item._id}
                        alt={item.fullName}
                        src={`${item.avatarUrl}`}
                        sx={{ width: 24, height: 24 }}
                      />
                      :
                      <Avatar
                        key={item._id}
                        style={{ transform: 'scale(0.7)', border: 'none' }}
                        {...stringAvatar(item.fullName)}
                      />
                  )
                }
              </AvatarGroup>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
