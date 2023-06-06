// get the HTML Elements
const chatLogElement = document.getElementById('chat-log'),
  userInputElement = document.getElementById('user-input'),
  sendButtonElement = document.getElementById('send-button'),
  buttonIconElement = document.getElementById('button-icon'),
  infoElement = document.querySelector('.info');

// send with button or with Enter
sendButtonElement.addEventListener('click', sendMessage);
userInputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  let message = userInputElement.value.trim();

  // if message is empty, do nothing
  if (message === '') {
    return;
  }
  // if message is "developer" show our message (test)
  else if (message === 'developer') {
    // clear input field
    userInputElement.value = '';

    // append message as user
    appendMessage('user', message);

    // a fake timeout so it looks like the ai is typing/thinking
    setTimeout(() => {
      // send the answer as the bot –
      appendMessage('bot', 'this was coded by liam melkersson');

      // change button icon to deafult
      buttonIconElement.classList.add('fa-solid', 'fa-paper-plane');
      buttonIconElement.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }, 1500);
    return;
  }
  // else if none of the above

  // appends user message to screen
  appendMessage('user', message);
  userInputElement.value = '';

  // API from https://rapidapi.com/Glavier/api/chatgpt53
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '55a0329ee6msh58b3cdce09272a6p18a35djsn781e9bf54e80',
      'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com',
    },
    body: `{"messages":[{"role": "user", "content":"${message}"}]}`,
  };

  fetch('https://chatgpt53.p.rapidapi.com/', options)
    .then((response) => response.json())
    .then((response) => {
      appendMessage('bot', response.choices[0].message.content);

      buttonIconElement.classList.add('fa-solid', 'fa-paper-plane');
      buttonIconElement.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        appendMessage('bot', 'Error : Check your Api Key!');

        buttonIconElement.classList.add('fa-solid', 'fa-paper-plane');
        buttonIconElement.classList.remove('fas', 'fa-spinner', 'fa-pulse');
      }
    });
}

function appendMessage(sender, message) {
  infoElement.style.display = 'none';

  // change send button icon to loading
  buttonIconElement.classList.remove('fa-solid', 'fa-paper-plane');
  buttonIconElement.classList.add('fas', 'fa-spinner', 'fa-pulse');

  // create HTML elements for new chat message
  const messageElement = document.createElement('div');
  const iconElement = document.createElement('div');
  const chatElement = document.createElement('div');
  const icon = document.createElement('i');

  // give elements classes
  chatElement.classList.add('chat-box');
  iconElement.classList.add('icon');
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  // add icons depending on sender (bot or user)
  if (sender === 'user') {
    icon.classList.add('fa-regular', 'fa-user');
    iconElement.setAttribute('id', 'user-icon');
  } else {
    icon.classList.add('fa-solid', 'fa-robot');
    iconElement.setAttribute('id', 'bot-icon');
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLogElement.appendChild(chatElement);
  chatLogElement.scrollTo = chatLogElement.scrollHeight;
}
