const chatLogElement = document.getElementById('chat-log'),
  userInputElement = document.getElementById('user-input'),
  sendButtonElement = document.getElementById('send-button'),
  buttonIconElement = document.getElementById('button-icon'),
  infoElement = document.querySelector('.info');

//Send with button or with Enter
sendButtonElement.addEventListener('click', sendMessage);
userInputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
