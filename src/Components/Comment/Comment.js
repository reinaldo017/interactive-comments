import { useState, React } from 'react'
import PropTypes from 'prop-types'
import Replies from '../Replies/Replies'
import NewComment from '../NewComment/NewComment'
import CurrentUserComment from '../CurrentUserComment/CurrentUserComment'
import OtherUserComment from '../OtherUserComment/OtherUserComment'
import EditComment from '../EditComment/EditComment'

const Comment = ({ info, add, remove, update, vote, currentUser }) => {
  // States
  const [newReply, setNewReply] = useState(false)
  const [editMode, setEditMode] = useState(false)

  //  Helpers
  const toggleEditMode = () => {
    setEditMode(prev => !prev)
  }

  const toggleReply = () => {
    setNewReply(prev => !prev)
  }

  //  Render
  if (info.user.username === currentUser.username && editMode === false) {
    return (
      <>
        <CurrentUserComment
          info={info}
          vote={vote}
          remove={remove}
          toggleEditMode={toggleEditMode}
        />

        <Replies
          replies={info.replies}
          currentUser={currentUser}
          vote={vote}
          add={add}
          update={update}
          remove={remove}
        />
      </>
    )
  } else if (info.user.username === currentUser.username && editMode === true) {
    return (
      <EditComment
        info={info}
        update={update}
        vote={vote}
        toggleEditMode={toggleEditMode}
      />
    )
  } else {
    return (
      <>
        <OtherUserComment
          info={info}
          replyingTo={info.replyingTo}
          vote={vote}
          toggleReply={toggleReply}
        />

        {newReply === true &&
          <NewComment
            currentUser={currentUser}
            repliedComment={info}
            add={add}
            toggleReply={toggleReply}
          />
        }

        <Replies
          replies={info.replies}
          currentUser={currentUser}
          vote={vote}
          add={add}
          update={update}
          remove={remove}
        />
      </>
    )
  }
}

Comment.propTypes = {
  info: PropTypes.object,
  replyingTo: PropTypes.string,
  add: PropTypes.func,
  remove: PropTypes.func,
  update: PropTypes.func,
  vote: PropTypes.func,
  currentUser: PropTypes.object
}

export default Comment
