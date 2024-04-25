<script>
import axios from "axios";
import { store } from "../store";

export default {
    data() {
        return {
            email: "",
            name: "",
            lastname: "",
            message: "",
            store,
            result: {
                show: false,
                success: true,
                message: "",
            },
            errors: {},
            loading: false,
            baseUrl: "http://127.0.0.1:8000",
        };
    },
    methods: {
        showSuccessMessage() {
            this.result.show = true;
            this.result.success = true;
            this.result.message = "Grazie per averci contattato. Ti risponderemo presto.";
        },
        showErrorMessage() {
            this.result.show = true;
            this.result.success = false;
            this.result.message = "Controlla dati inseriti";
        },
        clearForm() {
            this.email = "";
            this.name = "";
            this.lastname = "";
            this.phone = "";
            this.message = "";
        },
        sendForm() {
            this.loading = true;

            const data = {
                first_name: this.name,
                last_name: this.lastname,
                email: this.email,
                message: this.message,
                apartment_id: this.store.contact_apartment_id,
            };

            axios
                .post(`${this.baseUrl}/api/leads`, data)
                .then((resp) => {

                    this.showSuccessMessage();

                    this.clearForm();
                })
                .catch((err) => {
                    console.log(err)
                    this.showErrorMessage();
                    this.errors = err.response.data.errors;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<template>
    <div class="container mt-4">
        <h2 class="text-center py-2">Hai qualche domanda? Contatta il proprietario!</h2>
        <div class="row justify-content-center pt-4">
            <div class="col-6 p-4 border border-3 rounded-4">

                <div class="alert" :class="[result.success ? 'alert-success' : 'alert-danger']" v-if="result.show">
                    {{ result.message }}
                </div>

                <form @submit.prevent="sendForm" method="POST">
                    <div class="mb-3">
                        <label for="email" class="form-label">La Tua Email </label>
                        <input type="email" class="form-control" id="email" v-model.trim="email" />
                        <div class="text-danger" v-if="errors && errors.email">
                            <div v-for="error in errors.email">{{ error }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Il tuo Nome </label>
                        <input type="text" class="form-control" id="name" v-model="name" />
                    </div>
                    <div class="mb-3">
                        <label for="lastname" class="form-label">Il tuo Cognome </label>
                        <input type="text" class="form-control" id="lastname" v-model="lastname" />
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Qual è il tuo dubbio?</label>
                        <textarea class="form-control" id="message" rows="3" v-model="message"></textarea>
                    </div>
                    <button class="btn btn-success" :disabled="loading">
                        {{ loading ? "Stiamo inviando il tuo messaggio ..." : "Invio" }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
