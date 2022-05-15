import { useState, React } from 'react'
import PropTypes from 'prop-types'
import Replies from '../Replies/Replies'
import NewComment from '../NewComment/NewComment'
import CurrentUserComment from '../CurrentUserComment/CurrentUserComment'
import OtherUserComment from '../OtherUserComment/OtherUserComment'
import EditComment from '../EditComment/EditComment'
import { getOtherButton } from '../../helpers'

const Comment = ({ info, vote, replyingTo = null, addComment, deleteComment, updateComment, currentUser }) => {
  // States
  const [newReply, setNewReply] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Handlers
  const handleVote = ({ target }) => {
    const button = target
    const otherButton = getOtherButton(button)

    // Si ningún botón ha sido clickeado
    if (button.dataset.clicked === 'false' && otherButton.dataset.clicked === 'false') {
      vote(info.id, button.innerText)
      button.dataset.clicked = 'true'
    } else if (button.dataset.clicked === 'true' && otherButton.dataset.clicked === 'false') {
      //  Si se clickea un botón antes clickeado
      const action = target.innerText === '+' ? '-' : '+'
      vote(info.id, action)
      button.dataset.clicked = 'false'
    } else if (button.dataset.clicked === 'false' && otherButton.dataset.clicked === 'true') {
      // Si el otro botón ha sido clickeado antes
      vote(info.id, button.innerText)
      vote(info.id, button.innerText)
      button.dataset.clicked = 'true'
      otherButton.dataset.clicked = 'false'
    }
  }

  const handleDelete = () => {
    deleteComment(info.id)
  }

  //  Render
  if (info.user.username === currentUser.username && editMode === false) {
    return (
      <>
        <CurrentUserComment
          info={info}
          onVote={handleVote}
          onDelete={handleDelete}
          setEditMode={setEditMode}
          replyingTo={info.replyingTo}
        />

        <Replies
          replies={info.replies}
          vote={vote}
          addComment={addComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          currentUser={currentUser}
        />
      </>
    )
  } else if (info.user.username === currentUser.username && editMode === true) {
    return (
      <EditComment
        commentInfo={info}
        updateComment={updateComment}
        setEditMode={setEditMode}
      />
    )
  } else {
    return (
      <>
        <OtherUserComment
          info={info}
          onVote={handleVote}
          setNewReply={setNewReply}
          replyingTo={info.replyingTo}
        />

        {newReply === true &&
          <NewComment
              currentUser={currentUser}
              addComment={addComment}
              setNewReply={setNewReply}
              commentReplied={info}
            />
        }

        <Replies
          replies={info.replies}
          vote={vote}
          addComment={addComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          currentUser={currentUser}
        />
      </>
    )
  }
}

Comment.propTypes = {
  info: PropTypes.object,
  vote: PropTypes.func,
  replyingTo: PropTypes.string,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  updateComment: PropTypes.func,
  currentUser: PropTypes.object
}

export default Comment
