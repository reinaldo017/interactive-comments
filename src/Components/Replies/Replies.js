import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment/Comment'

const Replies = ({ replies = null, vote, addComment, deleteComment, currentUser }) => {
  if (replies === null) {
    return null
  } else {
    return (
      replies.map(reply =>
      <Comment
        key={reply.id}
        info={reply}
        replyingTo={reply.replyingTo}
        vote={vote}
        addComment={addComment}
        deleteComment={deleteComment}
        currentUser={currentUser}
      />)
    )
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  vote: PropTypes.func,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  currentUser: PropTypes.object
}

export default Replies
