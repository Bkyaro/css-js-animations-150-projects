<template>
  <div class="component-wrapper">
    <div ref="buttonElWrap" class="element-wrapper">
      <button ref="buttonEl">Click me!</button>
    </div>
    <transition name="fade">
      <pre v-if="!isHome" ref="codeContainer" class="codes">
        <code v-html="htmlCode" class="code-area" :class="{ 'code-area-show': finishLoad }" ></code>
        <code v-html="cssCode" class="code-area" :class="{ 'code-area-show': finishLoad }" ></code>
      </pre>
    </transition>
  </div>
</template>

<script>
import { codeToHtml } from "shiki";

export default {
  props: ["coord", "isHome"],
  data() {
    return {
      htmlCode: "",
      cssCode: "",
      finishLoad: false,
    };
  },

  async mounted() {
    this.htmlCode = await codeToHtml(this.fullHtmlCode, {
      lang: "javascript",
      theme: "catppuccin-latte",
    });
    await codeToHtml(this.fullCssCode, {
      lang: "css",
      theme: "catppuccin-latte",
    }).then((rst) => {
      this.cssCode = rst;
      this.finishLoad = true;
    });

    if (!this.isHome) {
      if (this.coord && this.coord.x && this.coord.y) {
        this.$refs.buttonElWrap.style.left = `${this.coord.x}px`;
        this.$refs.buttonElWrap.style.top = `${this.coord.y}px`;
      }
    }

    setTimeout(() => {
      this.$refs.buttonElWrap.classList.add("shifting");
    }, 200);
  },
  computed: {
    fullHtmlCode() {
      return `
<button>Click me!</button>
      `;
    },
    fullCssCode() {
      return `
button {
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
  overflow: hidden;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
}

button:hover {
  color: #e8e8e8;
}

button:hover::before {
  width: 100%;
}
      `;
    },
  },
};
</script>

<style scoped>
.element-wrapper {
  transition: all 0.5s;
  position: relative;
  padding: 24px 12px;
  max-width: max-content;
}

.shifting {
  top: 0px !important;
  left: 0px !important;

  /* display: flex;
  justify-content: center;
  align-items: center; */
  max-width: unset;
}
button {
  cursor: pointer;
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  /* transition: all 250ms; */
  overflow: hidden;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  /* transition: all 250ms; */
}

button:hover {
  color: #e8e8e8;
}

button:hover::before {
  width: 100%;
}

.codes {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 8px;
}

.code-area {
  padding: 8px 12px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  /* transition: background-color 05s; */
}

.code-area-show {
  background-color: rgb(237, 239, 243);
}

.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 0.5s; */
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>