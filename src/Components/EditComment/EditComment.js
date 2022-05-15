import { React, useState } from 'react'
import PropTypes from 'prop-types'

const EditComment = ({ commentInfo, updateComment, setEditMode }) => {
  const [content, setContent] = useState(commentInfo.content)

  const handleChange = ({ target }) => {
    setContent(target.value)
  }

  const handleUpdate = () => {
    updateComment(commentInfo.id, content)
    setEditMode(false)
  }

  return (
    <article className='comment'>
      <header className='comment__header'>
          <img className='user-avatar' src={commentInfo.user.image.png} alt="user avatar"/>
          <h4 className='username you'>{commentInfo.user.username}</h4>
          <p className='time'>{commentInfo.createdAt}</p>
      </header>
      <textarea className='input' value={content} onChange={handleChange}/>
      <footer className='comment__footer flex-end'>
          <button className='blue-button' onClick={handleUpdate}>UPDATE</button>
      </footer>
    </article>
  )
}

EditComment.propTypes = {
  commentInfo: PropTypes.object,
  updateComment: PropTypes.func,
  setEditMode: PropTypes.func
}

export default EditComment
