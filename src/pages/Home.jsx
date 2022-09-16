import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopulatePosts, fetchPosts, fetchTags } from '../redux/slices/posts';
import { fetchAllComments } from '../redux/slices/comments';
import { baseURL } from '../utils/axios';
import { useState } from 'react';
import { useParams } from 'react-router';
import { AddPost } from './AddPost';

export const Home = () => {
  const [category, setCategory] = useState(0)
  const { add_note } = useParams()
  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.posts)
  const { comments } = useSelector(state => state)
  const userData = useSelector(state => state.auth.data)
  const isPostLoading = posts.status === 'Loading'
  const isTagsLoading = tags.status === 'Loading'
  const isCommentsLoading = comments.status === 'Loading'
  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchAllComments())
  }, [])
  const switchCategory = (value) => {
    if (value === category) return
    setCategory(value)
    if (value === 0) {
      dispatch(fetchPosts())
    }
    if (value === 1) {
      dispatch(fetchPopulatePosts())
    }
  }
    return (
    posts.message && !posts.items.length
      ?
      <span style={{ fontWeight: 900 }}>Ошибка загрузки постов</span>
      :
      <>
        <Tabs style={{ marginBottom: 15 }} value={category} aria-label="basic tabs example">
          <Tab label="Новые" onClick={() => switchCategory(0)} />
          <Tab label="Популярные" onClick={() => switchCategory(1)} />
        </Tabs>
        <Grid container spacing={2}>
          <Grid xs={10} container wrap='wrap' item>

            {isPostLoading
              ?
              [...Array(5)].map((_, i) =>
                <Post key={i} isLoading={true} />)
              :
              posts.items.map(obj =>
                <Post
                  title={obj.title}
                  key={obj._id}
                  id={obj._id}
                  text={obj.text}
                  imageUrl={obj.imageUrl && baseURL + obj.imageUrl}
                  tags={obj.tags}
                  user={obj?.user || userData}
                  createdAt={obj?.createdAt || Date.now()}
                  changedAt={obj?.changedAt || ''}
                  viewsCount={obj?.viewsCount || []}
                  commentsCount={obj?.commentsCount || 0}
                  isEditable={userData?._id === obj.user?._id}
                />)}
            {add_note && <AddPost />}
          </Grid>
          <Grid xs={2} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              comments={comments.comments}
              isLoading={isCommentsLoading}
            />
          </Grid>
        </Grid>
      </>
  );
};
