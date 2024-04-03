<template>
  <div ref="homeEl" class="home">
    <span ref="markEl" class="mark">TEST</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Home",
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.homeEl.classList.add("home-dark");
      }, 500);
      setTimeout(() => {
        this.$refs.markEl.classList.add("mark-dive");
      }, 1500);
    });
  },
};
</script>
<style>
.home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  transition: all 0.4s;
  perspective: 200px;
}

.home-dark {
  background-color: rgba(0, 0, 0, 1);
}

.mark {
  font-size: 3rem;
  color: #fff;
  transition: all 1s cubic-bezier(1, -0.04, 0.88, 1.01);
  transform: translateZ(0px);
  opacity: 1;
  filter: blur(0px);
}

.mark-dive {
  transform: translateZ(400px);
  opacity: 0;
  filter: blur(2px);
}
</style>