<template>
  <div class="flex flex-center bg-dark row q-pa-md" style="height: 100vh">
    <q-card class="bg-primary col-12 col-md-4 q-pa-md">
      <q-banner
        rounded
        class="bg-pink-2 text-pink-6 q-my-sm text-center"
        v-if="state.error"
      >
        <div class="text-body1">{{ state.error }}</div>
      </q-banner>
      <q-card-section class="q-my-lg">
        <div class="text-center">
          <q-avatar size="100px">
            <q-img src="~assets/nct.jpg" />
          </q-avatar>
          <div class="text-h5 text-info q-my-md">ncutixavier - Login</div>

          <q-form
            @submit="onSubmit"
            class="q-gutter-md q-mt-xl"
            ref="loginForm"
          >
            <q-input
              filled
              v-model="state.user.email"
              label="Email"
              lazy-rules
              bg-color="grey-5"
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter your email',
                (val) => /.+@.+\..+/.test(val) || 'Please enter a valid email',
              ]"
            />

            <q-input
              type="password"
              filled
              v-model="state.user.password"
              label="Password"
              bg-color="grey-5"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 6) || 'Please enter your password',
              ]"
            />
            <div>
              <q-btn
                size="lg"
                class="full-width bg-info text-primary"
                label="Login"
                type="submit"
                unelevated
                :loading="loading"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const loginForm = ref(null);
    const state = reactive({
      user: {
        email: "",
        password: "",
      },
      error: "",
    });

    const loading = computed(() => {
      return store.getters.loadingAuth;
    });

    const onSubmit = () => {
      loginForm.value.validate().then((success) => {
        if (success) {
          store
            .dispatch("login", state.user)
            .then((res) => {
              if (res.data) {
                localStorage.setItem("token", res.data.token);
                router.push("/");
              }
            })
            .catch((err) => {
              state.error = err.response.data.message;
            });
        } else {
          state.error = "Please fill all the fields";
        }
      });
    };
    return {
      loginForm,
      onSubmit,
      state,
      loading,
    };
  },
});
</script>
