<template>
  <div :class="classObj" class="app-wrapper">
    <div
      class="drawer-bg"
      @click="handleClickOutside"
      v-if="device === 'mobile' && sidebar.opened"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{hasTagView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <NavBar />
        <!-- <TagsView v-if="needTagsView" /> -->
      </div>
      <!-- <AppMain /> -->
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script>
import { computed, getCurrentInstance, defineComponent } from "vue";
import AppMain from "./components/AppMain/index.vue";
import NavBar from "./components/NavBar/index.vue";
import Settings from "./components/Settings/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
import TagsView from "./components/TagsView/index.vue";
import RightPanel from "@/components/RightPanel/index.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Layout",
  components: {
    AppMain,
    NavBar,
    Settings,
    Sidebar,
    TagsView,
    RightPanel,
  },
  mixins: [],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance();
    const classObj = computed(() => {
      return {
        hideSidebar: !proxy.sidebar.opened,
        openSidebar: proxy.sidebar.opened,
        withoutAnimation: proxy.sidebar.withoutAnimation,
        mobile: proxy.device === "mobile",
      };
    });

    const handleClickOutside = () => {
      // 派发动作
      // console.log("123");
    };

    return {
      classObj,
      handleClickOutside,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: black;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth}); //
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
.mobile .fixed-header {
  width: 100%;
}
</style>
