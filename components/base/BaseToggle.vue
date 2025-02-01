<template>
  <div>
    <a class="title-toggle" href="#" @click.prevent="toggleContent">
      <slot name="icon"></slot>

      <span class="title-text">{{ title }}</span>
      <svg class="caret" :class="{ rotated: isOpen }">
        <use href="#icon-arrow-down" />
      </svg>
    </a>

    <transition name="toggle" mode="out-in">
      <div v-if="isOpen" class="toggle-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseToggle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.caret {
  transition: transform 0.3s ease;
  float: right;
}
.title-text {
  flex-grow: 1;
  margin-left: 8px;
}
.title-toggle {
  align-items: center;
  display: flex;
}
.title-toggle svg {
  width: 16px;
  height: 16px;
}
.rotated {
  transform: rotate(180deg);
}
a {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.toggle-enter-active,
.toggle-leave-active {
  transition: height 0.8s ease, opacity 0.8s ease, min-height 0.8s ease;
}
.toggle-enter,
.toggle-leave-to {
  max-height: 0;
  opacity: 0;
}
.toggle-enter-to {
  max-height: 500px;
  opacity: 1;
}
.toggle-content {
  overflow: hidden;
}
</style>
