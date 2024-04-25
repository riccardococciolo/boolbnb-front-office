<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<template>
    <section class="bg-light">
        <div class="container py-3">
            <div class="row justify-content-between">
                <div class="col-6 d-flex flex-row align-items-center">
                    <div class="col-12">
                        <h4 class="ms_red fw-bold">BoolBnB</h4>
                        <p>Your ultimate booking experince since 2024!</p>
                        <p>BoolBnB ©</p>
                    </div>
                </div>
                <div class="col-6 d-flex flex-row justify-content-end align-items-center">
                    <ul>
                        <li class="fw-bold"><a href="">Support</a></li>
                        <li><a href="http://127.0.0.1:8000/login">How it works</a></li>
                        <li>
                            <router-link :to="{ name: 'about-us' }" class="nav-link">About Us</router-link>
                        </li>
                        <li><a href="https://developer.tomtom.com/">TomTom</a></li>
                        <li><a href="https://www.braintreepayments.com/it">BrainTree</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.ms_red {
    color: $secondary;
}

ul {
    text-align: end;

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: black;
    }
}</style>