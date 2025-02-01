<template>
  <div class="how-it-works">
    <SectionTitle header-tag="h3" class="how-it-works__title">
      {{ $t('HOW_IT_WORKS.TITLE') }}
    </SectionTitle>

    <div class="hhow-it-works__container">
      <div ref="container" class="container">
        <div class="column">
          <div class="how-it-works__left-block left-block">
            <div class="left-block__background background">
              <img
                class="background__main-img"
                src="/images/how-it-works/human-blue.png"
              />
              <img
                class="background__main-img_small"
                src="/images/how-it-works/human-blue-small.png"
              />
            </div>
            <div class="left-block__elements">
              <div
                class="left-block__element element element__reservation"
                :style="transformStyle"
                :class="
                  isVisible ? 'top-left-animation' : 'top-left-start-position'
                "
              >
                <div class="element__line"></div>
                <div class="element__arrow"></div>

                <div class="element__caption">
                  <span class="mobile-text">1. </span>Browse Projects
                </div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text">
                      Projects that have passed the vote
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Review completed and open projects
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Study all the available Due Diligence
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__reservation mobile"
                :style="transformStyle"
              >
                <div class="element__line2"></div>
                <div class="element__arrow2"></div>

                <div class="element__caption">2. Sign up</div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text"> Create your account </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Connect with Metamask wallet
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Add USDT or buy DNT tokens
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__funding"
                :style="transformStyle"
                :class="
                  isVisible
                    ? 'center-left-animation'
                    : 'center-left-start-position'
                "
              >
                <div class="element__line"></div>
                <div class="element__arrow"></div>

                <div class="element__caption">
                  <span class="mobile-text">3. </span>Filter and Select
                </div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text">
                      Filter based on Characteristics
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Filter by Status </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Filter by Project Terms </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__funding mobile"
                :style="transformStyle"
              >
                <div class="element__line2"></div>
                <div class="element__arrow2"></div>

                <div class="element__caption">4. Lend and Confirm</div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text">
                      Choose the project you like
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Select amount in USDT </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Lend the tokens to the project
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__completed"
                :style="transformStyle"
                :class="
                  isVisible
                    ? 'bottom-left-animation'
                    : 'bottom-left-start-position'
                "
              >
                <div class="element__line"></div>
                <div class="element__arrow"></div>

                <div class="element__caption">
                  <span class="mobile-text">5. </span>Sit back and Earn
                </div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text">
                      Interest gets automatically sent
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Watch your MetaMask balance grow
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Get bonuses and stake tokens
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__completed mobile"
                :style="transformStyle"
              >
                <div class="element__line2"></div>
                <div class="element__arrow2"></div>

                <div class="element__caption">6. Smart contract</div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text"> Records the investment </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Secures the funds </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Distributes payments </span>
                  </li>
                </ul>
              </div>
              <div class="arrow arrow-left" @click="scrollToPrev">&lt;</div>
              <div class="arrow arrow-right" @click="scrollToNext">></div>
            </div>
          </div>
        </div>
        <!--col2-->
        <div class="column" style="margin-left: 25px; margin-right: 45px">
          <div class="how-it-works__right-block right-block">
            <div class="right-block__img">
              <img
                class="right-block__img-wrapper"
                src="/images/how-it-works/icons-center-wrapper.png"
              />

              <img
                class="right-block__svg right-block__svg-center"
                src="/images/how-it-works/user-yellow.svg"
              />

              <img
                class="right-block__svg right-block__svg-user right-block__svg-user_top-left"
                src="/images/how-it-works/user-blue.svg"
              />
              <img
                class="right-block__svg right-block__svg-user right-block__svg-user_top-right"
                src="/images/how-it-works/user-blue.svg"
              />
              <img
                class="right-block__svg right-block__svg-user right-block__svg-user_bottom-left"
                src="/images/how-it-works/user-blue.svg"
              />
              <img
                class="right-block__svg right-block__svg-user right-block__svg-user_bottom-right"
                src="/images/how-it-works/user-blue.svg"
              />

              <svg
                class="right-block__svg right-block__svg-telegram right-block__svg-telegram_top"
              >
                <use href="#icon-telegram" />
              </svg>
              <svg
                class="right-block__svg right-block__svg-telegram right-block__svg-telegram_right"
              >
                <use href="#icon-telegram" />
              </svg>
              <svg
                class="right-block__svg right-block__svg-telegram right-block__svg-telegram_bottom"
              >
                <use href="#icon-telegram" />
              </svg>
              <svg
                class="right-block__svg right-block__svg-telegram right-block__svg-telegram_left"
              >
                <use href="#icon-telegram" />
              </svg>
            </div>

            <div class="right-block__btn-wrapper">
              <BaseButton
                color="white"
                type="no-border"
                class="right-block__btn"
              >
                <a :href="toDetailedDocs" target="_blank">
                  {{ $t('HOW_IT_WORKS.FUND_BUTTON') }}
                </a>
              </BaseButton>
            </div>

            <div class="right-block__background background">
              <div class="background__main-img-wrapper">
                <img
                  class="background__main-img human-green-img"
                  src="/images/how-it-works/human-green.png"
                />
              </div>

              <!--<img
                class="background__graphic"
                src="/images/how-it-works/graphic.png"
              />-->

              <div class="background__circle">
                <div class="background__circle_inner"></div>
                <div class="background__circle_outer"></div>
              </div>
            </div>
          </div>
        </div>
        <!--col3-->
        <div class="column">
          <div class="how-it-works__left-block left-block">
            <div class="left-block__background background">
              <!--
              <img
                class="background__main-img"
                src="/images/how-it-works/human-blue.png"
              />
              <img
                class="background__main-img_small"
                src="/images/how-it-works/human-blue-small.png"
              />-->
            </div>
            <div class="left-block__elements">
              <div
                class="left-block__element element element__reservation desktop"
                :class="
                  isVisible ? 'top-right-animation' : 'top-right-start-position'
                "
              >
                <div class="element__line2"></div>
                <div class="element__arrow2"></div>

                <div class="element__caption">Sign up</div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text"> Create your account </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Connect with Metamask wallet
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Add USDT or buy DNT tokens
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__funding desktop"
                :class="
                  isVisible
                    ? 'center-right-animation'
                    : 'center-right-start-position'
                "
              >
                <div class="element__line2"></div>
                <div class="element__arrow2"></div>

                <div class="element__caption">Lend and Confirm</div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text">
                      Choose the project you like
                    </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Select amount in USDT </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text">
                      Lend the tokens to the project
                    </span>
                  </li>
                </ul>
              </div>

              <div
                class="left-block__element element element__completed desktop"
                :class="
                  isVisible
                    ? 'bottom-right-animation'
                    : 'bottom-right-start-position'
                "
              >
                <div class="element__line2"></div>
                <div class="element__arrow2"></div>

                <div class="element__caption">Smart contract</div>
                <ul class="element__list">
                  <li class="element__item">
                    <span class="element__text"> Records the investment </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Secures the funds </span>
                  </li>
                  <li class="element__item">
                    <span class="element__text"> Distributes payments </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="how-it-works__background-anvil green">
      <svg><use href="#icon-anvil" /></svg>
    </div>
    <div class="how-it-works__background-circle blue"></div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import BaseButton from '~/components/base/BaseButton'
