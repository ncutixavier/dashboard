<template>
  <div class="row justify-between q-gutter-sm">
    <q-card
      class="bg-primary col-12 col-md-2 q-pa-sm"
      flat
      v-for="i in 4"
      :key="i"
    >
      <q-card-section>
        <div class="">
          <div class="text-secondary text-body2">Web Visitors</div>
          <div class="text-info text-h5">55</div>
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
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style></style>
