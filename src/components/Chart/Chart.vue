<template>
  
     <div style="display: flex; justify-content: center; margin-top: 20px;">
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
       <button @click="getData" class="btn btn-info btn-sm">조회</button>
    </div>

  <div class="spinner-div" v-if="isLoading">
      <q-spinner-tail
      color="primary"
      size="5em"
      />
  </div>

  <label style="margin-top: 30px; margin-bottom: 30px;">서버 이름 : {{  }}</label>
  <br>
  <div>   
    <canvas ref="chartCanvas" id="canvas">    
    </canvas>
 
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
    const date = new Date();
    const time = ref([]);
    const ping = ref([]);
    const chartCanvas = ref();
    const startDate = ref(new Date(date.getFullYear(), date.getMonth(), 1));
    const endDate = ref(new Date());
    const selectedDate = ref();
    const formatStartDate = ref();
    const isLoading = ref(true);

   

    const handleStartDateChange = (date) => {
     const clickStartDate = date.target.value;

     if(clickStartDate==null){
        return;
      }

      let Year = clickStartDate.substring(0,4);
      let Month = clickStartDate.substring(5,7);
      let Day = clickStartDate.substring(8,10);
   
   
      const newDate =  new Date(Number(Year), Number(Month)-1, Number(Day));     
      startDate.value = newDate;
    
    };

    const handleEndDateChange = (date) => {
      const clickEndDate = date.target.value;

      // if(clickEndDate==null){
      //   return;
      // }

      let Year = clickEndDate.substring(0,4);
      let Month = clickEndDate.substring(5,7);
      let Day = clickEndDate.substring(8,10);

      const newDate =  new Date(Number(Year), Number(Month)-1, Number(Day));
      endDate.value = newDate;
      
    
    };
  
    const getData = async () => {

      const formattedStartDate = moment(startDate.value).format('YYYY-MM-DD');
      const formattedEndDate = moment(endDate.value).format('YYYY-MM-DD');

      if(formattedStartDate <= formattedEndDate) {
        isLoading.value = true;
          try {
            const response = await axios.get(`/get/chartData`, {
                  params: {
                    startDate: formattedStartDate,
                      endDate: formattedEndDate
                    }
                  });

                time.value = response.data.map(item => new Date(item.time).getTime());          
                ping.value = response.data.map(item => item.ping);
              

                drawChart(chartCanvas.value.getContext('2d'),time.value,ping.value);
                isLoading.value = false;
            } catch (error) {
              console.error('Error fetching data:', error);
            }
      } else {
          alert("시작날짜는 끝날짜보다 작아야 합니다.")
      }
    };


    onMounted(getData);

   
  
    return { chartCanvas,
              startDate,
              endDate,
              handleStartDateChange,
              handleEndDateChange,
              selectedDate,
              formatStartDate, 
              getData, 
              isLoading
        };
    }
  };
  </script>
  
  <style scoped>
  #canvas {
    width: 800px; 
    height: 400px;
  }


  .spinner-div {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8); 
  z-index: 9999; 
}


button {
  height: 35px; 
  margin-top: 5px; 
  width: 50px; 
  margin-left: 10px; 
  color: white;

}
  </style>
  