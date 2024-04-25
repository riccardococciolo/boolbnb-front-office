<script>
import axios from "axios";
import HighlyRatedCard from './HighlyRatedCard.vue';

export default {
    data() {
        return {
            baseUrl: "http://127.0.0.1:8000",
            sponsoreds: [],
        };
    },
    created() {
        axios.get(`${this.baseUrl}/api/apartments/sponsored`).then((resp) => {
            console.log(resp);
            this.sponsoreds = resp.data.results
            console.log(this.sponsoreds);
        })
    },
    components: { HighlyRatedCard }
}
</script>

<template>
    <div class="container my-space">
        <h3 class="fw-bold">La nostra selezione</h3>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            <div class="col d-flex justify-content-center g-5" v-for="(sponsored) in sponsoreds">
                <HighlyRatedCard :sponsored="sponsored" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
.my-space{
    margin-bottom: 80px;
}
</style>