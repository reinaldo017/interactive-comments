import './newComment.css'
import { useState, React } from 'react'
import PropTypes from 'prop-types'

const NewComment = ({ currentUser, repliedComment, add, toggleReply }) => {
  //  State
  const [content, setContent] = useState('')

  // Helpers
  const createComment = () => {
    if (repliedComment === undefined) {
      return ({
        content,
        score: 0,
        user: currentUser
      })
    } else {
      return ({
        content,
        score: 0,
        user: currentUser,
        replyingTo: repliedComment.user.username
      })
    }
  }

  // Handlers
  const handleChange = ({ target }) => {
    setContent(target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newComment = createComment()

    if (repliedComment === undefined) {
      add(newComment)
    } else {
      add(newComment, repliedComment.id)
    }

    setContent('')

    if (repliedComment !== undefined) {
      toggleReply()
    }
  }

  return (
    <form className='new-comment' onSubmit={handleSubmit} >
        <textarea className='new-comment__input' placeholder='Add a comment...' value={content} onChange={handleChange}/>
        <img className='user-avatar' src={currentUser.image.png} alt='user avatar'/>
        <button className='blue-button'> {repliedComment === undefined ? 'SEND' : 'REPLY'}</button>
    </form>
  )
}

NewComment.propTypes = {
  currentUser: PropTypes.object,
  repliedComment: PropTypes.object,
  add: PropTypes.func,
  toggleReply: PropTypes.func
}

export default NewComment
