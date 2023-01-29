

<script>
import { defineComponent, h, getCurrentInstance, reactive } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const { title, icon } = props;

    if (icon) {
      if (icon.includes("el-icon")) {
        // vnodes.push(<i class={[icon, "sub-el-icon"]} />);
        return () => [h("i", { class: [icon, "sub-el-icon"] }, "123")];
      } else {
        // vnodes.push(<svg-icon icon-class={icon} />);
        return () => [h("svg-icon", { "icon-class": icon }, icon)];
      }
      // return () => [h("i", { class: [icon, "sub-el-icon"] }, icon)];
    }

    if (title) {
      // vnodes.push(<span slot='title'>{(title)}</span>)
      return () => [h("span", title)];
    }
  },
});
</script>
