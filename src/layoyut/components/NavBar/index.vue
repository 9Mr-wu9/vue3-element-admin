<template>
  <div class="navbar-container">
    <Hamburger
      id="hamburger-container"
      class="hamburger-container"
      :isActive="true"
      @toggleClick="toggleSideBar"
    />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template >

      </template>

    </div>
  </div>
</template>

<script >
import { computed, getCurrentInstance, defineComponent } from "vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";

import { useStore, mapGetters } from "vuex";

export default defineComponent({
  components: {
    Hamburger,
    Breadcrumb,
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx) {
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const toggleSideBar = () => {
      console.log("toggleSideBar");
    };
    return { toggleSideBar };
  },
});
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    height: 100%;
    line-height: 46px;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent; //
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
