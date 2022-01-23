<template>
  <div class="">
    <div class="absolute-center" v-if="loading">
      <q-spinner-ball color="white" size="lg" />
    </div>
    <div class="" v-if="!loading">
      <stats :statsdata="state.stats" />
      <Charts
        :nutChartData="state.nutChartData"
        :nutChartDataOptions="state.nutChartData.options"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, reactive } from "vue";
import Stats from "components/Stats.vue";
import Charts from "components/Charts.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Stats,
    Charts,
  },
  setup() {
    const store = useStore();

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
      stats: [],
      nutChartData: {
        labels: ["Article 1", "Article 2", "Article 3"],
        datasets: [
          {
            label: "Visitors per month",
            backgroundColor: generateRandomRGB(3, 0.2),
            borderColor: "rgba(49, 204, 236, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(49, 204, 236, 0.4)",
            hoverBorderColor: "rgba(49, 204, 236, 1)",
            data: [65, 59, 80],
          },
        ],
        options: {
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Most popular articles",
            },
          },
        },
      },
    });

    const loading = computed(() => {
      return store.getters.loadingStats;
    });

    onMounted(() => {
      store.dispatch("getStats").then((response) => {
        let stats = response.data;
        state.nutChartData.labels = stats.stats.visitors.articles.map(
          (article) => article.title
        );
        state.nutChartData.datasets[0].data = stats.stats.visitors.articles.map(
          (article) => article.views
        );
        console.log(stats.stats.visitors.articles);
        state.stats.push({
          title: "Web Visitors",
          value: stats.stats.visitors.web,
        });
        state.stats.push({
          title: "Projects",
          value: stats.total_projects,
        });
        state.stats.push({
          title: "Blogs",
          value: stats.total_articles,
        });
        state.stats.push({
          title: "Blogs Visitors",
          value: stats.stats.visitors.blog,
        });
      });
    });
    return {
      state,
      loading,
    };
  },
});
</script>
