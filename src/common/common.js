import Chart from 'chart.js/auto';
import { onMounted, onUnmounted, ref,  } from "vue";

export const drawChart = (ctx, time, ping) => {
  if (Chart.getChart(ctx)) {
    Chart.getChart(ctx)?.destroy();
  }
    
   console.log("drawChart");
   return new Promise(resolve => {
    requestAnimationFrame(() => { 
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'ping',
          data: ping,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 3,
          fill: false,
          pointRadius : 0
        }]
      },
      options: {    
        plugins: {
            legend: {
                position: 'bottom', // 범례 위치
                align: 'start' // 범례 수직 정렬
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MM/dd'
              }
            }
          },
          y: {
            min: 0,
            max: 60000
          }
        }
      }
    });
    resolve();
    });
  });
  };



  export const useScrollLoad = (target, url) => {
    const size = 10;
  
    const list = ref([]);
    const start = ref(0);
  
    const load = () => {
      fetchData();
    };
  
    const loadMore = () => {
      start.value = start.value + size;
      load();
    };
  
    const fetchData = () => {
      fetch(url(start.value, size))
        .then((res) => res.json())
        .then((res) => {
          list.value.push(...res);
        });
    };
  
    const getScrollRest = (element) => {
      const clientHeight = element.clientHeight;
      const scrollHeight = element.scrollHeight;
      const scrollTop = element.scrollTop;
  
      return scrollHeight - scrollTop - clientHeight;
    };
  
    const handleScrollEvent = (e) => {
      const bottom = getScrollRest(e.target);
  
      if (bottom === 0) {
        loadMore();
      }
    };
  
    onMounted(() => {
      if (!target.value) {
        return;
      }
  
      load();
      target.value.addEventListener("scroll", handleScrollEvent);
    });
  
    onUnmounted(() => {
      if (!target.value) {
        return;
      }
  
      target.value.removeEventListener("scroll", handleScrollEvent);
    });
  
    return { list };
  };