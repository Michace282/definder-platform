<template>
  <div class="mobile-menu" :class="{ [`mobile-menu_theme-${theme}`]: true }">
    <div class="mobile-menu__burger" @click="toggleMobileMenu">
      <div
        class="mobile-menu__line top"
        :class="{ active: showMobileMenu, disabled: !showMobileMenu }"
      ></div>
      <div
        class="mobile-menu__line bottom"
        :class="{ active: showMobileMenu, disabled: !showMobileMenu }"
      ></div>
    </div>

    <transition
      name="fade"
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="showMobileMenu"
        v-scroll-lock="showMobileMenu"
        class="mobile-menu__content"
        :class="{ active: showMobileMenu }"
      >
        <div class="mobile-menu__block mobile-menu__exchange">
          {{ exchangeRate }}
        </div>

        <div class="mobile-menu__divider mobile-menu__divider_exchange"></div>

        <div class="mobile-menu__block menu-items">
          <div class="menu-items__container">
            <NuxtLink
              v-click-block="toggleMobileMenu"
              :to="'/dao'"
              class="menu-items__item"
            >
              <BaseHoverText color="white" @click="onLinkClick('/dao')">
                <span> {{ 'DAO' }} </span>
              </BaseHoverText>
            </NuxtLink>
            <NuxtLink
              v-click-block="toggleMobileMenu"
              :to="'/marketplace'"
              class="menu-items__item"
              @click="toggleMobileMenu"
            >
              <BaseHoverText color="white">
                <span> Marketplace </span>
              </BaseHoverText>
            </NuxtLink>
            <!--
            <NuxtLink :to="'/staking'" class="menu__item">
              <BaseHoverText color="white" @click="onLinkClick('/staking')">
                <span> Staking </span>
              </BaseHoverText> </NuxtLink
            >-->

            <a :href="linkToHowItWorks" target="_blank">
              <BaseHoverText
                color="white"
                @click="onLinkClick(linkToHowItWorks)"
              >
                <span> {{ $t('HEADER.HOW_IT_WORKS') }} </span>
              </BaseHoverText></a
            >

            <NuxtLink
              v-click-block="toggleMobileMenu"
              :to="'/lending-pool'"
              class="menu-items__item"
            >
              <BaseHoverText
                color="white"
                @click="onLinkClick('/lending-pool')"
              >
                <span> {{ 'Lending Pool' }} </span>
              </BaseHoverText>
            </NuxtLink>
          </div>
        </div>

        <div class="mobile-menu__divider"></div>
        <!--lang switch-->
        <!--
        <div class="mobile-menu__block mobile-menu__lang">
          <BaseDropdown
            :options="$i18n.locales"
            :get-option-key="(item) => item.code"
            class="lang-switcher"
            mini
            links
          >
            <span class="lang-switcher__label-text">
              {{ $i18n.localeProperties.text }}
            </span>

            <template #option="{ option }">
              <a
                :href="switchLocalePath(option.code)"
                class="lang-switcher__option"
              >
                <div class="lang-switcher__option-inner">
                  {{ option.text }}
                </div>
              </a>
            </template>
          </BaseDropdown>
        </div>
        -->

        <template v-if="$auth.loggedIn">
          <div class="mobile-menu__divider mobile-menu__divider_user-info" />

          <div class="mobile-menu__block mobile-menu__user-info user-info">
            <div class="user-info__label">
              <BaseHoverText color="no-hover-white">
                <span> {{ userName }} </span>

                <template #left-icon>
                  <svg class="user-info__label-icon">
                    <use href="#icon-user" />
                  </svg>
                </template>
              </BaseHoverText>
            </div>

            <!--            <div v-click-block="toggleMobileMenu" class="user-info__fund-btn">-->
            <!--              <FundProjectBtn />-->
            <!--            </div>-->

            <NuxtLink
              v-click-block="toggleMobileMenu"
              :to="linkToPersonalInfo"
              class="user-info__label"
            >
              <BaseHoverText color="white">
                <span> {{ $t('HEADER.PERSONAL_INFO') }} </span>

                <template #left-icon>
                  <svg class="user-info__label-icon">
                    <use href="#icon-profile" />
                  </svg>
                </template>
              </BaseHoverText>
            </NuxtLink>

            <NuxtLink
              v-if="isProjectOwner"
              v-click-block="toggleMobileMenu"
              :to="'/project-owner/dashboard'"
              class="user-info__label"
            >
              <BaseHoverText color="white">
                <span> Payments & withdrawal </span>

                <template #left-icon>
                  <svg class="user-info__label-icon">
                    <use href="#icon-profile" />
                  </svg>
                </template>
              </BaseHoverText>
            </NuxtLink>

            <div class="user-info__logout">
              <div
                class="mobile-menu__divider mobile-menu__divider_logout"
              ></div>

              <BaseButton
                type="no-border"
                class="auth__logout user-info__logout-btn"
                @click="logout"
              >
                <div class="user-info__label">
                  <svg class="user-info__label-icon">
                    <use href="#icon-logout" />
                  </svg>

                  <span class="user-info__label-text">
                    {{ $t('GENERAL.LOGOUT') }}
                  </span>
                </div>
              </BaseButton>
            </div>
          </div>
        </template>

        <div v-else class="mobile-menu__block mobile-menu__auth">
          <BaseButton
            v-click-block="toggleMobileMenu"
            class="auth__registration"
            :to="linkToRegistration"
          >
            {{ $t('GENERAL.REGISTRATION') }}
          </BaseButton>

          <BaseButton
            v-click-block="toggleMobileMenu"
            type="no-border"
            class="auth__login"
            :to="linkToLogin"
          >
            {{ $t('GENERAL.LOGIN') }}
          </BaseButton>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import BaseDropdown from '~/components/base/BaseDropdown'
