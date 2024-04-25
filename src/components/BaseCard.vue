<script>
export default {
    props: {
        item: Object,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:8000",
        }
    },
}
</script>

<template>
    <div class="d-flex flex-column justify-content-between rounded-4 g-3 my-card">
        <div class="mb-2">
            <img v-if="this.item.images != '' " class="rounded-4 like" :src="`${baseUrl}/storage/${this.item.images[0].image_path}`" alt="">
            <img v-else src="../assets/img/missing-image.png" alt="">
            <span></span>
        </div>
        <div>
            <div>
                <p class="my-text-black m-0 ms-1">{{ this.item.title }}</p>
            </div>
            <div>
                <p class="my-text-grey mb-1 ms-1">{{ this.item.address }}</p>
            </div>
            <div class="d-flex justify-content-between">
                <h6 class="my-text-black ms-1 mb-1">Starting from</h6>
                <i class="fa-solid fa-chevron-right fa-fade my-text-black me-1"></i>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.my-card {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    // width: fit-content;
    height: 400px;
    width: 300px;
    img {
        width: 100%;
        height: 300px;
    }
}

.my-text-black {
    color: $text-black;
}

.my-text-grey {
    color: $text-grey;
    font-size: 0.9rem;
}
</style>