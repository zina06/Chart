<template>
  <div>
    <canvas ref="chartCanvas" style="width: 100%; height: 400px;"></canvas>
  </div>
</template>

<script>
//import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { drawChart } from '../common/common.js'; 


export default {

name: 'TimeChart',
setup() {
  const time = ref([]);
  const ping = ref([]);
  const chartCanvas = ref();
 

  const getData = async () => {
    try {
      const response = await axios.get("/get/chartData");
      time.value = response.data.map(item => item.time);
      ping.value = response.data.map(item => item.ping);
      console.log(response);
      drawChart(chartCanvas.value.getContext('2d'),time,ping);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const drawChart = () => {
  //   const ctx = chartCanvas.value.getContext('2d');
  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: time.value,
  //       datasets: [{
  //         label: 'ping',
  //         data: ping.value,
  //         borderColor: 'rgb(75, 192, 192)',
  //         borderWidth: 1,
  //         fill: false,
  //         pointRadius : 0
  //       }]
  //     },
  //     options: {    
  //       scales: {
  //         x: {
  //           type: 'time',
  //           time: {
  //             unit: 'day',
  //             displayFormats: {
  //               day: 'MM/dd'
  //             }
  //           }
  //         },
  //         y: {
  //           min: 0,
  //           max: 60000
  //         }
  //       }
  //     }
  //   });
  // };
  
  onMounted(getData);

  return { chartCanvas };
}
};
</script>

<style scoped>
/* Add your chart styles here */
</style>
