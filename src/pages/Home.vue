<template>
  <div>
    <stats />
    <Charts />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Stats from "components/Stats.vue";
import Charts from "components/Charts.vue";
export default defineComponent({
  components: {
    Stats,
    Charts,
  },
  setup() {
    return {};
  },
});
</script>
