import { useState, React } from 'react'
import PropTypes from 'prop-types'

const NewComment = ({ currentUser, addComment, setNewReply, commentReplied = null }) => {
  //  State
  const [content, setContent] = useState('')

  // Helpers
  const createComment = () => ({
    id: Math.floor(Math.random() * 1000),
    content,
    createdAt: 'hoy',
    score: 0,
    user: currentUser,
    replyingTo: commentReplied === null ? null : commentReplied.user.username
  })

  // Handlers
  const handleChange = ({ target }) => {
    setContent(target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const newComment = createComment()
    addComment(newComment, commentReplied)

    setContent('')

    if (commentReplied !== null) {
      setNewReply(false)
    }
  }

  return (
        <div className='new-comment'>
            <form className='new-comment__container' onSubmit={handleSubmit}>
                <textarea className='input' placeholder='Add a comment...' value={content} onChange={handleChange}/>
                <div className='new-comment__footer'>
                    <img className='user-avatar' src={currentUser.image.png} alt='user avatar'/>
                    <button className='blue-button'> SEND</button>
                </div>
            </form>
        </div>
  )
}

NewComment.propTypes = {
  currentUser: PropTypes.object,
  addComment: PropTypes.func,
  setNewReply: PropTypes.func,
  commentReplied: PropTypes.object
}

export default NewComment
