import { useState, React } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as PlusIcon } from './icon-plus.svg'
import { ReactComponent as MinusIcon } from './icon-minus.svg'

const Score = ({ value, commentId, vote }) => {
  // States
  const [upButtonClicked, setUpButtonClicked] = useState(false)
  const [downButtonClicked, setDownButtonClicked] = useState(false)

  //  Handlers
  const handleUpvote = () => {
    // Check if no button has been clicked before
    if (upButtonClicked === false && downButtonClicked === false) {
      vote(commentId, 'up')
      setUpButtonClicked(true)
    // If not, check if up button has been clicked before and down button remains unclicked
    } else if (upButtonClicked === true && downButtonClicked === false) {
      vote(commentId, 'down')
      setUpButtonClicked(false)
    // Last case occurs when the up button is clicked and down button has been clicked before
    } else {
      // Add 2 to score
      vote(commentId, 'up')
      vote(commentId, 'up')
      setUpButtonClicked(true)
      setDownButtonClicked(false)
    }
  }

  const handleDownvote = () => {
    // Check if no button has been clicked before
    if (upButtonClicked === false && downButtonClicked === false) {
      setDownButtonClicked(true)
      vote(commentId, 'down')
      // If not, check if down button has been clicked before and up button remains unclicked
    } else if (upButtonClicked === false && downButtonClicked === true) {
      setDownButtonClicked(false)
      vote(commentId, 'up')
    } else {
      // Substract 2 to score
      setUpButtonClicked(false)
      setDownButtonClicked(true)
      vote(commentId, 'down')
      vote(commentId, 'down')
    }
  }

  return (
    <div className='score'>
      <button onClick={handleUpvote}><PlusIcon/></button>
      <p>{value}</p>
      <button onClick={handleDownvote}><MinusIcon/></button>
    </div>
  )
}

Score.propTypes = {
  value: PropTypes.number,
  commentId: PropTypes.string,
  vote: PropTypes.func
}

export default Score
