<template>
  <div class="">
    <div class="q-mx-md">
      <div class="row justify-between flex-center text-white q-mb-md">
        <div class="text-h5">Blogs</div>
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

    <div class="absolute-center" v-if="loading">
      <q-spinner-ball color="white" size="lg"/>
    </div>

    <div class="row articles" v-if="!loading">
      <q-card
        class="q-ma-md bg-primary my-card"
        v-for="(item, i) in state.articles"
        :key="i"
      >
        <q-img :src="item.image" height="120px">
          <div class="absolute-bottom text-body1">{{ item.title }}</div>
        </q-img>

        <q-card-section class="text-justify text-grey q-pa-sm">
          <div v-html="item.content ? `${item.content.substring(0, 120)}...` : ''"></div>
        </q-card-section>

        <q-card-actions align="between">
          <q-btn
            round
            color="info"
            icon="edit"
            size="sm"
            outline
            @click="openEditForm"
          />
          <q-btn round color="negative" icon="delete" size="sm" outline />
        </q-card-actions>
      </q-card>
      <q-dialog
        v-model="state.loadForm"
        position="top"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card
          class="bg-primary text-white"
          style="width: 700px; max-width: 90vw"
        >
          <q-card-section class="row items-center q-pb-none q-mb-sm">
            <div class="text-h6">{{ state.formTitle }}</div>
            <q-space />
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              color="negative"
            />
          </q-card-section>
          <q-separator color="grey-7" />

          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="state.title"
                label="Title"
                lazy-rules
                bg-color="grey-5"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please enter the title',
                ]"
              />

              <q-input
                filled
                v-model="state.image"
                label="Image"
                lazy-rules
                bg-color="grey-5"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please enter image url',
                ]"
              />

              <q-editor
                v-model="state.description"
                content-class="bg-dark"
                toolbar-text-color="white"
                toolbar-toggle-color="info"
                toolbar-bg="primary"
                min-height="5rem"
                :toolbar="[
                  ['bold', 'italic', 'underline'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: ['p', 'h3', 'h4', 'h5', 'h6', 'code'],
                    },
                  ],
                  [
                    {
                      label: 'Align',
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify'],
                    },
                  ],
                ]"
              />

              <div class="row justify-end">
                <q-btn v-close-popup flat color="negative" label="Cancel" />
                <q-btn type="submit" flat color="info" label="Save" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "Blog",
  setup() {
    const store = useStore();
    const state = reactive({
      loadForm: false,
      formTitle: "",
      title: "",
      image: "",
      description: "",
      articles: [],
    });

    const openAddForm = () => {
      state.loadForm = true;
      state.formTitle = "Publish New Article";
    };
    const openEditForm = () => {
      state.loadForm = true;
      state.formTitle = "Edit Article";
    };

    const loading = computed(() => {
      return store.getters.loading;
    });

    onMounted(() => {
      store.dispatch("getArticles").then((response) => {
        state.articles = response.data.data.articles;
      });
    });

    return {
      state,
      openAddForm,
      openEditForm,
      loading,
    };
  },
});
</script>

<style lang="scss">
.articles {
  .my-card {
    width: 100%;
    max-width: 230px;
  }
}

@media (max-width: 576px) {
  .articles {
    .my-card {
      max-width: 100%;
    }
  }
}
</style>
