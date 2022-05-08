import { useState, React } from 'react'
import Comment from './Components/Comment/Comment'
import NewComment from './Components/NewComment/NewComment'
// import image from './images/avatars/image-amyrobson.png'
import currentUserImage from './images/avatars/image-juliusomo.png'

const currentUser = {
  username: 'Reinaldo017',
  image: {
    png: currentUserImage
  }
}

function App () {
  //  ***States**
  //   Coments to render
  const [comments, setComments] = useState([
    {
      id: 2,
      content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '2 weeks ago',
      score: 5,
      user: {
        image: {
          png: './images/avatars/image-maxblagun.png',
          webp: './images/avatars/image-maxblagun.webp'
        },
        username: 'maxblagun'
      },
      replies: [
        {
          id: 3,
          content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '1 week ago',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            image: {
              png: './images/avatars/image-ramsesmiron.png',
              webp: './images/avatars/image-ramsesmiron.webp'
            },
            username: 'ramsesmiron'
          }
        },
        {
          id: 4,
          content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: '2 days ago',
          score: 2,
          replyingTo: 'ramsesmiron',
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.webp'
            },
            username: 'juliusomo'
          }
        }
      ]
    }
  ])

  // Helpers
  // Gets the comment replied by the reply specified
  const getMainComment = replyId => comments.find(comment => {
    if (comment.replies === undefined) return false
    const reply = comment.replies.find(reply => reply.id === replyId)
    return reply !== undefined
  })

  //  Calculates the new score based on the action given
  const updateScore = (prevScore, action) => action === '+' ? prevScore + 1 : prevScore - 1

  // Updates the score of the comment specified. Returns the comments or replies array updated
  const updateCommentsScores = (commentsArr, commentId, action) => commentsArr.map(comment => {
    if (comment.id === commentId) {
      return {
        ...comment,
        score: updateScore(comment.score, action)
      }
    } else {
      return comment
    }
  })

  const sortComments = commentsArr => {
    const scores = commentsArr.map(comment => comment.score)

    const sortedScores = scores.map((score, index, scoresArr) => {
      let subArray = scoresArr.slice(index)
      if (subArray.length === 1) subArray = [Math.min(...scores)]
      const maxScore = Math.max(...subArray)
      return maxScore
    })

    const sortedComments = []

    sortedScores.forEach(score => {
      const filteredComments = commentsArr.filter(comment => comment.score === score) //  Comments with the same score

      filteredComments.forEach(filteredComment => {
        const filteredCommentIsAlreadyAdded = sortedComments.some(comment => comment.id === filteredComment.id)

        if (filteredCommentIsAlreadyAdded === false) {
          sortedComments.push(filteredComment)
        }
      })
    })

    return sortedComments
  }

  const addToReplies = (mainComment, newReply) => {
    setComments(prev => prev.map(prevComment => {
      if (prevComment.id === mainComment.id) {
        return {
          ...prevComment,
          replies: [...prevComment.replies, newReply]
        }
      } else {
        return prevComment
      }
    }))
  }

  //  Updates the score of the specified comment
  const vote = (commentId, action) => {
    const isAMainComment = comments.find(comment => comment.id === commentId)
    // If is a main comment:
    if (isAMainComment) {
      setComments(prev => {
        const updatedComments = updateCommentsScores(prev, commentId, action)
        return sortComments(updatedComments)
      })
    } else {
      //  If is a reply:
      const commentRepliedId = getMainComment(commentId).id

      setComments(prev => prev.map(prevComment => {
        if (prevComment.id !== commentRepliedId) {
          return prevComment
        } else {
          return {
            ...prevComment,
            replies: updateCommentsScores(prevComment.replies, commentId, action)
          }
        }
      }))
    }
  }

  const addComment = (newComment, repliedComment) => {
    //  If new comment isn't a reply
    if (repliedComment === null) {
      setComments(prev => [...prev, newComment])
    } else {
      // Search replied comment in the main comments
      const isRepliedCommentAMainComment = comments.some(comment => comment.id === repliedComment.id)
      //  If found:
      if (isRepliedCommentAMainComment) {
        addToReplies(repliedComment, newComment)
      } else {
        // Search replied comment in the main comments replies
        comments.forEach(mainComment => {
          if (mainComment.replies === undefined) return
          const isRepliedCommentInTheReplies = mainComment.replies.some(reply => reply.id === repliedComment.id)
          //  If found:
          isRepliedCommentInTheReplies && addToReplies(mainComment, newComment)
        })
      }
    }
  }

  const deleteComment = (commentId) => {
    const mainComment = getMainComment(commentId)
    if (mainComment === undefined) {
      setComments(prev => prev.filter(prevComment => prevComment.id !== commentId))
    } else {
      const updatedReplies = mainComment.replies.filter(reply => reply.id !== commentId)
      const updatedComment = {
        ...mainComment,
        replies: updatedReplies
      }
      setComments(prev => prev.map(prevComment => {
        if (prevComment.id === mainComment.id) {
          return updatedComment
        } else {
          return prevComment
        }
      }))
    }
  }

  const updateComment = (commentId, newContent) => {
    //  Let's search the comment to update
    //  First, in the main comments
    const isAMainComment = comments.some(comment => comment.id === commentId)

    // If found:
    if (isAMainComment) {
      const commentToUpdate = comments.find(comment => comment.id === commentId)
      const updatedComment = {
        ...commentToUpdate,
        createdAt: 'ahorita',
        score: 0,
        content: newContent
      }

      setComments(prev => prev.map(prevComment => {
        if (prevComment.id === commentId) {
          return updatedComment
        } else {
          return prevComment
        }
      }))
    } else {
      // If not, let's search the comment in the main comments replies
      comments.forEach(mainComment => {
        //  If the comment doesn't have replies skip to the next comment
        if (mainComment.replies === undefined) return

        const commentToUpdate = mainComment.replies.find(reply => reply.id === commentId)
        //  If found;
        if (commentToUpdate !== undefined) {
          const updatedComment = {
            ...commentToUpdate,
            createdAt: 'ahorita',
            score: 0,
            content: newContent
          }

          setComments(prev => prev.map(prevComment => {
            if (prevComment.id === mainComment.id) {
              const updatedReplies = prevComment.replies.map(reply => reply.id === commentId ? updatedComment : reply)
              return {
                ...prevComment,
                replies: updatedReplies
              }
            } else {
              return prevComment
            }
          }))
        }
      })
    }
  }

  //  Render
  return (
    <div className="App">
      {comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            info={comment}
            vote={vote}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            sortComments={sortComments}
            currentUser={currentUser}
          />
        )
      })}
      <NewComment currentUser={currentUser} addComment={addComment}/>
    </div>
  )
}

export default App
