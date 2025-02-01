<template>
  <div class="loader">
    <div :style="{ width: size, height: size }" class="loader__container">
      <img src="/images/sources/icon-loader.png" class="loader__item" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLoader',

  props: {
    size: {
      type: String,
      default: '32px',
    },
  },
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 32px;
    height: 32px;
  }

  &__item {
    width: 100%;
    height: 100%;
    animation: loader-spin-animation infinite 0.8s ease forwards;

    @keyframes loader-spin-animation {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
}
</style>
