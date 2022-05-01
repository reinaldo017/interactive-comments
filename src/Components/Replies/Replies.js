import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment/Comment'

const Replies = ({ replies = null, vote, addComment, currentUser }) => {
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
        currentUser={currentUser}
      />)
    )
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  vote: PropTypes.func,
  addComment: PropTypes.func,
  currentUser: PropTypes.string
}

export default Replies
