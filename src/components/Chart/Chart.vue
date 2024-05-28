<template>
  <div class="center">
    <img alt="Vue logo" src="@/assets/metanet.png" style="width: 200px;">
  </div>
     <div style="display: flex; justify-content: center;">
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
       <button @click="getData" class="btn btn-info btn-sm success">조회</button>
    </div>

  <div class="spinner-div" v-if="isLoading">
      <q-spinner-tail
      color="primary"
      size="5em"
      />
  </div>

  <br>
  <div v-for="(chart, index) in charts" :key="index" id="chartDiv">
    <label style="margin-top: 35px; margin-bottom: 10px;"><b>서버 이름 {{  }}</b></label>
    {{ chart.ping[0] }}
     <canvas :ref="el => chartCanvasRefs[index] = el" :id="'canvas' + index" ></canvas>
 

</div>
  
  </template>
  
  <script>
  import 'chartjs-adapter-date-fns';
  import { ref, onMounted,  nextTick,    } from 'vue';
  import axios from 'axios';
  import { drawChart, useScrollLoad } from '../../common/common.js'; 
  import moment from 'moment';


  
  export default {
  
  name: 'TimeChart',
  setup() {
    const date = new Date();
    const startDate = ref(new Date(date.getFullYear(), date.getMonth(), 1));
    const endDate = ref(new Date());
    const isLoading = ref(false);
    const chartCanvasRefs = ref([]);
    const charts = ref([]);
    let currentPage = 1;
    const pageSize = 3;
    const scrollContainer = ref(null); // 스크롤 이벤트를 감지할 요소의 ref

    // 날짜 클릭 시 호출
    const handleDateChange = (event, dateRef) => {
      const dateString = event.target.value;
      if (!dateString) return;

      const [year, month, day] = dateString.split('-').map(Number);
      dateRef.value = new Date(year, month - 1, day);
    };

    const handleStartDateChange = event => handleDateChange(event, startDate);
    const handleEndDateChange = event => handleDateChange(event, endDate);



    // 데이터 받아오기
    const getData = async () => {
      const formattedStartDate = moment(startDate.value).format('YYYY-MM-DD');
      const formattedEndDate = moment(endDate.value).format('YYYY-MM-DD');

      if (formattedStartDate > formattedEndDate) {
        alert("시작날짜는 끝날짜보다 작아야 합니다.");
        return;
      }

      isLoading.value = true;

      try {
        const response = await axios.get('/get/chartData', {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            page: currentPage,
            pageSize: pageSize
          },
        });

        const data = response.data;
        const time = data.map(item => new Date(item.time).getTime());
        const ping = data.map(item => item.ping);
        const serverName = data.map(item => item.serverName);

        charts.value = Array.from({ length: 5 }, () => ({
          time: time,
          ping: ping,
          serverName: serverName[0], // Assuming all server names are the same for simplification
        }));

        await nextTick();
        await drawChartsInGroups(5);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        isLoading.value = false;
      }
    };


    // 그래프 밑으로 나열
    const drawChartsInGroups = async groupSize => {
      for (let i = 0; i < charts.value.length; i += groupSize) {
        const groupPromises = [];
        for (let j = 0; j < groupSize && (i + j) < charts.value.length; j++) {
          const index = i + j;
          const chart = charts.value[index];
          const canvas = chartCanvasRefs.value[index];
          if (canvas) {
            const context = canvas.getContext('2d');
            groupPromises.push(drawChart(context, chart.time, chart.ping));
          }
        }
        await Promise.all(groupPromises);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    const { list } = useScrollLoad(scrollContainer, (start, size) => {
      // 스크롤로 데이터를 불러오는 함수
      return `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${size}`;
    });

 

    onMounted(() => {
      getData();
    });



    return {
      startDate,
      endDate,
      handleStartDateChange,
      handleEndDateChange,
      getData,
      isLoading,
      chartCanvasRefs,
      charts,
      list
    };


    }
  };
  </script>
  
  <style scoped>
   @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

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


.center {
     text-align: center; /* 가로 가운데 정렬 */
        }


#chartDiv{
  height: 400px; 
  margin-bottom:100px; 
  margin-left: 20px; 
  margin-right: 20px;

} 

  </style>
  