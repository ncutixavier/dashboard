<template>
  <div class="">
    <div class="">
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
      <q-spinner-ball color="white" size="lg" />
    </div>

    <div class="row articles q-gutter-x-lg" v-if="!loading">
      <q-card
        class="q-my-md bg-primary my-card"
        v-for="(item, i) in articles"
        :key="i"
      >
        <q-img :src="item.image" height="140px">
          <div class="absolute-bottom text-body1">{{ item.title }}</div>
        </q-img>

        <q-card-section class="text-justify text-grey q-pa-sm">
          <div
            v-html="item.content ? `${item.content.substring(0, 90)}...` : ''"
          ></div>
        </q-card-section>

        <q-card-actions align="between">
          <q-btn
            round
            color="info"
            icon="edit"
            size="sm"
            outline
            @click="openEditForm(item)"
          />
          <q-btn
            round
            color="negative"
            icon="delete"
            size="sm"
            outline
            @click="deleteArticle(item)"
          />
        </q-card-actions>
      </q-card>
      <q-dialog v-model="state.confirmDelete" persistent position="top">
        <q-card style="min-width: 350px" class="bg-primary text-white">
          <div class="q-px-md q-my-md text-body1">
            Confirm to delete article:
            <strong>{{ state.article.title }}</strong>
          </div>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="negative" v-close-popup />
            <q-btn
              flat
              label="Confirm delete"
              color="info"
              :loading="state.loading"
              @click="handleDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="state.loadForm"
        persistent
        position="top"
        transition-show="slide-down"
        transition-hide="fade"
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
            <q-banner
              rounded
              class="bg-pink-2 text-pink-6 q-my-sm text-center"
              v-if="state.error"
            >
              <div class="text-body1">{{ state.error }}</div>
            </q-banner>
            <q-banner
              rounded
              class="bg-blue-2 text-blue-8 q-my-sm text-center"
              v-if="state.success"
            >
              <div class="text-body1">{{ state.success }}</div>
            </q-banner>
            <q-form
              :submit="state.saveForm ? handleCreate : handleUpdate"
              ref="form"
              @reset="onReset"
              class="q-gutter-md"
            >
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

              <q-file
                filled
                v-model="state.image"
                label="Image"
                lazy-rules
                bg-color="grey-5"
              />

              <q-editor
                v-model="state.content"
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
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['token', 'hr', 'link', 'custom_btn'],
                ]"
              />

              <div class="row justify-end">
                <q-btn
                  v-close-popup
                  type="reset"
                  flat
                  color="negative"
                  label="Cancel"
                />
                <q-btn
                  type="submit"
                  flat
                  color="info"
                  label="Save"
                  :loading="state.loading"
                  v-if="!state.saveForm"
                />
                <q-btn
                  type="submit"
                  flat
                  color="info"
                  label="Publish"
                  v-if="state.saveForm"
                  :loading="state.loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useQuasar, Notify } from "quasar";

export default defineComponent({
  name: "Blog",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const state = reactive({
      loadForm: false,
      formTitle: "",
      title: "",
      image: "",
      content: "",
      articles: [],
      saveForm: false,
      success: "",
      error: "",
      article: null,
      confirmDelete: false,
      loading: false,
    });

    const openAddForm = () => {
      state.loadForm = true;
      state.formTitle = "Publish New Article";
      state.saveForm = true;
    };

    const openEditForm = (item) => {
      state.loadForm = true;
      state.formTitle = "Edit Article";
      state.saveForm = false;
      state.article = item;
      state.title = item.title;
      state.image = item.image;
      state.content = item.content;
    };

    const loading = computed(() => {
      return store.getters.loading;
    });

    const handleCreate = () => {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("image", state.image);
      formData.append("content", state.content);
      state.loading = true;
      store
        .dispatch("publishNewArticle", formData)
        .then((res) => {
          state.loading = false;
          Notify.create({
            progress: true,
            message: "Article published successfully",
            color: "info",
            textColor: "primary",
            icon: "check",
            position: "top-right",
            timeout: 1000,
          });
          state.loadForm = false;
          state.title = "";
          state.image = "";
          state.content = "";
          store.dispatch("getArticles");
        })
        .catch((err) => {
          state.loading = false;
          Notify.create({
            progress: true,
            message: err?.response?.data?.message,
            color: "negative",
            textColor: "white",
            icon: "warning",
            position: "top",
          });
        });
    };

    const deleteArticle = (item) => {
      console.log("DELETE::", item);
      state.confirmDelete = true;
      state.article = item;
    };

    const handleUpdate = () => {
      const data = {
        title: state.title || state.article.title,
        image: state.image || state.article.image,
        content: state.content || state.article.content,
      };
      console.log("UPDATE::", data);
      state.loading = true;
      store
        .dispatch("updateArticle", {
          id: state.article._id,
          article: data,
        })
        .then((res) => {
          state.loading = false;
          state.loadForm = false;
          state.title = "";
          state.image = "";
          state.content = "";
          store.dispatch("getArticles");
          Notify.create({
            progress: true,
            message: "Article updated successfully",
            color: "info",
            textColor: "primary",
            icon: "check",
            position: "top-right",
            timeout: 1000,
          });
        })
        .catch((err) => {
          state.loading = false;
          console.log(err.response);
        });
    };

    const handleDelete = () => {
      state.loading = true;
      store.dispatch("deleteArticle", state.article._id).then((res) => {
        state.confirmDelete = false;
        state.loading = false;
        Notify.create({
          progress: true,
          message: res?.data?.message,
          color: "info",
          textColor: "primary",
          icon: "check",
          position: "top-right",
          timeout: 1000,
        });
        store.dispatch("getArticles");
      });
    };

    const articles = computed(() => {
      return store.state.articles?.articles?.data?.articles;
    });

    onMounted(() => {
      store.dispatch("getArticles");
    });

    return {
      state,
      openAddForm,
      openEditForm,
      loading,
      handleCreate,
      handleUpdate,
      deleteArticle,
      handleDelete,
      articles,
      onReset() {
        state.title = "";
        state.image = "";
        state.content = "";
      },
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
