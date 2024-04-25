<script>
import axios from 'axios';
import BaseCard from "../components/BaseCard.vue"
import PreviewCard from '../components/PreviewCard.vue';

export default {
    data() {
        return {
            baseUrl: 'http://127.0.0.1:8000',
            apartments: [],
            services: [],
            address: '',
            kmRange: 20,
            roomNum: 0,
            bedsNum: 0,
            bathroomNum: 0,
            curPage: 1,
            lastPage: 1,
            total: 0,
            selectedServices: [],
            service_filter: [],
            sponsoredApartment: [],
            places: [],
            errorMessage: '',
            errorSponsoredMessage: '',
        };
    },
    components: {
        BaseCard,
        PreviewCard
    },
    created() {
        this.getServices()
        // this.searchByFilter(1)
        const apartmentsTest = this.$route.query.apartmentsTest;
        this.searchFromOtherPage(apartmentsTest);
    },
    methods: {
        getServices() {
            axios.get(`${this.baseUrl}/api/services`).then((resp) => {
                this.services = resp.data.results
            })
        },
        searchFromOtherPage(apartmentsAddress) {
            this.address = apartmentsAddress
            this.searchByFilter()
            this.sponsoredFilter()
        },
        searchByFilter(pageNum) {
            this.loading = true;
            const roomNumInt = parseInt(this.roomNum)
            const bedsNumInt = parseInt(this.bedsNum)
            const bathroomNumInt = parseInt(this.bathroomNum)
            const paramsToSend = {
                page: pageNum
            }
            if (this.selectedServices.length > 0) {
                paramsToSend.services = this.selectedServices
            }
            if (this.address !== '') {
                paramsToSend.address = this.address
            }
            if (this.kmRange !== 20) {
                paramsToSend.kmRange = this.kmRange
            }
            if (roomNumInt > 0) {
                paramsToSend.rooms_number = roomNumInt
            }
            if (bedsNumInt > 0) {
                paramsToSend.beds_number = bedsNumInt
            }
            if (bathroomNumInt > 0) {
                paramsToSend.bathrooms_number = bathroomNumInt
            }
            axios.get(`${this.baseUrl}/api/apartments`, {
                params: paramsToSend
            }).then((resp) => {
                this.errorMessage = ''
                this.apartments = []
                if (resp.data.success == false) {
                    this.errorMessage = resp.data.message
                } else if (resp.data.success == true && resp.data.results.data.length == 0) {
                    this.errorMessage = 'Nessun appartamento trovato'
                } else {
                    console.log(resp);
                    this.apartments = resp.data.results.data
                }
            }).finally(() => {
                this.loading = false;
            });

        },
        sponsoredFilter() {
            const roomNumInt = parseInt(this.roomNum)
            const bedsNumInt = parseInt(this.bedsNum)
            const bathroomNumInt = parseInt(this.bathroomNum)
            const paramsToSend = {}
            if (this.selectedServices.length > 0) {
                paramsToSend.services = this.selectedServices
            }
            if (this.address !== '') {
                paramsToSend.address = this.address
            }
            if (this.kmRange !== 20) {
                paramsToSend.kmRange = this.kmRange
            }
            if (roomNumInt > 0) {
                paramsToSend.rooms_number = roomNumInt
            }
            if (bedsNumInt > 0) {
                paramsToSend.beds_number = bedsNumInt
            }
            if (bathroomNumInt > 0) {
                paramsToSend.bathrooms_number = bathroomNumInt
            }
            axios.get(`${this.baseUrl}/api/apartments/sponsored`, {
                params: paramsToSend
            }).then((resp) => {
                this.errorSponsoredMessage = ''
                this.sponsoredApartment = []
                if (resp.data.success == false) {
                    this.errorMessage = resp.data.message
                } else if (resp.data.success == true && resp.data.results.length == 0) {
                    this.errorSponsoredMessage = 'Nessun appartamento trovato'
                } else {
                    this.sponsoredApartment = resp.data.results
                    console.log(this.sponsoredApartment);
                }
            })
        },
        checkboxFilter(event) {
            if (event.target.checked) {
                this.selectedServices.push(event.target.id)
            } else {
                const id = event.target.id
                for (let data of this.selectedServices) {
                    if (data == id) {
                        const index = this.selectedServices.indexOf(data)
                        this.selectedServices.splice(index, 1)
                    }
                }
            }
        },
        getFilterData() {
            const pars = this.selectedServices.map((str) => {
                return parseInt(str)
            })

            const data = {
                services: pars
            }
            axios.post(`${this.baseUrl}/api/apartments/service_filter`, data, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((resp) => {
                this.service_filter = resp.data
                this.searchByFilter(1)
                this.sponsoredFilter()
            })
        },
        searchPlaces() {
            if (!this.address) {
                this.places = [];
                return;
            }
            axios.get('https://api.tomtom.com/search/2/search/' + encodeURIComponent(this.address) + '.json?key=0Uo0D3xj0wcPYB8W6Ybk5SuoiIJK1I1M')
                .then(response => {
                    console.log(response);
                    this.places = response.data.results;
                })
                .catch(error => {
                    console.error('Errore nella ricerca dei luoghi:', error);
                });
        },
        selectPlace(place) {
            this.address = place.address.freeformAddress;
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row g-0">
            <div class="col-3 px-2 py-4">
                <div class="container">
                    <div class="row flex-column">

                        <div>
                            <h4>Indirizzo</h4>
                            <div class="position-relative">
                                <input class="form-control rounded-4" type="text" name="search-bar" @input="searchPlaces" id="search-bar"
                                    placeholder="Cerca..." v-model.trim="address">
                                <div v-if="address.length > 1 && places.length > 0" class="position-absolute">
                                    <ul class="my-cards px-3 bg-white rounded-4">
                                        <li class="" v-for="place in places" :key="place.id" @click="selectPlace(place)">{{
                                            place.address.freeformAddress }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="mt-2">
                            <label for="rangeSlider" class="sliderValue">Raggio di ricerca: {{ kmRange }} km</label>
                            <input type="range" id="rangeSlider" class="form-range" v-model="kmRange" min="0" max="50">
                        </div>

                        <h4 class="mt-4">Stanze</h4>
                        <div>
                            <label class="sliderValue" for="rooms_number">Numero di stanze : {{ roomNum }}</label><br />
                            <input type="range" class="form-range" id="rooms_number" name="rooms_number" min="0" max="10"
                                list="markers" v-model="roomNum" />
                        </div>

                        <div class="mt-2">
                            <label class="sliderValue" for="beds_number">Numero di letti : {{ bedsNum }}</label><br />
                            <input type="range" class="form-range" id="beds_number" name="beds_number" min="0" max="10"
                                list="markers" v-model="bedsNum" />
                        </div>

                        <div class="mt-2">
                            <label class="sliderValue" for="bathrooms_number">Numero di bagni : {{ bathroomNum
                            }}</label><br />
                            <input type="range" class="form-range" id="bathrooms_number" name="bathrooms_number" min="0"
                                max="10" list="markers" v-model="bathroomNum" />
                        </div>

                        <h4 class="mt-4">Servizi:</h4>
                        <div v-for="(service, index) in services" class="form-check mb-3">
                            <input type="checkbox" :name="service.id" :value="service.id" :id="`${service.id}`"
                                v-model="selectedServices" @click="checkboxFilter($event)" :checked="service.checked">
                            <label class="ms-3 " :for="`${service.id}`"> {{ service.name }}</label>
                        </div>

                        <button class="btn btn-primary mt-4" @click="getFilterData()">Filtra</button>
                    </div>
                </div>
            </div>

            <div v-if="errorMessage !== ''" class="col-9 ms_border px-2 py-4">
                <div class="container ">
                    <div class="row gy-4 justify-content-start flex-wrap">
                        <h1>{{ errorMessage }}</h1>
                    </div>
                </div>
            </div>
            <div v-else class="col-9 ms_border px-2 py-4">
                <div class="container ">
                    <div class="row gy-4 justify-content-start flex-wrap">
                        <div class="col-12" v-for="(sponsored) in sponsoredApartment">
                            <PreviewCard :apartment="sponsored" />
                        </div>
                        <div class="col-12" v-for="(apartment) in apartments">
                            <PreviewCard :apartment="apartment" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    // height: calc(100vh - 258px);
    width: 100%;
    overflow-y: auto;
}

.ms_border {
    border-left: 2px solid rgb(201, 201, 201);
}

ul {
  list-style-type: none;
}
li {
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}
li:hover {
  background-color: #f0f0f0;
}
.my-cards {
    height: 140px;
    overflow-y:auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

ul {
  list-style-type: none;
}
li {
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}
li:hover {
  background-color: #f0f0f0;
}
</style>