import intersectionObserverMixin from '~/mixins/intersectionObserverMixin'

const HOW_IT_WORKS_LINK =
  'https://docs.definder.global/df-platform-white-paper/how-it-works/system-overview'

export default {
  name: 'HowItWorks',

  components: {
    SectionTitle,
    BaseButton,
  },

  mixins: [intersectionObserverMixin],

  data() {
    return {
      currentIndex: 0,
      totalElements: 6,
      isMobile: false,
    }
  },

  computed: {
    toDetailedDocs() {
      return HOW_IT_WORKS_LINK
    },
    transformStyle() {
      if (!this.isMobile) return ''
      else
        return {
          transform: `translateX(-${this.currentIndex * 285}px)`,
          transition: 'transform 0.5s ease',
        }
    },
  },

  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
    this.autoScroll()
  },
  beforeDestroy() {
    clearInterval(this.scrollInterval)
    window.removeEventListener('resize', this.checkScreenSize)
  },

  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 992
    },
    scrollToNext() {
      if (this.isMobile) {
        if (this.currentIndex < this.totalElements - 1) {
          this.currentIndex++
        } else {
          this.currentIndex = 0
        }
        clearInterval(this.scrollInterval)
        this.autoScroll()
      }
    },

    scrollToPrev() {
      if (this.isMobile) {
        if (this.currentIndex > 0) {
          this.currentIndex--
        } else {
          this.currentIndex = this.totalElements - 1
        }
        clearInterval(this.scrollInterval)
        this.autoScroll()
      }
    },

    autoScroll() {
      this.scrollInterval = setInterval(this.scrollToNext, 6000)
    },

    checkClick(event) {
      if (!this.$auth.loggedIn) {
        event.stopPropagation()
        event.preventDefault()
        this.$router.push(this.localePath({ name: 'auth-login' }))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.column {
  flex: 1;
}
@import '~assets/scss/pages/index/how-it-works/how-it-works';
</style>