import BaseButton from '~/components/base/BaseButton'
// import FundProjectBtn from '~/components/general/FundProjectBtn'
import BaseHoverText from '~/components/base/BaseHoverText'

export default {
  name: 'MobileMenu',

  components: {
    // BaseDropdown,
    BaseButton,
    // FundProjectBtn,
    BaseHoverText,
  },

  props: {
    isProjectOwner: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'black',
    },
    linkToFundProjectPage: {
      required: true,
      type: String,
    },
    linkToProjects: {
      required: true,
      type: String,
    },
    linkToHowItWorks: {
      required: true,
      type: String,
    },

    linkToLogin: {
      required: true,
      type: String,
    },
    linkToRegistration: {
      required: true,
      type: String,
    },
    linkToPersonalInfo: {
      required: true,
      type: String,
    },
    userName: {
      type: String,
      default: null,
    },
    logoutCallback: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      showMobileMenu: false,
    }
  },

  computed: {
    ...mapGetters('base', ['EXCHANGE_RATE']),

    exchangeRate() {
      if (!this.EXCHANGE_RATE) {
        return null
      }

      const localCoin = this.EXCHANGE_RATE.localCoin
      const exchangeRate = this.EXCHANGE_RATE.exchangeRate
      const exchangeCoin = this.EXCHANGE_RATE.exchangeCoin

      const rate = `1 ${localCoin} = ${exchangeRate} ${exchangeCoin}`

      return rate
    },
  },

  watch: {
    showMobileMenu(val) {
      // if (val) {
      //   this.$bodyLocker.lock()
      // } else {
      //   this.$bodyLocker.unlock()
      // }
    },
  },

  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu

      this.$emit('showMobileMenu', this.showMobileMenu)
    },

    onLinkClick(link) {
      this.$emit('linkClick', link)
    },

    onBeforeEnter() {
      this.$bodyLocker.lock()
    },

    onAfterLeave() {
      this.$bodyLocker.unlock()
    },

    async logout() {
      await this.logoutCallback()

      this.toggleMobileMenu()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/mobile-menu';

.link-presale {
  text-align: center;
  color: #000 !important;
  position: relative;
  padding: 10px 18px;
  border-radius: 8px;
  border: 2px solid #8a8a8a;
  box-sizing: border-box !important;
  transition: border-color 0.3s ease;
}
.link-presale,
.link-presale span {
  color: #fff !important;
}
.link-presale:before {
  background: linear-gradient(100deg, #b7e93b, #3bd7e6 52.6%, blue);
  border-radius: inherit;
  bottom: -1px;
  content: '';
  left: -1px;
  position: absolute;
  right: -1px;
  top: -1px;
  transition: all 0.3s ease;
  z-index: -1;
  opacity: 0;
}
.link-presale:hover {
  border-color: transparent;
}
.link-presale:hover:before {
  opacity: 1;
}
.link-presale:after {
  background: #0c0c0c;
  border-radius: inherit;
  bottom: 1px;
  content: '';
  left: 1px;
  position: absolute;
  right: 1px;
  top: 1px;
  z-index: -1;
}
</style>
