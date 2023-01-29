<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item">
        <span
          v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script >
import { watch, defineComponent, reactive, toRefs, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { compile } from "path-to-regexp";

export default defineComponent({
  setup() {
    const currentRoute = useRoute();
    console.log("currentRoute", currentRoute);
    const state = reactive({
      breadcrumbs: [],
    });

    const getBreadcrumb = () => {
      let matched = currentRoute.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
          matched
        );
      }

      state.breadcrumbs = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false;
      });
    };

    const isDashboard = (route) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    };

    const handleLink = (item) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect).catch((err) => {
          console.warn(err);
        });
        return;
      }
      router.push(pathCompile(path)).catch((err) => {
        console.warn(err);
      });
    };

    const pathCompile = (path) => {
      const { params } = currentRoute;
      const toPath = compile(path);
      return toPath(params);
    };

    watch(
      () => currentRoute.path,
      (path) => {
        if (path.startsWith("/redirect/")) {
          return;
        }
        getBreadcrumb();
      }
    );

    onBeforeMount(() => {
      getBreadcrumb();
    });

    return { ...toRefs(state), getBreadcrumb, handleLink };
  },
});
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;
  line-height: 50px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
