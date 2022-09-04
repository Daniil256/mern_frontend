import React, { useEffect, useState } from "react";
import axios, { baseURL } from '../utils/axios'
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import { Index } from '../components/AddComment/index'
import { useSelector } from "react-redux";

export const FullPost = () => {
  const [data, setData] = useState({})
  const userData = useSelector(state => state.auth.data)
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  const [isLoadingComs, setIsLoadingComs] = useState(true)
  const [comments, setComments] = useState([])

  const { id } = useParams()

  useEffect(() => {
    axios.put(`/posts/${id}`, userData)
      .then(res => {
        setData(res.data)
        setIsLoadingPost(false)
      })
      .catch(err => console.log('Ошибка получения статьи ' + err))
    axios.get(`/comments/${id}`)
      .then(res => {
        setComments(res.data)
        setIsLoadingComs(false)
      })
      .catch(err => console.log('Ошибка получения комментов ' + err))
  }, [])
  if (isLoadingPost) {
    return <Post isLoading={isLoadingPost} isFullPost />
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl && baseURL + data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isEditable={userData?._id === data.user._id}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock comments={comments} isLoading={isLoadingComs} isFullPost >
        <Index comments={comments} setComments={setComments} />
      </CommentsBlock>
    </>
  );
};
