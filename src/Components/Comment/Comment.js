import './comment.css'
import { React } from 'react'
import PropTypes from 'prop-types'
import Reply from '../Reply/Reply'

const Comment = ({ info, setComments }) => {
  const upScore = () => {
    setComments(prev => prev.map(comment => comment.id !== info.id ? comment : { ...comment, score: comment.score + 1 }))
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
      { info.replies.map(reply => <Reply key={reply.id} info={reply} parentId={info.id} setComments={setComments}/>) }
    </>
  )
}

Comment.propTypes = {
  info: PropTypes.object,
  setComments: PropTypes.func
}

export default Comment
