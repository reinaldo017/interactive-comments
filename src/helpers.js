// Obtiene el otro botón dentro de Score distinto al especificado como parámetro
export const getOtherButton = (buttonToIgnore) => {
  const scoreElement = buttonToIgnore.parentElement
  const buttons = scoreElement.getElementsByTagName('button')

  for (let i = 0; i < 2; i++) {
    if (buttons[i] !== buttonToIgnore) {
      return buttons[i]
    }
  }
}

// Actualiza la puntuación del Reply indicado en el comentario indicado y devuelve un array con los replies actualizados
export const updateReplyScore = (comment, replyId, action) => {
  return comment.replies.map(reply => {
    if (reply.id !== replyId) {
      return reply
    } else {
      return {
        ...reply,
        score: action === '+' ? reply.score + 1 : reply.score - 1
      }
    }
  })
}

//  Devuelve el score actualizado en el comentario indicado
export const updateScore = (comment, action) => action === '+' ? comment.score + 1 : comment.score - 1
