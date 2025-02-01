<template>
  <footer class="footer page__footer">
    <div class="footer__content">
      <div class="footer__top">
        <div class="footer__info">
          <div class="footer__logo">
            <BaseLogo class="footer__logo-component" />
          </div>

          <div class="footer__text">
            {{ $t('FOOTER.DESCRIPTION') }}
          </div>
        </div>

        <div class="footer__links">
          <a
            href="https://definder.global/about/"
            target="_blank"
            class="footer__link"
          >
            <BaseHoverText color="white">
              <span> {{ $t('FOOTER.LINK_ABOUT_US') }} </span>
            </BaseHoverText>
          </a>

          <a
            href="https://definder.global/category/blog/"
            target="_blank"
            class="footer__link"
          >
            <BaseHoverText color="white">
              <span> {{ $t('FOOTER.LINK_NEWS') }} </span>
            </BaseHoverText>
          </a>

          <a
            href="https://definder.global/lend/#contact"
            target="_blank"
            class="footer__link"
          >
            <BaseHoverText color="white">
              <span> {{ $t('FOOTER.LINK_CONTACT_US') }} </span>
            </BaseHoverText>
          </a>

          <a href="mailto:support@definder.global" class="footer__link">
            <BaseHoverText color="white">
              <span> {{ $t('FOOTER.LINK_HELP') }} </span>
            </BaseHoverText>
          </a>
        </div>

        <div class="footer__socials">
          <a
            v-for="item in socials"
            :key="item.id"
            :href="item.link"
            target="_blank"
            class="footer__social"
          >
            <svg>
              <use :href="item.icon" />
            </svg>
          </a>
        </div>
      </div>

      <!--1-->
      <div class="footer-bottom">
        <div class="footer-bottom__left">
          {{ $t('FOOTER.DEFINDER_RULES') }}
        </div>
      </div>
      <!--2-->

      <div class="footer-bottom">
        <div class="footer-bottom__left">
          © {{ currentYear }} {{ $t('FOOTER.RIGHT_RESERVED') }}
        </div>

        <div class="footer-bottom__right">
          <BaseLink
            to="/docs/privacy_policy.pdf"
            target="_blank"
            color="grey"
            class="footer-bottom__link"
          >
            {{ $t('FOOTER.PRIVACY_POLICY') }}
          </BaseLink>

          <BaseLink
            to="/docs/definder_terms_with_the_project_owners.pdf"
            target="_blank"
            color="grey"
            class="footer-bottom__link"
          >
            {{ $t('FOOTER.TERMS_AND_CONS') }}
          </BaseLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import BaseLogo from '~/components/base/BaseLogo'
import BaseLink from '~/components/base/BaseLink'
import BaseHoverText from '~/components/base/BaseHoverText'

export default {
  name: 'TheFooter',

  components: {
    BaseLogo,
    BaseLink,
    BaseHoverText,
  },

  computed: {
    socials() {
      return [
        {
          id: 0,
          icon: '#icon-medium',
          link: 'https://definderglobal.medium.com/',
        },
        {
          id: 1,
          icon: '#icon-youtube',
          link: 'https://www.youtube.com/c/definder/videos',
        },
        { id: 2, icon: '#icon-telegram', link: 'https://t.me/definderchat' },
        { id: 3, icon: '#icon-discord', link: 'https://discord.gg/h8nyqpav97' },
        {
          id: 4,
          icon: '#icon-twitter',
          link: 'https://twitter.com/definder_global',
        },
        {
          id: 5,
          icon: '#icon-facebook',
          link: 'https://www.facebook.com/definder.global',
        },
      ]
    },

    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/the-footer';
</style>
