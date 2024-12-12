<template>
    <h3>首頁 {{ usersStore.email }}</h3>

    <div v-if="isChatRoomVisible" class="chat-room">
        <h4>Chat Room</h4>
        <div class="messages">
            <div v-for="(message, index) in messages" :key="index" :class="message.sender" class="message">
                {{ message.text }}
            </div>
        </div>
        <textarea v-model="userMessage" placeholder="Type your message..."></textarea>
        <button @click="sendMessage">Send</button>
    </div>

    <button class="fab" @click="openChatRoom">
        <img src="@/assets/images/chat_icon.png" alt="Chat Icon" class="fab-icon">
    </button>
</template>

<script setup>
    import { ref } from 'vue';
    import useUsersStore from '@/store/users.js';
    const usersStore = useUsersStore();

    const isChatRoomVisible = ref(false);
    const userMessage = ref('');
    const messages = ref([]);

    const openChatRoom = () => {
        isChatRoomVisible.value = !isChatRoomVisible.value;
    };

    const sendMessage = () => {
        if (userMessage.value.trim() === '') return;
        messages.value.push({ text: userMessage.value, sender: 'user' });

        // AI 回覆
        const botResponse = generateBotResponse(userMessage.value);
        messages.value.push({ text: botResponse, sender: 'bot' });

        userMessage.value = '';
    };

    const generateBotResponse = (message) => {
        if (message.toLowerCase().includes('hello')) {
            return 'Hello! How can I help you today?';
        } else if (message.toLowerCase().includes('help')) {
            return 'Sure, I am here to help. What do you need assistance with?';
        } else {
            return 'I am not sure how to respond to that. Can you please rephrase?';
        }
    };
</script>

<style>
.fab {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: auto;
    height: 56px;
    background-color: #093d1d;
    color: white;
    border: none;
    border-radius: 28px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 0 16px;
    cursor: pointer;
}

.fab-icon {
    width: 32px;
    height: 32px;
}

.chat-room {
    position: fixed;
    bottom: 80px;
    right: 16px;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.chat-room h4 {
    margin: 0 0 8px 0;
}

.chat-room .messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 8px;
}

.chat-room .messages .message {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

.chat-room .messages .user {
    text-align: right;
    color: blue;
}

.chat-room .messages .bot {
    text-align: left;
    color: green;
}

.chat-room textarea {
    flex: none;
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.chat-room button {
    align-self: flex-end;
    padding: 8px 16px;
    background-color: #6200ea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>