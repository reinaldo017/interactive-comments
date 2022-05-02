import './comment.css'
import { useState, React } from 'react'
import PropTypes from 'prop-types'
import Replies from '../Replies/Replies'
import NewComment from '../NewComment/NewComment'
import { getOtherButton } from '../../helpers'

const Comment = ({ info, vote, replyingTo = null, addComment, currentUser }) => {
  const [newReply, setNewReply] = useState(false)

  const handleNewReply = () => {
    setNewReply(prev => !prev)
  }

  const handleVote = ({ target }) => {
    const button = target
    const otherButton = getOtherButton(button)

    // Si ningún botón ha sido clickeado
    if (button.dataset.clicked === 'false' && otherButton.dataset.clicked === 'false') {
      vote(info.id, button.innerText)
      button.dataset.clicked = 'true'
    } else if (button.dataset.clicked === 'true' && otherButton.dataset.clicked === 'false') {
      //  Si se clickea un botón antes clickeado
      const action = target.innerText === '+' ? '-' : '+'
      vote(info.id, action)
      button.dataset.clicked = 'false'
    } else if (button.dataset.clicked === 'false' && otherButton.dataset.clicked === 'true') {
      // Si el otro botón ha sido clickeado antes
      vote(info.id, button.innerText)
      vote(info.id, button.innerText)
      button.dataset.clicked = 'true'
      otherButton.dataset.clicked = 'false'
    }
  }

  return (
    <>
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
                  <button onClick={handleVote} data-clicked='false' >+</button>
                  <div>{info.score}</div>
                  <button onClick={handleVote} data-clicked='false'>-</button>
                </div>
                <button className='reply-button' onClick={handleNewReply}>Reply</button>
              </footer>
          </div>
      </article>
      { newReply === false ? null : <NewComment currentUser={currentUser} addComment={addComment} replyingTo={info}/>}
      <Replies
        replies={info.replies}
        vote={vote}
        addComment={addComment}
        currentUser={currentUser}
      />
    </>
  )
}

Comment.propTypes = {
  info: PropTypes.object,
  vote: PropTypes.func,
  replyingTo: PropTypes.string,
  addComment: PropTypes.func,
  currentUser: PropTypes.object
}

export default Comment
