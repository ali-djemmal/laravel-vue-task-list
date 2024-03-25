<template>
    <v-container>
      <v-form @submit.prevent="createTask">
        <v-text-field v-model="title" label="Task Title" required></v-text-field>
        <v-textarea v-model="description" label="Task Description"></v-textarea>
        <v-btn type="submit" color="primary">Create Task</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        title: '',
        description: '',
      };
    },
    methods: {
      createTask() {
        axios.post('/api/tasks', {
          title: this.title,
          description: this.description,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(() => {
          this.title = '';
          this.description = '';
        }).catch(error => {
          console.error(error);
        });
      },
    },
  };
  </script>
  