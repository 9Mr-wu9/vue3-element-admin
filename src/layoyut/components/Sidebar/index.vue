<template>
  <div :class="{'has-logo': showLogo}">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :basePath="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script >
import { computed, getCurrentInstance, defineComponent } from "vue";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import { useStore, mapGetters } from "vuex";
import constants from "@/styles/variables.module.scss";

export default defineComponent({
  components: {
    Logo,
    SidebarItem,
  },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const activeMenu = computed(() => {
      const route = proxy.$route;
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }

      return path;
    });

    const variables = computed(() => {
      return constants;
    });

    const isCollapse = computed(() => {
      return store.state.app.sidebar.opened;
    });

    const showLogo = computed(() => {
      return store.state.settings.sidebarLogo;
    });

    return {
      activeMenu,
      isCollapse,
      showLogo,
      variables,
    };
  },
});
</script>
