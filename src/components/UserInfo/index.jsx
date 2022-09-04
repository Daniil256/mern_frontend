import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from '../../utils/setColorAvatart';

export const UserInfo = ({ fullName, avatarUrl, createdAt, changedAt }) => {
  return (
    <div className={styles.root}>
      {
        avatarUrl
          ?
          <Avatar
            className={styles.avatar}
            src={`${avatarUrl}`}
            alt={fullName}
          />
          :
          <Avatar
            className={styles.avatar}
            {...stringAvatar(fullName)}
          />
      }
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>

      </div>
    </div>
  );
};
