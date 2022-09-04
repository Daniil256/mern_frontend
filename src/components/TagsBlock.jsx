import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from './TagsBlock.module.scss'
import { useDispatch } from "react-redux";
import { fetchPostsSortByTag } from "../redux/slices/posts";
import { useNavigate } from "react-router";

export const TagsBlock = ({ items, isLoading, isEditable, setTags }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const postsSortByTag = (tagName) => {
    if (isEditable) {
      const index = items.indexOf(tagName)
      items.splice(index, 1)
      setTags([...items])
    } else {
      navigate(`/`)
      dispatch(fetchPostsSortByTag(tagName.replace(/#/, '')))
    }
  }
  return (
    <div className={styles.TagsBlock}>
      {isLoading
        ?
        [...Array(10)].map((_, i) =>
          <Skeleton width={100} style={{ width: 100, display: 'inline-block', margin: 5 }} key={i} height={20} />
        )
        :
        items.map(name =>
          <span className={styles.tag} key={name} onClick={() => postsSortByTag(name)}>
            {name}
          </span>
        )
      }
    </div>
  );
};
