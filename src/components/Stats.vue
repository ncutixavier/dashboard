<template>
  <div class="row justify-between q-gutter-sm">
    <q-card
      class="bg-primary col-12 col-md-2 q-pa-sm"
      flat
      v-for="item in state.stats"
      :key="item.title"
    >
      <q-card-section>
        <div class="">
          <div class="text-secondary text-body2">{{ item.title }}</div>
          <div class="text-info text-h5">{{ item.value }}</div>
        </div>
        <q-avatar
          size="md"
          class="absolute-bottom-right"
          color="negative"
          text-color="white"
          icon="arrow_upward"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      stats: [
        {
          title: "Web Visitors",
          value: 55,
        },
        {
          title: "Blog Visitors",
          value: 10,
        },
        {
          title: "Projects",
          value: 20,
        },
        {
          title: "Articles",
          value: 3,
        },
      ],
    });

    return {
      state,
    };
  },
});
</script>

<style></style>
