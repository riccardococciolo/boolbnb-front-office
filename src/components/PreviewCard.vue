<script>
import { store } from "../store";

export default {
    props: {
        apartment: Object,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:8000",
            store,
        };
    },
    methods:{
        // getDetails(currentSlug){
        //     return `research/${currentSlug}`
        // }
    }
}
</script>

<template>
    <div class="d-flex flex-column flex-md-row justify-content-start rounded-4 p-3 my-card w-100">
        <div>
            <img v-if="this.apartment.images != '' " class="rounded-4" :src="`${baseUrl}/storage/${this.apartment.images[0].image_path}`" alt="">
            <img v-else class="rounded-4 like" src="../assets/img/missing-image.png" alt="">
        </div>

        <div class="d-flex flex-column flex-lg-row justify-content-between w-100">
            <div class="ps-3 pt-2 pt-md-1">
                <div class="d-flex gap-2 align-items-center">
                    <h4 class="my-text-red fw-bold m-0">{{ this.apartment.title }}</h4>
                    <span v-if="this.apartment.sponsors"> <i class="fa-solid fa-crown" style="color: #FFD43B;"></i> </span>
                </div>
                <div class="py-1">
                    <p class="my-text-grey mb-1">{{ this.apartment.address }}</p>
                </div>
                <div class="icon-grey mb-2">
                    <span><i class="fa-solid fa-bed"></i> {{ this.apartment.beds_number }}</span>
                    <span class="px-2"><i class="fa-solid fa-minus fa-rotate-90 fa-lg"></i></span>
                    <span><i class="fa-solid fa-bath"></i> {{ this.apartment.bathrooms_number }}</span>
                    <span class="px-2"><i class="fa-solid fa-minus fa-rotate-90 fa-lg"></i></span>
                    <span><i class="fa-solid fa-ruler-combined"></i> {{ this.apartment.dimension_mq }} m²</span>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-between align-items-end">
                
                    <h4 class="pt-1 text-primary mb-0 pe-4"> {{this.apartment.price}} $</h4>
                    <p class="fst-italic text-secondary pe-4">per notte</p>
                    <router-link :to="{name: 'apartment-details', params:{slug: this.apartment.slug}}" @click="this.store.contact_apartment_id = this.apartment.id" >
                        <button type="button" class="button-red rounded-5 me-4 mt-3">Scopri di più</button>
                    </router-link>
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.my-card {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    width: fit-content;
}

img {
    width: 300px;
    height: 170px;
    object-fit: cover;
}

.my-text-red {
    color: $secondary;
}

.my-text-grey {
    color: $text-grey;
    font-size: 0.9rem;
}

.icon-grey {
    color: $icon-grey;
}

.button-red {
    background-color: $secondary;
    padding: .4rem 1rem;
    border-color: transparent;
    color: $primary;
}

.button-red:hover {
        // color: black;
        // background-color: transparent;
        // border-color: $secondary;
        filter: opacity(0.5);
    }
</style>