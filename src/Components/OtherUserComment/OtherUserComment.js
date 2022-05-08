import React from 'react'
import PropTypes from 'prop-types'

const OtherUserComment = ({ info, onVote, setNewReply, replyingTo = null }) => {
  //  Handlers
  const toggleReply = () => {
    setNewReply(prev => !prev)
  }

  return (
    <article className='comment'>
        <div className='comment__container'>
            <header className='comment__header'>
                <img className='user-avatar' src={info.user.image.png} alt="user avatar"/>
                <h3 className='username'>{info.user.username}</h3>
                <p className='time'>{info.createdAt}</p>
            </header>
            <p className='comment__body'>
                { replyingTo !== null && <span>{replyingTo + ' '}</span> }
                {info.content}
            </p>
            <footer className='comment__footer'>
                <div className="score">
                <button onClick={onVote} data-clicked='false' >+</button>
                <div>{info.score}</div>
                <button onClick={onVote} data-clicked='false'>-</button>
                </div>
                <button className='reply-button' onClick={toggleReply}>Reply</button>
            </footer>
        </div>
    </article>
  )
}

export default OtherUserComment

OtherUserComment.propTypes = {
  info: PropTypes.object,
  replyingTo: PropTypes.string,
  onVote: PropTypes.func,
  setNewReply: PropTypes.func
}
