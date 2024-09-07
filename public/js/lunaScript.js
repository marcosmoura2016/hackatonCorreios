// Exibir ou ocultar o chatbox e esconder o botão
document.getElementById('chatbot-button').onclick = function() {
    var chatbox = document.getElementById('chatbox');
    var chatbotButton = document.getElementById('chatbot-button');
    chatbox.style.display = 'block';
    chatbotButton.style.display = 'none'; // Esconde o botão ao abrir o chatbox
};

// Detectar clique fora do chatbox para fechá-lo e mostrar o botão novamente
document.addEventListener('click', function(event) {
    var chatbox = document.getElementById('chatbox');
    var chatbotButton = document.getElementById('chatbot-button');
    var isClickInsideChatbox = chatbox.contains(event.target);
    var isClickOnChatbotButton = chatbotButton.contains(event.target);

    if (!isClickInsideChatbox && !isClickOnChatbotButton) {
        chatbox.style.display = 'none';  // Fecha o chatbox
        chatbotButton.style.display = 'block'; // Mostra o botão de volta
    }
});

// Enviar mensagem e processar resposta
document.getElementById('send-button').onclick = function() {
    var input = document.getElementById('message-input');
    var message = input.value;
    if (message.trim() !== '') {
        displayMessage('Você: ' + message);
        sendMessageToDialogflow(message);
        input.value = '';
    }
};

function displayMessage(message) {
    var messages = document.getElementById('chatbox-messages');
    var messageElem = document.createElement('div');
    messageElem.textContent = message;
    messages.appendChild(messageElem);
    messages.scrollTop = messages.scrollHeight;
}

function sendMessageToDialogflow(message) {
    fetch('/sendMessage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('Chatbot: ' + data.reply);
    });
}
