import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment/Comment'

const Replies = ({ replies = null, replyUpScore, parentId }) => {
  if (replies === null) {
    return null
  } else {
    return (
      replies.map(reply => <Comment key={reply.id} info={reply} upScore={() => { replyUpScore(parentId, reply.id) }} />)
    )
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  replyUpscore: PropTypes.func
}

export default Replies
