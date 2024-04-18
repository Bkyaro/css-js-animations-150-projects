<template>
  <div class="wrapper">
    <component
      class="component-item"
      :class="{ 'component-item-fade': isLeaving }"
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
      isLeaving: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.isLeaving = true;
    setTimeout(() => {
      next();
    }, 250);
  },
};
</script>
<style scoped>
.component-item {
  opacity: 1;
  transition: opacity 250ms ease-in-out;
}

.component-item-fade {
  opacity: 0;
}
</style>