document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');

    // Load any existing conversation
    loadConversation();

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key (but allow Shift+Enter for new lines)
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Clear conversation
    clearBtn.addEventListener('click', clearConversation);

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message to UI
        addMessage('user', message);
        userInput.value = '';
        
        // Show loading indicator
        const loadingId = addMessage('ai', 'Thinking...', true);
        
        try {
            // Send to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Update AI message
            updateMessage(loadingId, data.response);
        } catch (error) {
            updateMessage(loadingId, `Error: ${error.message}`);
            console.error('Error:', error);
        }
    }

    function addMessage(role, content, isTemp = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const id = isTemp ? `temp-${Date.now()}` : '';
        messageDiv.id = id;
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return id;
    }

    function updateMessage(id, newContent) {
        const messageDiv = document.getElementById(id);
        if (messageDiv) {
            messageDiv.querySelector('.message-content').innerHTML = newContent;
        }
    }

    async function loadConversation() {
        try {
            const response = await fetch('/');
            // In a real app, you might fetch conversation history here
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }

    async function clearConversation() {
        try {
            await fetch('/clear', { method: 'POST' });
            chatMessages.innerHTML = '';
        } catch (error) {
            console.error('Error clearing conversation:', error);
        }
    }
});