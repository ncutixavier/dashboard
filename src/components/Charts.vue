<template>
  <div class="row justify-between q-gutter-md q-mt-xs">
    <q-card class="col-12 col-md-6 home-stats bg-primary" flat>
      <q-card-section>
        <BarChart
          :chartData="state.barChartData"
          :options="state.barChartData.options"
        />
      </q-card-section>
    </q-card>
    <q-card class="col-12 col-md-5 home-stats bg-primary" flat>
      <q-card-section>
        <DoughnutChart
          :chartData="nutChartData"
          :options="nutChartDataOptions"
        />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { BarChart, DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
  name: "Stats",
  components: {
    BarChart,
    DoughnutChart,
  },
  props: ["nutChartData", "nutChartDataOptions"],
  setup() {
    const generateRandomRGB = (n, d) => {
      let rgb = [];
      let arr = [];

      for (let k = 0; k < n; k++) {
        let a = [];
        for (let i = 0; i < 3; i++) {
          a.push(Math.floor(Math.random() * 255) + 1);
        }
        arr.push(a);
        rgb.push(`rgb(${arr[k].join(",")},${d})`);
      }
      return rgb;
    };

    const state = reactive({
      barChartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Visitors per month",
            backgroundColor: generateRandomRGB(12, 0.2),
            borderColor: "rgba(49, 204, 236, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(49, 204, 236, 0.4)",
            hoverBorderColor: "rgba(49, 204, 236, 1)",
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
          },
        ],
        options: {
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Web visitors per month in ${new Date().getFullYear()}`,
            },
          },
        },
      },
    });

    return {
      state,
    };
  },
});
</script>

<style lang="scss">
.home-stats {
  canvas {
    height: 60vh !important;
  }
}
</style>
