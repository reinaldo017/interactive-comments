import React from 'react'
import PropTypes from 'prop-types'

const NewComment = ({ currentUser, onChange, content }) => {
  return (
        <div className='newComment'>
            <form className='newComment__container'>
                <input className='inputfield' placeholder='Add a comment...' value={content} onChange={onChange}/>
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
  onChange: PropTypes.func,
  content: PropTypes.string
}

export default NewComment
