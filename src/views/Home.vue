<template>
  <div ref="homeEl" class="home">
    <span ref="markEl" class="mark">TEST</span>
    <div ref="itemEl" class="container">
      <div v-for="(item, index) in mockData" :key="index" class="item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Home",
      mockData: [
        {
          name: "animation1",
        },
        {
          name: "animation2",
        },
        {
          name: "animation2",
        },
        {
          name: "animation2",
        },
        {
          name: "animation2",
        },
        {
          name: "animation2",
        },
        {
          name: "animation2",
        },
      ],
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
      setTimeout(() => {
        this.$refs.markEl.classList.add("mark-dive-hide");
        this.$refs.itemEl.classList.add("container-show");
      }, 2500);
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  transition: all 0.4s;
  perspective: 200px;
  padding: 0 20px;
  overflow-y: auto;
}

.home-dark {
  background-color: rgba(0, 0, 0, 1);
}

.mark {
  font-size: 6rem;
  color: #fff;
  transition: all 1s cubic-bezier(1, -0.04, 0.88, 1.01);
  transform: translateZ(0px);
  opacity: 1;
}

.mark-dive {
  font-size: 7rem;
  transform: translateZ(400px);
  opacity: 0.1;
}
.mark-dive-hide {
  display: none;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  transition: opacity 0.4s;
  height: 0;
  width: 0;
  overflow: hidden;
  opacity: 0;
}

.container-show {
  height: auto;
  width: auto;
  opacity: 1;
}

.item {
  border: 2px solid grey;
  border-radius: 8px;
  /* width: calc(100% / 4 - 20px); */
  padding: 8px 12px;
  height: 120px;
  color: #fff;
  cursor: pointer;
}
</style>