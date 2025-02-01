<template>
  <a v-if="isIphone" :href="metamaskUrl" target="_blank">
    <img
      src="/images/sources/metamask.png"
      alt="MetaMask"
      class="metamask_logo"
    />
  </a>
</template>

<script>
export default {
  computed: {
    /*
    isIphone() {
      return /iPhone/.test(navigator.userAgent)
    },
    */
    isIphone() {
      const mobileRegex =
        /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Opera Mini/i
      return mobileRegex.test(navigator.userAgent)
    },

    metamaskUrl() {
      const currentUrl = window.location.href
      const link = `https://metamask.app.link/dapp/${currentUrl}`
      // `metamask://dapp/${currentUrl}`
      return link
    },
    isMetamaskInstalled() {
      if (typeof window.ethereum === 'undefined') {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    openMetaMask(event) {
      event.preventDefault()
      const link = document.createElement('a')
      link.href = this.metamaskUrl
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()

      // Отложенный редирект
      setTimeout(() => {
        window.location.href = 'https://metamask.io/download/'
      }, 1000) // Время в миллисекундах, чтобы проверить открытие MetaMask
    },
  },
}
</script>

<style scoped>
.iphone-link {
  /* Ваши стили для ссылки */
}
.metamask_logo {
  width: 100%;
  height: 100%;
  max-width: 29px;
  max-height: 29px;
}
</style>
