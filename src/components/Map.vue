<script>

import { onMounted, ref } from 'vue';

export default {
    props: {
        latitude: String,
        longitude: String,
    },
    data() {
        return {
            
        }
    },

    name: 'Map',
    setup(props) {

        const mapRef = ref(null);
        onMounted(() => {

            const tt = window.tt;
            let map = tt.map({
                key: '0Uo0D3xj0wcPYB8W6Ybk5SuoiIJK1I1M',
                container: mapRef.value,
                style: 'tomtom://vector/1/basic-main',
                center: [props.longitude, props.latitude],
                zoom: 15,
            });
            map.addControl(new tt.FullscreenControl());
            //map.addControl(new tt.NavigationControl());
            addMarker(map);

        })

        function addMarker(map) {

            const tt = window.tt;
            let location = [props.longitude, props.latitude];
            let popupOffset = 25;

            let marker = new tt.Marker().setLngLat(location).addTo(map);
            let popup = new tt.Popup({ offset: popupOffset }).setHTML("Il tuo posto!");
            marker.setPopup(popup).togglePopup();

        }

        return {
            mapRef,
        };
    }
}

</script>

<template>
    <div id='map' ref="mapRef"></div>
</template> 

<style lang="scss" scoped>
#map {
    height: 260px;
    width: 260px;
}
</style>