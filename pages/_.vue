<template>
  <ErrorBlock :error="error" />
</template>

<script>
import ErrorBlock from '~/components/general/ErrorBlock'

export default {
  name: 'ErrorPage',

  components: {
    ErrorBlock,
  },

  layout: 'Wrapper',

  headerTheme: 'black',

  asyncData({ error }) {
    error({
      statusCode: 404,
      messageCode: 'pageNotFound',
    })
  },

  computed: {
    error() {
      return {
        statusCode: 404,
        messageCode: 'pageNotFound',
      }
    },
  },
}
</script>
