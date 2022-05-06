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
        <div className='comment__container'>
            <header className='comment__header'>
                <img className='user-avatar' src={commentInfo.user.image.png} alt="user avatar"/>
                <h3 className='username'>{commentInfo.user.username}</h3>
                <p className='time'>{commentInfo.createdAt}</p>
            </header>
            <input value={content} onChange={handleChange}/>
            <footer className='comment__footer'>
                <button onClick={handleUpdate}>Update</button>
            </footer>
        </div>
    </article>
  )
}

EditComment.propTypes = {
  commentInfo: PropTypes.object,
  updateComment: PropTypes.func,
  setEditMode: PropTypes.func
}

export default EditComment
