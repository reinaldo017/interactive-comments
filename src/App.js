import { useState, React } from 'react'
import Comment from './Components/Comment/Comment'
import NewComment from './Components/NewComment/NewComment'
// import image from './images/avatars/image-amyrobson.png'
import currentUserImage from './images/avatars/image-juliusomo.png'

const currentUser = {
  username: 'Reinaldo017',
  image: currentUserImage
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

  // ***Helpers***
  //  Checks if a comment is a main comment or a reply
  const isAMainComment = (commentId) => {
    const mainComment = comments.find(comment => comment.id === commentId)
    return mainComment !== undefined
  }

  // Gets the comment replied by the reply specified
  const getRepliedComment = replyId => comments.find(comment => {
    const reply = comment.replies.find(reply => reply.id === replyId)
    return reply !== undefined
  })

  //  Calculates the new score based on the action given
  const updateScore = (prevScore, action) => action === '+' ? prevScore + 1 : prevScore - 1

  // Updates the score of the comment specified. Returns the comments or replies array updated
  const updateCommentsScores = (prevComments, commentId, action) => prevComments.map(comment => {
    if (comment.id !== commentId) {
      return comment
    } else {
      return {
        ...comment,
        score: updateScore(comment.score, action)
      }
    }
  })

  //  Updates the score of the specified comment
  const vote = (commentId, action) => {
    // If is a main comment:
    if (isAMainComment(commentId)) {
      setComments(prev => updateCommentsScores(prev, commentId, action))
    } else {
      //  If is a reply:
      const commentRepliedId = getRepliedComment(commentId).id

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

  //  Add comment or reply
  const addComment = (newComment, mainComment) => {
    if (mainComment === null) {
      setComments(prev => [...prev, newComment])
    } else {
      const mainCommentIndex = comments.findIndex(comment => comment.id === mainComment.id)

      if (mainCommentIndex !== -1) {
        setComments(prev => prev.map((comment, index) => {
          if (index === mainCommentIndex) {
            return {
              ...comment,
              replies: [...comment.replies, newComment]
            }
          } else {
            return comment
          }
        }))
      } else {
        comments.forEach((comment, index) => {
          const replyIndex = comment.replies.findIndex(reply => reply.id === mainComment.id)
          if (replyIndex !== -1) {
            setComments(prev => prev.map((prevComment, prevIndex) => {
              if (prevIndex === index) {
                return {
                  ...prevComment,
                  replies: prevComment.replies.map((reply, i) => {
                    if (i === replyIndex) {
                      return {
                        ...reply,
                        replies: [newComment]
                      }
                    } else {
                      return reply
                    }
                  })
                }
              } else {
                return prevComment
              }
            }))
          }
        })
      }
    }
  }

  return (
    <div className="App">
      {comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            info={comment}
            vote={vote}
            addComment={addComment}
            currentUser={currentUser}
          />
        )
      })}
      <NewComment currentUser={currentUser} addComment={addComment}/>
    </div>
  )
}

export default App
