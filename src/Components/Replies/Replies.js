import React from 'react'
import PropTypes from 'prop-types'
import Comment from '../Comment/Comment'

const Replies = ({ replies = null, vote, add, remove, update, currentUser }) => {
  if (replies === null) {
    return null
  } else {
    return (
      <ul className='replies'>
        {replies.map(reply =>
        <Comment
          key={reply.id}
          info={reply}
          vote={vote}
          add={add}
          remove={remove}
          update={update}
          currentUser={currentUser}
        />
        )}
      </ul>
    )
  }
}

Replies.propTypes = {
  replies: PropTypes.array,
  vote: PropTypes.func,
  add: PropTypes.func,
  remove: PropTypes.func,
  update: PropTypes.func,
  currentUser: PropTypes.object
}

export default Replies
