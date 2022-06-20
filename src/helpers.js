const helpers = {
  // Gets the comment that contains the reply specified:
  getMainComment: (replyId, mainComments) => mainComments.find(comment => {
    if (comment.replies === undefined) return false
    const reply = comment.replies.find(reply => reply.id === replyId)
    return reply !== undefined
  }),

  // Find the comment with the specified id
  findComment: (commentId, mainComments) => {
    // Search in the main comments
    let commentFound = mainComments.find(comment => comment.id === commentId)

    if (commentFound !== undefined) return commentFound
    else {
      // If not found, search in the replies of each main comment
      mainComments.forEach(comment => {
        if (comment.replies === undefined || comment.replies.length === 0) return

        const replyFound = comment.replies.find(reply => reply.id === commentId)

        if (replyFound !== undefined) {
          commentFound = replyFound
        }
      })
    }
    return commentFound
  },

  isAMainComment: (commentId, mainComments) => {
    const commentFound = mainComments.find(comment => comment.id === commentId)
    return commentFound !== undefined
  },

  //  Sorts an array of comments based on the scores values
  sortCommentsByScore: commentsArr => {
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
}

export default helpers
