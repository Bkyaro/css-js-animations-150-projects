<template>
  <div class="home" :class="{ 'home-dark': darkMode }">
    <span
      v-if="isFirstVisit"
      class="mark"
      :class="{
        fonty: assetLoaded,
        'mark-dive': diving,
        'mark-dive-hide': divingHide,
      }"
      >Animatelization</span
    >
    <transition name="fade">
      <div v-if="showItems" class="container">
        <div
          ref="scalingItem"
          v-for="(item, index) in mockData"
          :key="item.routeName"
          class="item"
          @click="startScaleAnimation(item.routeName, index, $event)"
        >
          <Wrapper :componentName="item.component"></Wrapper>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Lists from "../components";
import Wrapper from "../components/Wrapper.vue";

export default {
  data() {
    return {
      name: "Home",
      darkMode: false,
      diving: false,
      divingHide: false,
      showItems: false,
      isFirstVisit: true,
      assetLoaded: false,
      mockData: Object.entries(Lists).map(([key, value]) => {
        return {
          routeName: key,
          component: value,
        };
      }),
    };
  },
  components: {
    // TODO..
    Wrapper: Wrapper,
  },
  methods: {
    goTo(projectName) {
      this.$router.push(projectName);
    },
    startScaleAnimation(routeName, index, event) {
      // 存储跳转前元素的坐标
      const clickedElement = event.target.closest(".item").children[0]; // 定位到组件根节点
      const elementRect = clickedElement.getBoundingClientRect();

      // 存储被点击元素的坐标
      localStorage.setItem(
        "componentCoordinate",
        JSON.stringify({
          x: elementRect.left,
          y: elementRect.top,
        })
      );

      console.log("home coord", localStorage.getItem("componentCoordinate"));

      // 存储当前点击元素的索引
      this.currentlyScalingIndex = index;

      // 开始无痕跳转动画
      this.$nextTick(() => {
        this.$refs.scalingItem[index].classList.add("strive");
      });

      // 在动画结束后跳转到新路由
      setTimeout(() => {
        this.goTo(`projects?name=${routeName}`);
      }, 650);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.isFirstVisit = !from.name;
    });
  },
  mounted() {
    document.addEventListener("fontLoaded", () => {
      this.assetLoaded = true;
    });
    setTimeout(() => {
      this.darkMode = true;
    }, 250);
    if (this.isFirstVisit) {
      setTimeout(() => {
        this.diving = true;
      }, 1500);
      setTimeout(() => {
        this.divingHide = true;
        this.showItems = true;
      }, 2500);
    } else {
      setTimeout(() => {
        this.showItems = true;
      }, 500);
    }
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
  transition: opacity 0.3s, font-size 1s cubic-bezier(1, -0.04, 0.88, 1.01),
    transform 1s cubic-bezier(1, -0.04, 0.88, 1.01),
    filter 1s cubic-bezier(1, -0.04, 0.88, 1.01);
  transform: translateZ(0px);
  opacity: 0;
  font-family: "Anton", sans-serif;
  line-break: anywhere;
  text-align: center;
  width: 100%;
  filter: blur(0px);
}

.fonty {
  opacity: 1;
}

.mark-dive {
  font-size: 7rem;
  transform: translateZ(400px);
  /* opacity: 0.1; */
  filter: blur(20px);
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
  border: 2px solid rgb(128, 128, 128);
  border-radius: 8px;
  padding: 8px 12px;
  height: 120px;
  background: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline-offset: -1px;
  outline: 0px solid #fff;
  transition: border 0.3s linear,
    outline 0.6s cubic-bezier(0.62, 0.1, 0.87, 0.54);
}
@media (hover: none) and (pointer: coarse) {
  .item {
    transition: outline 0.6s cubic-bezier(0.62, 0.1, 0.87, 0.54);
  }
}

.strive {
  outline-width: 999px;
  z-index: 19;
  border: 2px solid rgb(255, 255, 255);
  pointer-events: none;
}

.item:hover {
  border: 2px solid rgb(255, 255, 255);
}
</style>
