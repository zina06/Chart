<template>

     <div style="display: flex; justify-content: center;">
    <div style="margin: 10px;"><Datepicker 
        v-model="startDate"
        @focus="handleStartDateChange"
        />       
    </div>
    <span style="margin: 10px;">~</span>
    <div  style="margin: 10px;"><Datepicker      
        v-model="endDate"     
        @focus="handleEndDateChange"   
         />
    </div>
    <div>
  </div>
    <button @click="getData">조회</button>
  </div>



    <div>
      <canvas ref="chartCanvas" id="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import 'chartjs-adapter-date-fns';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { drawChart } from '../../common/common.js'; 
  import moment from 'moment';


  
  export default {
  
  name: 'TimeChart',
  setup() {
    const time = ref([]);
    const ping = ref([]);
    const chartCanvas = ref();
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    const selectedDate = ref();
    const formatStartDate = ref();


    const handleStartDateChange = (date) => {

     const clickStartDate = date.target.value;

     if(clickStartDate==null){
        return;
      }


      var Year = clickStartDate.substring(0,4);
      var Month = clickStartDate.substring(5,7);
      var Day = clickStartDate.substring(8,10);
   
   
      const newDate =  new Date(Number(Year), Number(Month)-1, Number(Day));     
      startDate.value = newDate;
    
    };

    const handleEndDateChange = (date) => {
      const clickEndDate = date.target.value;

      var Year = clickEndDate.substring(0,4);
      var Month = clickEndDate.substring(5,7);
      var Day = clickEndDate.substring(8,10);

      const newDate =  new Date(Number(Year), Number(Month)-1, Number(Day));
      endDate.value = newDate;
      
    
    };
  
    const getData = async () => {
      console.log("getData");
      console.log("startDate value"+startDate.value);
   
      try {
        const response = await axios.get(`/get/chartData`, {
              params: {
                startDate: moment(startDate.value).format('YYYY-MM-DD').substring(0, 12),
                endDate: moment(endDate.value).format('YYYY-MM-DD').substring(0, 12)
              }
            });

        time.value = response.data.map(item => new Date(item.time).getTime());
        ping.value = response.data.map(item => item.ping);
        console.log(response);
        drawChart(chartCanvas.value.getContext('2d'),time.value,ping.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    onMounted(getData);

   
  
    return { chartCanvas,startDate ,endDate,handleStartDateChange,handleEndDateChange, 
      selectedDate, formatStartDate , getData
    };
    }
  };
  </script>
  
  <style scoped>
  #canvas {
    width: 800px; 
    height: 400px;
  }
  </style>
  