<template>
  <div class="component-wrapper">
    <div ref="buttonElWrap" class="element-wrapper">
      <a style="--clr: #7808d0" class="button" href="javascript:;">
        <span class="button__icon-wrapper">
          <svg
            width="10"
            class="button__icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="currentColor"
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            ></path>
          </svg>

          <svg
            class="button__icon-svg button__icon-svg--copy"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="currentColor"
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            ></path>
          </svg>
        </span>
        Explore All
      </a>
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

      setTimeout(() => {
        let shiftCoordX =
          window.innerWidth / 2 -
          this.$refs.buttonElWrap.getBoundingClientRect().width / 2;
        this.$refs.buttonElWrap.style.left = shiftCoordX + "px";
        this.$refs.buttonElWrap.style.top = "0px";
        this.$refs.buttonElWrap.style.width = "unset";
      }, 200);
    }
  },
    computed: {
    fullHtmlCode() {
      return `
<a style="--clr: #7808d0" class="button" href="javascript:;">
  <span class="button__icon-wrapper">
    <svg
      width="10"
      class="button__icon-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 15"
    >
      <path
        fill="currentColor"
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
      ></path>
    </svg>

    <svg
      class="button__icon-svg button__icon-svg--copy"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      fill="none"
      viewBox="0 0 14 15"
    >
      <path
        fill="currentColor"
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
      ></path>
    </svg>
  </span>
  Explore All
</a>
      `;
    },
    fullCssCode() {
      return `
.button {
  position: relative;
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--clr);
  color: #fff;
  border-radius: 10rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  padding-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
}

.button__icon-wrapper {
  flex-shrink: 0;
  width: 25px;
  height: 25px;
  position: relative;
  color: var(--clr);
  background-color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.button:hover {
  background-color: #000;
}

.button:hover .button__icon-wrapper {
  color: #000;
}

.button__icon-svg--copy {
  position: absolute;
  transform: translate(-150%, 150%);
}

.button:hover .button__icon-svg:first-child {
  transition: transform 0.3s ease-in-out;
  transform: translate(150%, -150%);
}

.button:hover .button__icon-svg--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
}
      `;
    },
  },
};
</script>


<style scoped>
.element-wrapper {
  transition: all 250ms ease-in-out;
  position: relative;
  padding: 24px 12px;
  max-width: max-content;
}

.button {
  position: relative;
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--clr);
  color: #fff;
  border-radius: 10rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  padding-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
}

.button__icon-wrapper {
  flex-shrink: 0;
  width: 25px;
  height: 25px;
  position: relative;
  color: var(--clr);
  background-color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.button:hover {
  background-color: #000;
}

.button:hover .button__icon-wrapper {
  color: #000;
}

.button__icon-svg--copy {
  position: absolute;
  transform: translate(-150%, 150%);
}

.button:hover .button__icon-svg:first-child {
  transition: transform 0.3s ease-in-out;
  transform: translate(150%, -150%);
}

.button:hover .button__icon-svg--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
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