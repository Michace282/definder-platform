<template>
  <WrapperLayout theme="black">
    <ErrorBlock :error="error" />
  </WrapperLayout>
</template>

<script>
import ErrorBlock from '~/components/general/ErrorBlock'
import WrapperLayout from '~/layouts/Wrapper'

export default {
  name: 'ErrorLayout',

  components: {
    ErrorBlock,
    WrapperLayout,
  },

  props: {
    error: {
      type: [Object, String, Number, Array],
      default: () => {},
    },
  },
}
</script>
