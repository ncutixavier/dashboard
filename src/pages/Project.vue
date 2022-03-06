<template>
  <div class="">
    <div class="">
      <div class="row justify-between flex-center text-white q-mb-md">
        <div class="text-h5">Projects</div>
        <q-btn
          size="md"
          @click="openAddForm"
          color="white"
          icon="add"
          label="add"
          outline
        />
      </div>

      <q-separator color="white" lang="q-mx-md" />
    </div>

    <div class="q-py-md">
      <q-table
        flat
        bordered
        title=""
        :rows="projects"
        :columns="state.columns"
        :filter="filter"
        :loading="loading"
        row-key="name"
        dark
        :pagination="initialPagination"
      >
        <template v-slot:top-right="">
          <q-input
            color="primary"
            bg-color="white"
            filled
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="info" size="sm" icon="edit"></q-btn>
            <q-btn
              dense
              round
              flat
              color="negative"
              size="sm"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useQuasar, Notify } from "quasar";

export default defineComponent({
  name: "Projects",
  components: {},
  setup() {
    const store = useStore();
    const state = reactive({
      columns: [
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "description",
          label: "Description",
          field: "description",
          sortable: true,
          sort: (a, b) => a - b,
        },
        {
          name: "languages",
          label: "Languages",
          field: "languages",
          sortable: true,
          sort: (a, b) => a - b,
        },
        { name: "actions", label: "Actions", field: "", align: "center" },
      ],
    });

    const projects = computed(() => {
      return store?.state?.projects?.projects?.projects;
    });

    const loading = computed(() => {
      return store.getters.loadingProjects;
    });

    onMounted(() => {
      store.dispatch("fetchProjects");
    });

    return {
      state,
      loading,
      projects,
      initialPagination: {
        rowsPerPage: 6,
      },
    };
  },
});
</script>

<style></style>
