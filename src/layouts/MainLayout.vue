<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-header class="bg-dark q-py-sm">
      <q-toolbar>
        <q-btn
          dense
          flat
          class="text-info"
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="lt-md text-info">Dashboard</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      width="200"
      class="bg-primary"
    >
      <q-list>
        <q-item-label header class="text-center">
          <q-avatar size="80px">
            <q-img src="~assets/nct.jpg" />
          </q-avatar>

          <div
            class="text-uppercase q-mt-md text-secondary text-body1"
            style="letter-spacing: 3px"
          >
            Ncuti Xavier
          </div>
          <div class="text-grey q-mt-xs">Dashboard</div>
        </q-item-label>

        <div class="q-my-xl">
          <q-separator color="info" />
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </div>
      </q-list>
      <div class="absolute-bottom q-mb-xl text-center">
        <q-btn
          @click="logout"
          color="negative"
          icon="logout"
          label="Logout"
          outline
          style="width: 80%"
        />
        <div class="text-secondary q-my-md text-secondary">
          ncutixavier &copy; {{ new Date().getFullYear() }}
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="q-px-sm q-mx-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    icon: "home",
    link: "/",
  },
  {
    title: "Projects",
    icon: "code",
    link: "/projects",
  },
  {
    title: "Blog",
    icon: "chat",
    link: "/blog",
  },
];

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
    };
  },
});
</script>
