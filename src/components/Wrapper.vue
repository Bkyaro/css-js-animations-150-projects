<template>
  <div class="wrapper">
    <component
      :is="this.target ? this.target : this.lists[this.$route.query.name]"
      :coord="this.coord"
      :isHome="this.isHome"
    ></component>
  </div>
</template>

<script>
import Lists from "../components";
export default {
  props: ["componentName"],
  data() {
    return {
      target: this.componentName,
      coord: localStorage.getItem("componentCoordinate")
        ? JSON.parse(localStorage.getItem("componentCoordinate"))
        : null,
      lists: Lists,
      isHome: this.$router.history.current.fullPath === "/",
    };
  },
};
</script>
<style scoped>
.wrapper {
  /* border: 2px solid black; */
}
</style>