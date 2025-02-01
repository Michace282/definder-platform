<template>
  <DraggableContainer v-bind="$attrs" v-on="$listeners">
    <slot />
  </DraggableContainer>
</template>

<script>
import DraggableContainer from 'vuedraggable'

export default {
  name: 'BaseDraggable',

  components: {
    DraggableContainer,
  },
}
</script>

<style lang="scss" scoped></style>
