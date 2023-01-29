<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { isExternal } from "@/utils/validate";

defineProps({
  to: {
    type: String,
    required: true,
  },
});

const isExternals = computed(() => {
  return isExternal(to);
});

const type = computed(() => {
  if (isExternals) {
    return "a";
  }
  return "router-link";
});

const linkProps = (to) => {
  if (isExternals) {
    return {
      href: to,
      target: "_blank",
      rel: "noopener",
    };
  }
  return {
    to,
    type,
    linkProps,
  };
};
</script>
