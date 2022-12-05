import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from './TagsBlock.module.scss'
import clsx from 'clsx';

export const TagsBlock = ({ items, isLoading, imageUrl, add, postsSortByTag }) => {

  return (
    <div className={clsx(styles.TagsBlock, { [styles.TagsBlockImage]: imageUrl }, { [styles.TagsBlockAdd]: add })}>
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
