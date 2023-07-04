<template>
  <div class="amap-page-container">
    <!-- <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      :events="events">
      <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :icon="marker.icon"></el-amap-marker>

      <!-- <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker> -->


    </el-amap>
    <div class="toolbar">position: [{{ lng }}, {{ lat }}] address: {{ address }}</div>
  </div>
</template>

<style>
  .el-vue-amap-container.amap-demo{
    width: 960px;
    height: 516px;
  }
  .search-box {
    position: absolute;
    top: 55px;
    left: 20px;
  }
  .amap-page-container {
    position: relative;
  }
</style>


<script>


  module.exports = {
    name:'mymap',
    data: function() {
      let self = this;
      return {

        zoom: 16,
        center: [118.931082, 32.113461],
        searchOption: {
          
        },
        marker: {
          icon: "https://webapi.amap.com/images/car.png",
          position: [118.935142, 32.116316]
        },
        mapInfo:{
          address:'',
          lng:'',
          lat:'',
        },
        address: '',
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            self.mapInfo.lat = lat;
            self.mapInfo.lng = lng;
            self.marker.position = [lng, lat]
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng ,lat], function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  self.mapInfo.address= result.regeocode.formattedAddress;
                  self.$nextTick();
                }
              }
            });
            self.$emit("listenToMap",self.mapInfo);
          }
        },
        lng: 0,
        lat: 0
      };
    },
    methods: {
      onSearchResult(pois) {
        console.log(pois,'pois')
        var lng = pois[0].lng
        var lat = pois[0].lat
        this.lng=pois[0].lng
        this.lat=pois[0].lat
        this.center = [lng, lat];
        this.marker.position = [lng, lat]
        this.address=pois[0].name
        this.mapInfo.lat=lat
        this.mapInfo.lng=lng
        this.mapInfo.address=pois[0].name
        this.$emit("listenToMap",this.mapInfo);
      }
    }
  };
</script>