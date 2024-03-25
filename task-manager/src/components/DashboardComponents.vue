
<template>
  <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Welcome to Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
        <v-btn text @click="logout">Déconnexion</v-btn>
  
     
    </v-app-bar>
    <v-container>
      <v-list>
        <v-list-item v-for="task in tasks" :key="task.id">
          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="deleteTask(task.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
    <div>
     
  </div>
  </template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

function logout() {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  router.push({ name: 'login' });
}

//  function fetchTasks() {
//         axios.get('/api/tasks', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         }).then((response) => {
//           this.tasks = response.data;
//         });
//       };
   function   deleteTask(taskId) {
        axios.delete(`/api/tasks/${taskId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(() => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        });
      }
</script>
