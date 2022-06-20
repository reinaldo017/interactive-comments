import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/comments'

const API = {
  getComments () {
    return (
      axios.get(baseUrl)
        .then(response => {
          return response.data
        })
    )
  },

  createComment (newComment) {
    return (
      axios.post(baseUrl, newComment)
        .then(response => response.data)
    )
    // Created comment expected as response
  },

  updateComment (id, updatedComment) {
    return (
      axios.put(`${baseUrl}/${id}`, updatedComment)
        .then(response => response.data)
    )
    // Updated comment expected as response
  },

  deleteComment (id) {
    return (
      axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
    )
    // Deleted comment expected as response
  }
}

export default API
