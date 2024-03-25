<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-card-title class="text-center">Connexion</v-card-title>
                    
                    <v-card-text>
                        <v-form @submit.prevent="handleSubmit">
                            <v-text-field
                                v-model="formData.email"
                                label="Email"
                                type="email"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="formData.password"
                                label="Mot de passe"
                                type="password"
                                required
                            ></v-text-field>

                            <v-btn
                                color="primary"
                                type="submit"
                                class="mr-4"
                            >
                                Connexion
                            </v-btn>
                        </v-form>
                    </v-card-text>

                    <v-card-text class="text-center">
                        <router-link to="/register" class="text-blue text-decoration-none">
                            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                        </router-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { LOGIN_URL } from '../config';

const router = useRouter();
const formData = reactive({
    email: '',
    password: ''
});
const errorMessage = ref('');

function handleSubmit() {
    errorMessage.value = '';
    axios.post(LOGIN_URL, formData)
    .then(response => {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        router.push({ name: 'dashboard' });
    })
    .catch(error => {
        if (error.response && error.response.status === 422) {
            errorMessage.value = error.response.data.message;
        }
    })
    .finally(() => formData.password = '');
}
</script>

<style>
.login {
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.form-group {
    display: flex;
    flex-direction: column;
}
.form-input {
    padding: 0.5em;
    font-size: 1em;
}
.error {
    color: red;
    font-size: 1em;
}
</style>
