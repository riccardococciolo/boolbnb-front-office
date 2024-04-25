<script>
import axios from "axios";

export default {
    data() {
        return {
            locations: [
                {
                    name:  "Londra",
                    image: "src/assets/img/londra.jpg"
                },

                {
                    name: "Tokyo",
                    image: "src/assets/img/tokyo.jpg"
                },

                {
                    name: "Torino",
                    image: "src/assets/img/torino.jpg"
                },

                {
                    name: "Roma",
                    image: "src/assets/img/roma.jpg"
                },

                {
                    name: "Milano",
                    image: "src/assets/img/milano.jpg"
                },

                {
                    name: "New York",
                    image: "src/assets/img/new_york.jpg"
                },
            ],

        baseUrl: 'http://127.0.0.1:8000',
        apartments: [],
        errorMessage: ''
    };
  },

    methods: {
        searchByClick(index) {
            axios.get(this.baseUrl + '/api/apartments?address=', {
                params: {
                    address: this.locations[index].name,
                }
            }).then((resp) => {
                console.log(resp);

                if (resp.data.success == false) {
                    this.errorMessage = resp.data.message    
                } else if(resp.data.success == true && resp.data.results.data.length == 0){
                    this.$router.push({ name: "not-found" });
                } else {                     
                    this.apartments = resp.data.results.data
                    this.$router.push({
                        path: 'research',
                        query: {
                            apartmentsTest: this.locations[index].name
                        }
                    });
                }        
            })

        }
    }
};
</script>

<template>
    <div class="container my-space">
        <h3 class="pb-5 fw-bold">Città più visitate</h3>
        <div class="row row-cols-4">
            <div class="col">
                <div class="big-image">
                    <img @click="searchByClick(0)" :src="this.locations[0].image" alt="">
                    <span class="border rounded-pill bg-light p-1">{{ this.locations[0].name }}</span>
                </div>
            </div>
            <div class="col">
                <div class="container">
                    <div class="row flex-column ms_gap">
                        <div class="col">
                            <div class="mid-image">
                                <img @click="searchByClick(1)" :src="this.locations[1].image" alt="">
                                <span class="border rounded-pill bg-light p-1">{{ this.locations[1].name }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="small-image">
                                <img @click="searchByClick(2)" :src="this.locations[2].image" alt="">
                                <span class="border rounded-pill bg-light p-1">{{ this.locations[2].name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="big-image">
                    <img @click="searchByClick(3)" :src="this.locations[3].image" alt="">
                    <span class="border rounded-pill bg-light p-1">{{ this.locations[3].name }}</span>
                </div>
            </div>
            <div class="col">
                <div class="container">
                    <div class="row flex-column ms_gap">
                        <div class="col">
                            <div class="small-image">
                                <img @click="searchByClick(5)" :src="this.locations[5].image" alt="">
                                <span class="border rounded-pill bg-light p-1">{{ this.locations[5].name }}</span>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mid-image">
                                <img @click="searchByClick(4)" :src="this.locations[4].image" alt="">
                                <span class="border rounded-pill bg-light p-1">{{ this.locations[4].name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<div class="row w-100 d-flex gap-3">
            <div v-for="(location, index) in locations" :key="index" :class="(index % 2) === 0 && index !== 0 ? 'd-none': 'col-2'">
                        <div v-if="(index === 0) || ((index % 3) === 0)">
                            <LocationCard :propName="location.name" :propImage="location.image" />
                        </div>
                        <div v-else-if="(index !== 0)">   && ((index % 3) !== 0) && ((index % 2) !== 0) 
                            <div v-for="(location, index) in locations" :key="index" :class="(index === 0) || ((index % 3) === 0) ? 'd-none' : 'row-6 pb-3'">
                                    <LocationCard :propName="location.name" :propImage="location.image" />
                            </div>
                        </div>
                        <div v-else class="d-none"></div>
            </div>
        </div> -->
    <!-- <div class="w-100 my-0 mx-auto d-flex justify-content-center ">
            <div class="row location-row">
                <div v-for="(location, locationIndex) in locations" :key="locationIndex"
                    class="col-4 mb-3 d-flex justify-content-center">
                    <router-link :to="{ name: 'research' }" class="nav-link">
                    <LocationCard :propName="location.name" :propImage="location.image" v-model.trim="address"
                        @click="searchByClick(locationIndex)" />
                    </router-link>
                </div>
            </div>
        </div> -->
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
// .location-row {
//     overflow-y: auto;
// }
.my-space{
    margin-top: 80px;
    margin-bottom: 80px;
}
.ms_gap{
    gap: 2.5rem;
}

.big-image{
    height: 335px;
}

.small-image{
    height: calc(135px - 1.25rem);
    
}

.mid-image{
    height: calc(200px - 1.25rem);
}

[class*="-image"]{
    border: 4px solid transparent;
    transition: transform 0.5s ease;

    img{
        height: 100%;
        width: 300px;
        border-radius: 25px;
        object-fit: cover;
    }

    span{
        position: relative;
        bottom: 2.5rem;
        left: 1rem;
        font-weight: bold;
    }

    cursor: pointer;
}

[class*="-image"]:hover{
    
    border-color: $secondary;
    display: absolute;
    border-radius: calc(25px + 5px);
    transform: scale(1.02);
    z-index: 0;

    span{
        color: #f31c19;
    }
}
</style>