<template>
  <div class="home" :class="{ 'home-dark': darkMode }">
    <span
      class="mark"
      :class="{ 'mark-dive': diving, 'mark-dive-hide': divingHide }"
      >TEST</span
    >
    <transition name="fade">
      <div v-if="showItems" class="container">
        <div v-for="(item, index) in mockData" :key="index" class="item">
          {{ item.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Home",
      darkMode: false,
      diving: false,
      divingHide: false,
      showItems: false,
      mockData: [
        { name: "animation1" },
        { name: "animation2" },
        { name: "animation2" },
        { name: "animation2" },
        { name: "animation2" },
        { name: "animation2" },
        { name: "animation2" },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.darkMode = true;
    }, 500);
    setTimeout(() => {
      this.diving = true;
    }, 1500);
    setTimeout(() => {
      this.divingHide = true;
      this.showItems = true;
    }, 2500);
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.item {
  border: 2px solid grey;
  border-radius: 8px;
  padding: 8px 12px;
  height: 120px;
  color: #fff;
  cursor: pointer;
}
</style>
