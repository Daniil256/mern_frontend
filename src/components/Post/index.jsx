import React, { useState } from 'react';
import clsx from 'clsx';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReactMarkdown from "react-markdown";
import { baseURL } from '../../utils/axios';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRemovePosts } from '../../redux/slices/posts';
import { Avatar, AvatarGroup } from '@mui/material';
import { stringAvatar } from '../../utils/setColorAvatart';
import { TagsBlock } from '../TagsBlock';
import { writeDate } from '../../utils/writeDate';
import { AddPost } from '../../pages';
import { SyncIcon } from '../SyncIcon/SyncIcon';

export const Post = ({
  id,
  index,
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
  isEditable,
  status
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()

  const onClickRemove = () => {
    if (isEditable) {
      dispatch(fetchRemovePosts({ index, id }))
    }
  }
  const onClickEdit = () => {
    if (isEditable) {
      setIsEdit(true)
    }
  }

  if (isLoading) {
    return <PostSkeleton />
  }
  if (isEdit) {
    return <AddPost id={id}
      index={index}
      editTitle={title}
      editText={text}
      editImageUrl={imageUrl}
      editTags={tags}
      setIsEdit={setIsEdit} />
  }
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost }, { [styles.rootImage]: imageUrl })}>
      {status ? <SyncIcon/> :''}
      <div className={styles.editButtons}>
        {!isFullPost && <Link to={`/posts/${id}`}><OpenInNewOutlinedIcon /></Link>}
        {isEditable
          &&
          <>
            <EditIcon onClick={onClickEdit} />
            <DeleteOutlinedIcon onClick={onClickRemove} />
          </>
        }
      </div>
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={baseURL+imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} createdAt={createdAt} changedAt={changedAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {title}
          </h2>
          {!isFullPost && <ReactMarkdown className={styles.text} children={text} />}
          {children && <div className={styles.content}>{children}</div>}

          <div className={styles.postDetails}>
            <TagsBlock items={tags} />
            <div className={styles.postDate}>{writeDate(createdAt)}</div>
            {changedAt
              &&
              <div className={styles.postDate}>Изменено {writeDate(changedAt)}</div>
            }
            <div className={styles.comments}>
              <CommentIcon />
              <span>{commentsCount}</span>
            </div>
            <div className={styles.views}>
              <EyeIcon />
              <AvatarGroup max={5}>
                {
                  viewsCount.map(item =>
                    item.avatarUrl?.length
                      ?
                      <Avatar
                        className={clsx(styles.avatar, { [styles.avatarImage]: imageUrl })}
                        key={item._id}
                        alt={item.fullName}
                        src={`${item.avatarUrl}`}
                      />
                      :
                      <Avatar
                        className={clsx(styles.avatar, { [styles.avatarImage]: imageUrl })}
                        key={item._id}
                        {...stringAvatar(item.fullName)}
                      />
                  )
                }
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}