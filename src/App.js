import { useState, useEffect, React } from 'react'
import Comment from './Components/Comment/Comment'
import NewComment from './Components/NewComment/NewComment'
import API from './comments'
import helpers from './helpers'

const currentUser = {
  image: {
    png: './images/avatars/image-juliusomo.png',
    webp: './images/avatars/image-juliusomo.webp'
  },
  username: 'juliusomo'
}

function App () {
  //  States
  const [comments, setComments] = useState([])

  // Fetch comments
  useEffect(() => {
    API.getComments()
      .then(response => setComments(response))
      .catch(error => console.log('Error fetching comments', error.message))
  }, [])

  // Helpers
  //  Update the comment in the DB and in the front-end
  const updateComment = (commentId, updatedComment, sort = false) => {
    if (sort) {
      API.updateComment(commentId, updatedComment)
        .then(responseComment => {
          const updatedComments = comments.map(comment => comment.id === responseComment.id ? responseComment : comment)
          setComments(helpers.sortCommentsByScore(updatedComments))
        })
        .catch(error => console.log('Error updating comment', error.message))
    } else {
      API.updateComment(commentId, updatedComment)
        .then(responseComment => {
          setComments(prevComments => prevComments.map(prevComment => prevComment.id === responseComment.id ? responseComment : prevComment))
        })
        .catch(error => console.log('Error updating comment', error.message))
    }
  }

  const vote = (commentId, action = 'up') => {
    const commentVoted = helpers.findComment(commentId, comments)
    const updatedComment = {
      ...commentVoted,
      score: action === 'up' ? commentVoted.score + 1 : commentVoted.score - 1
    }

    if (commentVoted.replyingTo === undefined) {
      updateComment(commentId, updatedComment, true)
    } else {
      const mainComment = helpers.getMainComment(commentId, comments)
      updateComment(mainComment.id, updatedComment)
    }
  }

  const addComment = (newComment, repliedCommentId = null) => {
    //  If new comment isn't a reply
    if (repliedCommentId === null) {
      API.createComment(newComment)
        .then(createdComment => {
          setComments(prev => [...prev, createdComment])
        })
    } else {
      // Search replied comment
      const repliedComment = helpers.findComment(repliedCommentId, comments)

      // Is replied comment a main comment?
      if (helpers.isAMainComment(repliedComment.id, comments)) {
        const updatedComment = {
          ...repliedComment,
          replies: repliedComment.replies ? [...repliedComment.replies, newComment] : [newComment]
        }
        updateComment(repliedCommentId, updatedComment)
      } else {
        const mainComment = helpers.getMainComment(repliedComment.id, comments)
        const updatedComment = {
          ...mainComment,
          replies: [...mainComment.replies, newComment]
        }
        updateComment(mainComment.id, updatedComment)
      }
    }
  }

  const deleteComment = commentId => {
    const comment = helpers.findComment(commentId, comments)

    if (comment.replyingTo === undefined) {
      API.deleteComment(commentId)
        .then(() => {
          setComments(prevComments => prevComments.filter(prevComment => prevComment.id !== commentId))
        })
    } else {
      const commentReplied = helpers.getMainComment(commentId, comments)
      const updatedComment = {
        ...commentReplied,
        replies: commentReplied.replies.filter(reply => reply.id !== commentId)
      }

      updateComment(commentReplied.id, updatedComment)
    }
  }

  //  Render
  if (comments.length === 0) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <div className="App">
        {comments.map(comment =>
          <Comment
            key={comment.id}
            info={comment}
            add={addComment}
            remove={deleteComment}
            update={updateComment}
            vote={vote}
            currentUser={currentUser}
          />
        )}
        <NewComment currentUser={currentUser} add={addComment}/>
      </div>
    )
  }
}

export default App
