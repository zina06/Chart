import Chart from 'chart.js/auto';

export const drawChart = (ctx, time, ping) => {
  if (Chart.getChart(ctx)) {
    Chart.getChart(ctx)?.destroy();
  }
    
   console.log("drawChart");
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'ping',
          data: ping,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
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
  };


