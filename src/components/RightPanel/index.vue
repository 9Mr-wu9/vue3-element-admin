<template>
  <div :class="{show:showPanel}" ref="rightPanel">
    <div class="rightPanelBg" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{'top':buttonTop+'px','background-color':theme}"
        @click="showPanel=!showPanel"
      >
        <el-icon>
          <Close v-if="showPanel" />
          <Setting v-else />
        </el-icon>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance, watch } from "vue";
import { useStore } from "vuex";
import { addClass, removeClass } from "@/utils/index";

export default defineComponent({
  name: "RightPanel",
  props: {
    clickNotClose: {
      type: Boolean,
      default: false,
    },
    buttonTop: {
      type: Number,
      default: 250,
    },
  },
  beforeUnmount() {
    const { proxy } = getCurrentInstance();
    const elx = proxy.$refs.rightPanel;

    elx.remove();
  },
  mounted() {
    const { proxy } = getCurrentInstance();
    proxy.insertToBody();
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const showPanel = ref(true);
    const theme = computed(() => {
      return store.state.settings.theme;
    });

    const insertToBody = () => {
      const elx = proxy.$refs.rightPanel;
      const body = document.querySelector("body");

      body.insertBefore(elx, body.firstChild); //
    };

    const addEventClick = () => {
      window.addEventListener("click", closeSidebar);
    };

    const closeSidebar = (evt) => {
      const parent = evt.target.closest(".rightPanel"); //

      if (!parent) {
        // ?
        showPanel.value = false;
        window.removeEventListener("click", proxy.closeSidebar);
      }
    };

    watch(showPanel, (val) => {
      if (val && !proxy.clickNotClose) {
        proxy.addEventClick();
      }
      if (val) {
        addClass(document.body, "showRightPanel");
      } else {
        removeClass(document.body, "showRightPanel");
      }
    });

    return {
      showPanel,
      theme,
      insertToBody,
      addEventClick,
      closeSidebar,
    };
  },
});
</script>

<style lang="scss" scoped>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px); //
}
.rightPanelBg {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.2);
  transition: 0.3s cubic-bezier(0.7, 0.3, 0.1, 1); //
}
.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 40000;
  background: #fff;
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
}
.handle-button {
  width: 48px;
  height: 48px;
  line-height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
.show {
  .rightPanelBg {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }
  .rightPanel {
    transform: translate(0);
  }
}
</style>
