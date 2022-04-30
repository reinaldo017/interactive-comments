import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment/Comment'

const Replies = ({ replies = null, voteReply, mainCommentId }) => {
  if (replies === null) {
    return null
  } else {
    return (
      replies.map(reply =>
      <Comment
        key={reply.id}
        info={reply}
        replyingTo={reply.replyingTo}
        vote={(commentId, action) => { voteReply(mainCommentId, reply.id, action) }}
      />)
    )
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  upvoteReply: PropTypes.func,
  mainCommentId: PropTypes.number
}

export default Replies
