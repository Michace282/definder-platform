<template>
  <img :src="src" alt="alt" />
</template>

<script>
export default {
  name: 'BaseImage',

  props: {
    src: {
      required: true,
      type: String,
    },

    alt: {
      type: String,
      default: null,
    },
  },
}
</script>
