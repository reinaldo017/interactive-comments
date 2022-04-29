import './comment.css'
import React from 'react'
import PropTypes from 'prop-types'
import Replies from '../Replies/Replies'
import { getOtherButton } from '../../helpers'

const Comment = ({ info, voteReply, vote }) => {
  const onClick = ({ target }) => {
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
              <p className='comment__body'>{info.content}</p>
              <footer className='comment__footer'>
                <div className="score">
                  <button onClick={onClick} data-clicked='false' >+</button>
                  <div>{info.score}</div>
                  <button onClick={onClick} data-clicked='false'>-</button>
                </div>
                <button className='reply-button'>Reply</button>
              </footer>
          </div>
      </article>
      <Replies
        replies={info.replies}
        voteReply={voteReply}
        mainCommentId={info.id}
      />
    </>
  )
}

Comment.propTypes = {
  info: PropTypes.object,
  vote: PropTypes.func,
  voteReply: PropTypes.func
}

export default Comment
