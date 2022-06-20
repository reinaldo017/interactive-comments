import './otherUserComment.css'
import React from 'react'
import PropTypes from 'prop-types'
import Score from '../Score/Score'
import { ReactComponent as ReplyIcon } from './icon-reply.svg'

const OtherUserComment = ({ info, replyingTo, vote, toggleReply }) => {
  return (
    <article className='comment'>
      <header className='comment__header'>
          <img className='user-avatar' src={info.user.image.png} alt="user avatar"/>
          <h4 className='comment__username'>{info.user.username}</h4>
          <p className='time'>{info.createdAt}</p>
      </header>
      <p className='comment__body'>
          { replyingTo !== undefined && <span>{'@' + replyingTo + ' '}</span> }
          {info.content}
      </p>
      <Score value={info.score} commentId={info.id} vote={vote}/>
      <button className='reply-button' onClick={toggleReply}>
        <ReplyIcon />
        Reply
      </button>
    </article>
  )
}

export default OtherUserComment

OtherUserComment.propTypes = {
  info: PropTypes.object,
  replyingTo: PropTypes.string,
  vote: PropTypes.func,
  toggleReply: PropTypes.func
}
