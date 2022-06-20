import './currentUserComment.css'
import React from 'react'
import PropTypes from 'prop-types'
import Score from '../Score/Score'
import { ReactComponent as DeleteIcon } from './icon-delete.svg'
import { ReactComponent as EditIcon } from './icon-edit.svg'

const CurrentUserComment = ({ info, vote, remove, toggleEditMode }) => {
  const handleDelete = () => {
    remove(info.id)
  }

  return (
    <article className='comment'>
      <header className='comment__header'>
        <img className='user-avatar' src={info.user.image.png} alt="user avatar"/>
        <h4 className='comment__username you'>{info.user.username}</h4>
        <p className='comment__timestamp'>{info.createdAt}</p>
      </header>
      <p className='comment__body'>
        { info.replyingTo !== undefined && <span>{'@' + info.replyingTo + ' '}</span> }
        {info.content}
      </p>
      <Score value={info.score} commentId={info.id} vote={vote}/>
      <section className='comment__buttons'>
        <button className='comment__delete-button' onClick={handleDelete}>
          <DeleteIcon />
          Delete
        </button>
        <button className='comment__edit-button' onClick={toggleEditMode}>
          <EditIcon />
          Edit
        </button>
      </section>
    </article>
  )
}

CurrentUserComment.propTypes = {
  info: PropTypes.object,
  vote: PropTypes.func,
  remove: PropTypes.func,
  toggleEditMode: PropTypes.func
}

export default CurrentUserComment
