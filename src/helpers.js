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
