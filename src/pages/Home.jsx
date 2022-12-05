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
import { useState } from 'react';
import { AddPost } from './AddPost';

export const Home = ({ setIsAddNote, isAddNote }) => {

  const dispatch = useDispatch()

  const [category, setCategory] = useState(0)
  const { posts, tags } = useSelector(state => state.posts)
  const { comments } = useSelector(state => state)
  const userData = useSelector(state => state.auth.data)
  const isPostLoading = posts.status === 'Loading'
  const isTagsLoading = tags.status === 'Loading'
  const isCommentsLoading = comments.status === 'Loading'
  // console.log(posts);
  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchAllComments())
  }, [])

  const switchCategory = (value) => {
    setCategory(value)
    switch (value) {
      case category:
        return
      case 0:
        dispatch(fetchPosts())
      case 1:
        dispatch(fetchPopulatePosts())
      default:
        return
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
              posts.items.map((obj, index) =>
                <Post
                  index={index}
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  text={obj.text}
                  imageUrl={obj.imageUrl ? obj.imageUrl: ''}
                  tags={obj.tags}
                  user={obj?.user || userData}
                  createdAt={obj?.createdAt || Date.now()}
                  changedAt={obj?.changedAt || ''}
                  viewsCount={obj?.viewsCount || []}
                  commentsCount={obj?.commentsCount || 0}
                  isEditable={userData?._id === obj.user?._id}
                  setIsAddNote={setIsAddNote}
                  isAddNote={isAddNote}

                  status={obj.status}
                />)}
            {isAddNote && <AddPost setIsAddNote={setIsAddNote} isAddNote={isAddNote} />}
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
