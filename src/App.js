import { useState, React } from 'react'
import Comment from './Components/Comment/Comment'
import NewComment from './Components/NewComment/NewComment'
// import image from './images/avatars/image-amyrobson.png'
import currentUserImage from './images/avatars/image-juliusomo.png'

const currentUser = {
  name: 'Reinaldo017',
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

  //  New Comment content
  const [newComment, setNewComment] = useState('')

  // ***Handlers***
  const handleNewComment = ({ target }) => {
    setNewComment(target.value)
  }

  const vote = (commentId, action) => {
    setComments(prev => prev.map(prevComment =>
      prevComment.id !== commentId
        ? prevComment
        : {
            ...prevComment,
            score: action === '+' ? prevComment.score + 1 : prevComment.score - 1
          })
    )
  }

  const voteReply = (mainCommentId, replyId, action) => {
    setComments(prev => prev.map(comment => {
      if (comment.id !== mainCommentId) {
        return comment
      } else {
        const updatedReplies = comment.replies.map(reply => reply.id !== replyId ? reply : { ...reply, score: action === '+' ? reply.score + 1 : reply.score - 1 })
        return {
          ...comment,
          replies: updatedReplies
        }
      }
    })
    )
  }

  return (
    <div className="App">
      {comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            info={comment}
            vote={vote}
            voteReply={voteReply}
          />
        )
      })}
      <NewComment currentUser={currentUser} content={newComment} onChange={handleNewComment}/>
    </div>
  )
}

export default App
