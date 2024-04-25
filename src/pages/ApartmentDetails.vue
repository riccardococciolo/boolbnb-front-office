<script>
import axios from 'axios';
import Map from '../components/Map.vue';
import { Navigation, Pagination, Mousewheel, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';
import { store } from "../store";

export default {
    data() {
        return {
            baseUrl: 'http://127.0.0.1:8000',
            curApartment: '',
            loading: false,
            lat: '',
            lon: '',
            store,
        };
    },
    name: 'App',
    components: { Map, Swiper, SwiperSlide },

    setup() {
        const onSwiper = (swiper) => {
            //   console.log(swiper);
        };
        const onSlideChange = () => {
            //   console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Mousewheel, A11y, Autoplay],
        };
    },

    created() {

        this.loading = true;
        axios.get(`${this.baseUrl}/api/apartment/research/${this.$route.params.slug}`)
            .then((resp) => {
                this.curApartment = resp.data.results;
                this.lat = resp.data.results.latitude;
                this.lon = resp.data.results.longitude;
            })
            .finally(() => {
                this.loading = false;
                this.store.contact_apartment_id = this.curApartment.id;
            });

    },
    methods: {
        toggleCollapse(imageId) {
            const image = this.curApartment.images.find(img => img.id === imageId);
            if (image) {
                image.isExpanded = !image.isExpanded;
            }
        }
    },
}
</script>

<template>
    <div class="container py-5">
        <h2 class="fw-bold">{{ curApartment.title }}</h2>
        <p class="text-secondary fst-italic"><span class="text-success">{{ curApartment.address }}</span></p>

        <h3 class="mt-4">Foto appartamento ({{ curApartment.images.length }}) </h3>

        <div class="swiper-container d-sm-none d-md-inline-block">
            
            <swiper :modules="modules" :slides-per-view="3" :space-between="100" :loop="true" :centered-slides="true"
                navigation :pagination="{ clickable: true }" :mousewheel="{ enabled: true }" :autoplay="{ delay: 3000 }"
                @swiper="onSwiper" @slideChange="onSlideChange">

                <swiper-slide v-for="image in curApartment.images">
                    <a @click="toggleCollapse(image.id)">
                        <img :src="`${baseUrl}/storage/${image.image_path}`" alt="">
                    </a>
                </swiper-slide>
            </swiper>

        </div>

        <div class="swiper-container d-sm-inline-block d-md-none">
            <swiper :modules="modules" :slides-per-view="1" :space-between="0" :loop="true" :centered-slides="true"
                navigation :pagination="{ clickable: true }" :mousewheel="{ enabled: true }" :autoplay="{ delay: 3000 }"
                @swiper="onSwiper" @slideChange="onSlideChange">

                <swiper-slide v-for="image in curApartment.images">
                    <a @click="toggleCollapse(image.id)">
                        <img :src="`${baseUrl}/storage/${image.image_path}`" alt="">
                    </a>
                </swiper-slide>
            </swiper>

        </div>

        <div v-for="image in curApartment.images" :id="`image-${image.id}`" :class="{ 'collapse': !image.isExpanded }" @click="toggleCollapse(image.id)">
            <div class="card-container">
                    <div class="position-relative top-100 left-0">
                        <a><i class="fa-solid fa-circle-xmark"></i></a>
                        <img :src="`${baseUrl}/storage/${image.image_path}`" alt="">
                    </div>
            </div>
        </div>


        


        <div class="row">
            <div class="col-9">
                <div class="row">
                    <div class="col-6">
                        <h3 class="mt-4">Servizi</h3>
                        <div class="row">
                            <div v-for="(service) in curApartment.services" class="col-6 g-2">
                                <span class="badge border text-dark">
                                    <i :class="service.icon"></i> {{ service.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h3 class="mt-4">Dettagli</h3>
                        <div class="row">
                            <div class="icon-grey mb-2">
                                <span><i class="fa-solid fa-bed"></i> {{ this.curApartment.beds_number }}</span>
                                <span class="px-2"><i class="fa-solid fa-minus fa-rotate-90 fa-lg"></i></span>
                                <span><i class="fa-solid fa-bath"></i> {{ this.curApartment.bathrooms_number }}</span>
                                <span class="px-2"><i class="fa-solid fa-minus fa-rotate-90 fa-lg"></i></span>
                                <span><i class="fa-solid fa-ruler-combined"></i> {{ this.curApartment.dimension_mq }}
                                    m²</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <h3 class="mt-4">Dove trovarci</h3>

                <div v-if="!loading">
                    <Map :latitude="lat" :longitude="lon" />
                </div>
            </div>

        </div>


        <!-- contact button -->
        <div class="py-3">
            <h4 class="my-text-black"> ${{ this.curApartment.price }} per notte</h4>
            <router-link :to="{ name: 'contact' }">
                <button type="button" class="button-red rounded-5 me-4 mt-3"
                    @click="store.contact_apartment_id = curApartment.id">Contattaci</button>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;

.swiper-container {
    width: 100%;
    margin: 2.5rem auto;

    .swiper {
        display: flex;
        justify-content: center;
        align-items: center;
        // width: 1145px;
        width: calc((315px * 3) + (100px * 2));

        .swiper-wrapper {
            width: 100%;

            .swiper-slide {
                cursor: pointer;

                img {
                    width: calc(315px * 1);
                    height: calc(230px * 1);
                    border-radius: 25px;
                    margin-top: 2.5%;
                    filter: opacity(0.5)
                }
            }

            .swiper-slide.swiper-slide-active {
                img {
                    width: calc(315px * 1.1);
                    height: calc(230px * 1.1);
                    object-fit: cover;
                    border-radius: 25px;
                    margin-top: 0;
                    filter: opacity(1)
                }
            }
        }
    }





}

[id*="image-"] {
    background-color: rgb(130, 130, 130, 0.5);
    width: 100vw;
    height: calc(100vh + 6rem);
    z-index: 9998;
    position: absolute;
    top: 0;
    right: 0;


    .card-container {
        padding: 0 1rem;
        z-index: 9999;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);

        img {
            height: 560px;
            width: 680px;
            border-radius: 25px;
        }

        i {
            background-color: white;
            border-radius: 100%;
            font-size: 50px;
            position: absolute;
            bottom: 535px;
            left: 655px;
            color: red;
            cursor: pointer;
        }
    }
}

.button-red {
    background-color: $secondary;
    padding: .4rem 1rem;
    border-color: transparent;
    color: $primary;
}

.button-red:hover {
        color: black;
        background-color: transparent;
        border-color: $secondary;
    }
</style>