import { useState, React } from 'react'
import PropTypes from 'prop-types'

const NewComment = ({ currentUser, addComment, replyingToObj = null }) => {
  //  State
  const [content, setContent] = useState('')

  // Helpers
  const createComment = () => ({
    id: Math.floor(Math.random() * 1000),
    content,
    createdAt: 'hoy',
    score: 0,
    user: currentUser,
    replyingTo: replyingToObj === null ? null : replyingToObj.user.username
  })

  // Handlers
  const handleChange = ({ target }) => {
    setContent(target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newComment = createComment()
    addComment(newComment, replyingToObj)
    setContent('')
  }

  return (
        <div className='newComment'>
            <form className='newComment__container' onSubmit={handleSubmit}>
                <input className='inputfield' placeholder='Add a comment...' value={content} onChange={handleChange}/>
                <div className='newComment__footer'>
                    <img src={currentUser.image} alt='user avatar'/>
                    <button>SEND</button>
                </div>
            </form>
        </div>
  )
}

NewComment.propTypes = {
  currentUser: PropTypes.object,
  addComment: PropTypes.func,
  replyingToObj: PropTypes.object
}

export default NewComment
