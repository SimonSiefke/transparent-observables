const buttons: HTMLButtonElement[] = [
  document.querySelector('button:nth-of-type(1)') as HTMLButtonElement,
  document.querySelector('button:nth-of-type(2)') as HTMLButtonElement,
  document.querySelector('button:nth-of-type(3)') as HTMLButtonElement,
]

let clickHistory = []

for (const button of buttons) {
  button.onclick = () => {
    if (button.disabled) {
      button.disabled = false
    }
    const thirdClickedButton = clickHistory[buttons.length - 1]
    if (thirdClickedButton) {
      thirdClickedButton.disabled = true
    }
  }
}
