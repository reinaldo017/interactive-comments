import './comment.css'
import { React } from 'react'
import PropTypes from 'prop-types'
import Replies from '../Replies/Replies'

const Comment = ({ info, setComments, upScore }) => {
  //  Handle Upvote in Replies
  const replyUpScore = (parentId, replyId) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id !== parentId) {
          return comment
        } else {
          const updatedReplies = comment.replies.map(reply => reply.id !== replyId ? reply : { ...reply, score: reply.score + 1 })
          return {
            ...comment,
            replies: updatedReplies
          }
        }
      })
    })
  }
  return (
    <>
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
      {/* { info.replies.map(reply => <Reply key={reply.id} info={reply} parentId={info.id} setComments={setComments}/>) } */}
      <Replies replies={info.replies} replyUpScore={replyUpScore} parentId={info.id}/>
    </>
  )
}

Comment.propTypes = {
  info: PropTypes.object,
  setComments: PropTypes.func,
  upScore: PropTypes.func
}

export default Comment
