import './currentUserComment.css'
import React from 'react'
import PropTypes from 'prop-types'

const CurrentUserComment = ({ info, onVote, onDelete, setEditMode, replyingTo = null }) => {
  // Handlers
  const enableEditMode = () => {
    setEditMode(true)
  }

  return (
    <article className={replyingTo === null ? 'comment' : 'comment reply' }>
      <header className='comment__header'>
          <img className='user-avatar' src={info.user.image.png} alt="user avatar"/>
          <h4 className='comment__username you'>{info.user.username}</h4>
          <p className='comment__timestamp'>{info.createdAt}</p>
      </header>
      <p className='comment__body'>
          { replyingTo !== null && <span>{'@' + replyingTo + ' '}</span> }
          {info.content}
      </p>
      <footer className='comment__footer'>
          <div className="score">
              <button onClick={onVote} data-clicked='false' >+</button>
              <p>{info.score}</p>
              <button onClick={onVote} data-clicked='false'>-</button>
          </div>
          <section className='comment__buttons'>
              <button className='comment__delete-button' onClick={onDelete}>Delete</button>
              <button className='comment__edit-button' onClick={enableEditMode}>Edit</button>
          </section>
      </footer>
    </article>
  )
}

CurrentUserComment.propTypes = {
  info: PropTypes.object,
  replyingTo: PropTypes.string,
  onVote: PropTypes.func,
  onDelete: PropTypes.func,
  setEditMode: PropTypes.func
}

export default CurrentUserComment
