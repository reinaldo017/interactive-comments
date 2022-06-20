import './editComment.css'
import { React, useState } from 'react'
import PropTypes from 'prop-types'
import Score from '../Score/Score'

const EditComment = ({ info, update, vote, toggleEditMode }) => {
  const [content, setContent] = useState(info.content)

  //  Helpers
  const handleChange = ({ target }) => {
    setContent(target.value)
  }

  const handleUpdate = () => {
    const updatedComment = {
      ...info,
      content
    }

    update(info.id, updatedComment)
    toggleEditMode()
  }

  return (
    <article className='edit-comment'>
      <header className='comment__header'>
          <img className='user-avatar' src={info.user.image.png} alt="user avatar"/>
          <h4 className='comment__username you'>{info.user.username}</h4>
          <p className='time'>{info.createdAt}</p>
      </header>
      <textarea className='input' value={content} onChange={handleChange}/>
      <Score value={info.score} commentId={info.id} vote={vote} />
      <button className='blue-button' onClick={handleUpdate}>UPDATE</button>
    </article>
  )
}

EditComment.propTypes = {
  info: PropTypes.object,
  update: PropTypes.func,
  vote: PropTypes.func,
  toggleEditMode: PropTypes.func
}

export default EditComment
