<template>
  <div class="flex flex-center bg-dark row q-pa-md" style="height: 100vh">
    <q-card class="bg-primary col-12 col-md-4 q-pa-md">
      <q-card-section class="q-my-lg">
        <div class="text-center">
          <q-avatar size="100px">
            <q-img src="~assets/nct.jpg" />
          </q-avatar>
          <div class="text-h5 text-info q-my-md">ncutixavier - Login</div>

          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md q-mt-xl"
          >
            <q-input
              filled
              v-model="email"
              label="Email"
              lazy-rules
              bg-color="grey-5"
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter your email',
              ]"
            />

            <q-input
              type="password"
              filled
              v-model="password"
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
                @click="onSubmit"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const onSubmit = () => {
      router.push("/dashboard");
    };
    return {
      onSubmit,
    };
  },
});
</script>
