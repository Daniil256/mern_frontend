
export const isMe = ({ comments, userData }) => {
    console.log(comments, userData);
    return comments.find(item => item.user._id === userData._id)
}