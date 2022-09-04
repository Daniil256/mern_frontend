import React from "react"

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import styles from './CommentsBlock.module.scss'
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { stringAvatar } from "../utils/setColorAvatart";

export const CommentsBlock = ({ comments, children, isLoading, isFullPost }) => {
  return (
    <SideBlock className={styles.CommentsBlock} title={isFullPost ? "Комментарии" : "Последние комментарии"}>
      <List disablePadding>
        {isLoading
          ?
          [...Array(5)].map((_, i) =>
            <React.Fragment key={i}>
              <Skeleton variant="circular" width={40} height={40} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Skeleton variant="text" height={25} width={120} />
                <Skeleton variant="text" height={18} width={230} />
              </div>
            </React.Fragment>
          )
          :
          comments.map(obj => (
            <React.Fragment key={obj._id} >
              <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                  {
                    obj.user.avatarUrl
                      ?
                      <Avatar alt={obj.user.fullName} src={`${obj.user.avatarUrl}`} />
                      :
                      <Avatar {...stringAvatar(obj.user.fullName)} />
                  }
                </ListItemAvatar>
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
      </List>
      {children}
    </SideBlock>
  );
};
