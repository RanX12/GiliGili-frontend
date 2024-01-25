<template>
  <div class="chat-container">
    <ul class="messages">
      <li v-for="message in messages" :key="message.id" :class="{'me': message.uid == user.id}">
        <span>{{ message.uid === user.id ? 'Me' : 'User ' + user.nickname }}:</span>
        {{ message.content }}
      </li>
    </ul>
    <div class="input-container">
      <input type="text" v-model="draft" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useUserStore } from "@/store/user"
import { ElMessage } from 'element-plus'

interface Message {
  id: number;
  uid: string;
  toUid: string;
  content: string;
  type: number;
}


export default defineComponent({
  name: 'Chat',
  setup() {
    const route = useRoute();
    const userStore = useUserStore();
    const toUid = route.params.id; // Replace with actual target uid
    const messages = ref<Message[]>([]);
    const draft = ref('');
    const user = ref(userStore.user);
    let socket: WebSocket | null = null;
    let messageIdCounter = 0;

    const fetchHistory = () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        const message: Message = {
          content: '',
          type: 2,
        };
        socket.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not connected.');
      }
    }

    const connectWebSocket = () => {
      const uid = userStore.user.id
      if (uid == toUid) {
        ElMessage.error("不能和自己发起聊天！")
        return
      }
      socket = new WebSocket(`ws://localhost:3001/api/v1/ws?uid=${uid}&toUid=${toUid}`);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("🚀 ~ connectWebSocket ~ data:", data, data.code)
        if (data.code == 50001 && data.content) {
          messages.value.push({
            id: messageIdCounter++,
            uid: uid,
            toUid: toUid,
            content: data.content,
            type: 1,
          });
        } else if (data.code == 50007) {
          messages.value.push({
            id: messageIdCounter++,
            uid: data.from == 'me' ? uid : toUid,
            toUid: data.from == 'me' ? toUid: uid,
            content: data.content,
            type: 1,
          })
        }
      };

      socket.onopen = () => {
        fetchHistory()
        // console.log('WebSocket connected.');
      };

      socket.onerror = (event) => {
        console.error('WebSocket error:', event);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected.');
      };
    };

    const sendMessage = () => {
      const uid = userStore.user.id
      if (uid == toUid) {
        ElMessage.error("不能和自己发起聊天！")
        return
      }
      if (socket && socket.readyState === WebSocket.OPEN) {
        const message: Message = {
          id: messageIdCounter++,
          uid: uid,
          toUid: toUid,
          content: draft.value,
          type: 1,
        };
        socket.send(JSON.stringify(message));
        console.log("🚀 ~ sendMessage ~ message:", message)
        messages.value.push(message);
        draft.value = ''; // Clear input after sending
      } else {
        console.error('WebSocket is not connected.');
      }
    };

    watch(() => userStore.user, (newUser, prevUser) => {
      user.value = newUser; // 更新 user ref 的值
      if (newUser && !socket) {
        // 当 user 存在且 socket 未连接时，建立 WebSocket 连接
        connectWebSocket();
      } else if (!newUser && socket) {
        // 当 user 不存在且 socket 已连接时，关闭 WebSocket 连接
        socket.close();
        socket = null;
      }
    }, { immediate: true }); // immediate: true 确保侦听器在挂载时立即触发

    onUnmounted(() => {
      if (socket) {
        socket.close();
      }
    });

    return {
      user,
      toUid,
      messages,
      draft,
      sendMessage,
    };
  },
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

.messages {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  max-height: 300px;
}

.messages li {
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f1f1f1;
  border-radius: 5px;
}

.messages li.me {
  background-color: #d1edff;
}

.input-container {
  display: flex;
  margin-top: 10px;
}

.input-container input {
  flex-grow: 1;
  padding: 5px;
  margin-right: 5px;
}

.input-container button {
  padding: 5px 10px;
}
</style>
