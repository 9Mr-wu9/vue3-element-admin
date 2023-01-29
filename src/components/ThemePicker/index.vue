<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
  />
</template>

<script>
import {
  defineComponent,
  computed,
  watch,
  getCurrentInstance,
  reactive,
  toRefs,
} from "vue";
import { useStore } from "vuex";
import packageJson from "element-plus/package.json";

const ORIGINAL_THEME = "#409EFF";

export default defineComponent({
  emits: ["change"],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const state = reactive({
      chalk: "",
      theme: store.state.settings.theme,
    });

    const defaultTheme = computed(() => {
      return store.state.settings.theme;
    });

    const getThemeCluster = (theme) => {
      // 色调
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          return `#${red.toString(16)}${green.toString(16)}${blue.toString(
            16
          )}`;
        }
      };
      // 阴影
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        red = Math.round(red * (1 - shade));
        green = Math.round(green * (1 - shade));
        blue = Math.round(blue * (1 - shade));

        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    };

    const updateStyle = (style, oldCluster, newCluster) => {
      let newStyle = style;
      oldCluster.forEach((color, idx) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[idx]);
      });
      return newStyle;
    };

    const getCssString = (url, variable) => {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            proxy[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
            resolve();
          }
        };
        xhr.open("GET", url);
        xhr.send();
      });
    };

    watch(defaultTheme, (val) => {
      state.theme = val;
    });

    watch(
      () => state.theme,
      async (value) => {
        if (value) {
          const oldValue = state.chalk ? state.theme : ORIGINAL_THEME;
          const themeCluster = getThemeCluster(value.replace("#", ""));
          const originalCluster = getThemeCluster(oldValue.replace("#", ""));
          if (!state.chalk) {
            const url = `https://unpkg.com/browse/element-plus@${packageJson.version}/dist/index.css`;
            await getCssString(url, "chalk");
          }
          const getHandler = (variable, id) => {
            return () => {
              const originalCluster = getThemeCluster(
                ORIGINAL_THEME.replace("#", "")
              );
              const newStyle = updateStyle(
                proxy[variable],
                originalCluster,
                themeCluster
              );
              let styleTag = document.getElementById(id);
              if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.setAttribute("id", id);
                document.head.appendChild(styleTag);
              }
              styleTag.innerText = newStyle;
            };
          };
          const chalkHandler = getHandler("chalk", "chalk-style");
          chalkHandler();

          let styles = [].slice.call(document.querySelectorAll("style"));
          styles = styles.filter((style) => {
            const text = style.innerText;
            return (
              new RegExp(oldValue, "i").test(text) &&
              !/Chalk Variables/.test(text)
            );
          });
          styles.forEach((style) => {
            const { innerText } = style;
            if (typeof innerText !== "string") return;
            style.innerText = updateStyle(
              innerText,
              originalCluster,
              themeCluster
            );
          });

          context.emit("change", value);
        }
      }
    );

    return {
      defaultTheme,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
