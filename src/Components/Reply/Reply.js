import React from 'react'
import PropTypes from 'prop-types'

const Reply = ({ info, parentId, setComments }) => {
  const upScore = () => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id !== parentId) {
          return comment
        } else {
          const updatedReplies = comment.replies.map(reply => reply.id !== info.id ? reply : { ...reply, score: reply.score + 1 })
          return {
            ...comment,
            replies: updatedReplies
          }
        }
      })
    })
  }

  return (
        <article className='comment'>
            <div className='comment__container'>
                <section className='comment__header'>
                    <img className='user-avatar' src={info.user.image.png} alt="user avatar"/>
                    <h3 className='username'>{info.user.username}</h3>
                    <p className='time'>{info.createdAt}</p>
                </section>
                <p className='comment__body'>{info.content}</p>
                <footer className='comment__footer'>
                    <div>
                    <button onClick={upScore}> + </button>
                    <div>{info.score}</div>
                    <button>-</button>
                    </div>
                    <button className='reply-button'>Reply</button>
                </footer>
            </div>
        </article>
  )
}

Reply.propTypes = {
  info: PropTypes.object,
  parentId: PropTypes.number,
  setComments: PropTypes.func
}

export default Reply
