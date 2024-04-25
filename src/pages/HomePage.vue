<script>
import AppJumbatron from '../components/AppJumbatron.vue';
import TopLocations from '../components/TopLocations.vue'
import HighlyRatedCard from '../components/HighlyRatedCard.vue';
import HighlyRatedSection from '../components/HighlyRatedSection.vue'

    export default {
    data() {
        return {

        };
    },
    components: { HighlyRatedCard, HighlyRatedSection, AppJumbatron, TopLocations }
}
</script>

<template>
    <!-- <h2>Questa è la Homepage</h2> -->
    <AppJumbatron />
    <TopLocations/>
    <HighlyRatedSection />
</template>

<style lang="scss" scoped>
</style>