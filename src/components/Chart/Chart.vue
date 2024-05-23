<template>
  
     <div style="display: flex; justify-content: center; margin-top: 20px;">
      <div style="margin: 10px;"><Datepicker 
          v-model="startDate"
          @focus="handleStartDateChange"
          />       
      </div>
      <span style="margin: 10px;">~</span>
      <div style="margin: 10px;"><Datepicker      
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

 

  <br>
  <!-- <div>   
    <canvas ref="chartCanvas" id="canvas">    
    </canvas>
  </div> -->
  <div v-for="(chart, index) in charts" :key="index" style="height: 400px; margin-bottom: 100px;">
    <label style="margin-top: 35px; margin-bottom: 10px;">서버 이름 : {{  }}</label>
    <canvas :ref="el => chartCanvasRefs[index] = el" :id="'canvas' + index"></canvas>
  </div>


  </template>
  
  <script>
  import 'chartjs-adapter-date-fns';
  import { ref, onMounted, onBeforeUnmount, nextTick  } from 'vue';
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
    const serverName = ref();
    const chartCanvasRefs = ref([]);
    const charts = ref([]);
   
   

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
                      endDate: formattedEndDate,
                    }
                  });

                  
                time.value = response.data.map(item => new Date(item.time).getTime());          
                ping.value = response.data.map(item => item.ping);
                serverName.value = response.data.map(item => item.serverName);



                charts.value = Array.from({ length: 50 }, () => ({
                    time: [...time.value],
                    ping: [...ping.value],
                    serverName : [...serverName.value]
                  }));
               
               
               await nextTick();
               await drawChartsInGroups(3);
              // charts.value.forEach((chart, index) => {
              //         const canvas = chartCanvasRefs.value[index];
              //     if (canvas) {
              //       const context = canvas.getContext('2d');
              //         drawChart(context, chart.time, chart.ping);
              //     }
              // });

             

              for (let index = 0; index < charts.value.length; index++) {
                const chart = charts.value[index];
                const canvas = chartCanvasRefs.value[index];
                console.log(canvas);
                if (canvas) {
                  const context = canvas.getContext('2d');
                 
                await drawChartAsync(context, chart.time, chart.ping, true);
              
            }           
          }                
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
          alert("시작날짜는 끝날짜보다 작아야 합니다.")
      }
    };

    const drawChartAsync = (context, time, ping ) => {
      
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          drawChart(context, time, ping);
          resolve();        
        });
      });
    };

    
    const drawChartsInGroups = async (groupSize) => {
      for (let i = 0; i < charts.value.length; i += groupSize) {
        isLoading.value = true;
        const groupPromises = [];
        for (let j = 0; j < groupSize && (i + j) < charts.value.length; j++) {
          const index = i + j;
          const chart = charts.value[index];
          const canvas = chartCanvasRefs.value[index];
          if (canvas) {
            const context = canvas.getContext('2d');
            groupPromises.push(drawChartAsync(context, chart.time, chart.ping));
          }
        }
        await Promise.all(groupPromises);
        isLoading.value = false;
        await new Promise(resolve => setTimeout(resolve, 100)); // 잠시 대기
      }
      isLoading.value = false;
    };

    //onMounted(getData);
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        await reloadCharts();
      }
    };

    const reloadCharts = async () => {
      await nextTick();
      await drawChartsInGroups(3);
    };

    onMounted(async () => {
      await getData();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

  
    return { chartCanvas,
              startDate,
              endDate,
              handleStartDateChange,
              handleEndDateChange,
              selectedDate,
              formatStartDate, 
              getData, 
              isLoading,
              chartCanvasRefs,
              charts
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
  