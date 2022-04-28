import './comment.css'
import React from 'react'
import PropTypes from 'prop-types'
import Replies from '../Replies/Replies'

const Comment = ({ info, voteReply, vote }) => {
  const getOtherButton = (buttonToIgnore) => {
    //  Se crea un arreglo con los botones de Score
    const scoreElement = buttonToIgnore.parentElement
    const buttons = scoreElement.getElementsByTagName('button')
    //  Se busca y se retorna el botón opuesto al seleccionado
    for (let i = 0; i < 2; i++) {
      if (buttons[i] !== buttonToIgnore) {
        return buttons[i]
      }
    }
  }

  const onClick = ({ target }) => {
    const button = target
    const otherButton = getOtherButton(button)

    if (button.dataset.clicked === 'false' && otherButton.dataset.clicked === 'false') {
      vote(info.id, button.innerText)
      button.dataset.clicked = 'true'
    } else if (button.dataset.clicked === 'true' && otherButton.dataset.clicked === 'false') {
      const action = target.innerText === '+' ? '-' : '+'
      vote(info.id, action)
      button.dataset.clicked = 'false'
    } else if (button.dataset.clicked === 'false' && otherButton.dataset.clicked === 'true') {
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
