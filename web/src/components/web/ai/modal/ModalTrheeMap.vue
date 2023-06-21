<!--<script src='https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.js'></script>-->
<!--<link href='https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css' rel='stylesheet' />-->

<!--<script>-->
<!-- var ACCESS_TOKEN = 'pk.eyJ1IjoiYXl0aGVuIiwiYSI6ImNrcnh1OHdqeDB0eHUyb244MWI0YjIwbzkifQ.3cO0p2I6JzTucf-NEWbgbw'-->
    
    
<!--mapboxgl.accessToken = 'TU_ACCESS_TOKEN';-->
<!--var map = new mapboxgl.Map({-->
<!--  container: 'map',-->
<!--  style: 'mapbox://styles/mapbox/streets-v11',-->
<!--  center: [-74.5, 40],-->
<!--  zoom: 9-->
<!--});-->






import { ref } from 'vue';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Map from './components/Map.vue';

<!--export default {-->
<!--  components: { Map },-->
<!--  setup() {-->
<!--    const searchQuery = ref('');-->
<!--    const map = ref(null);-->

<!--    const searchLocation = debounce(() => {-->
<!--      const geocoder = new MapboxGeocoder({-->
<!--        accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',-->
<!--        mapboxgl: map.value.mapboxgl,-->
<!--      });-->

<!--      geocoder.query(searchQuery.value);-->
<!--      geocoder.on('result', (result) => {-->
<!--        const { center } = result.result.geometry;-->

<!--        map.value.setCenter(center);-->
<!--        map.value.setZoom(14);-->
<!--      });-->
<!--    }, 5000);-->

<!--    return { searchQuery, map, searchLocation };-->
<!--  },-->
<!--};-->

<!--</script>-->



<!--<template>-->
<!--  <div id="app">-->
<!--    <Map ref="map" />-->
<!--    <input v-model="searchQuery" placeholder="Search for a location" @input="searchLocation" />-->
<!--  </div>-->
<!--</template>-->



<template>
  <Section>
    <Container>
        <Title>
          Seleccionar y continuar
        </Title>
        <div>
          <div class="mt-4">
            <Field  :style="{textAlign: 'left'}">
              <FieldLabel>
                Busca tu negocio
              </FieldLabel>
              <Control>
                <VInput v-model="inputOneValue" placeholder="John Doe" />
              </Control>
            </Field>
          </div>
        </div>
        <div>
          (sale google map)
        </div>
        <div>
          
        </div>
      </Container>
  </Section>
</template>