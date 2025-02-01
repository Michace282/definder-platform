<template>
  <div class="how-it-works">
    <div class="how-it-works__container">
      <div class="dao-voting-system">
        <h1 class="dao-voting-system__title">
          {{ $t('HOW_IT_WORKS_DAO.HEAD_TITLE') }}
        </h1>
        <p class="dao-voting-system__description">
          {{ $t('HOW_IT_WORKS_DAO.HEAD_DESCRIPTION') }}
        </p>
        <a
          href="https://docs.definder.global/df-platform-white-paper/how-it-works/dao"
          class="dao-voting-system__button"
        >
          {{ $t('HOW_IT_WORKS.FUND_BUTTON') }}
        </a>
      </div>
      <h2 class="how-it-works___title">{{ $t('HOW_IT_WORKS_DAO.TITLE') }}</h2>
      <div class="how-it-works__row">
        <div class="how-it-works__steps">
          <div class="how-it-works__steps__step">
            <div class="how-it-works__steps__step__number">1</div>
            <div class="how-it-works__steps__step__content">
              <h3 class="how-it-works__steps__step__content__title">
                {{ $t('HOW_IT_WORKS_DAO.PROJECT_PROPOSAL_TITLE') }}
              </h3>
              <p class="how-it-works__steps__step__content__description">
                {{ $t('HOW_IT_WORKS_DAO.PROJECT_PROPOSAL_DESCRIPTION') }}
              </p>
            </div>
          </div>
          <div class="how-it-works__steps__step">
            <div class="how-it-works__steps__step__number">2</div>
            <div class="how-it-works__steps__step__content">
              <h3 class="how-it-works__steps__step__content__title">
                {{ $t('HOW_IT_WORKS_DAO.COMMUNITY_VOTE_TITLE') }}
              </h3>
              <p class="how-it-works__steps__step__content__description">
                {{ $t('HOW_IT_WORKS_DAO.COMMUNITY_VOTE_DESCRIPTION') }}
              </p>
            </div>
          </div>
          <div class="how-it-works__steps__step">
            <div class="how-it-works__steps__step__number">3</div>
            <div class="how-it-works__steps__step__content">
              <h3 class="how-it-works__steps__step__content__title">
                {{ $t('HOW_IT_WORKS_DAO.INVEST_ON_MARKETPLACE_TITLE') }}
              </h3>
              <p class="how-it-works__steps__step__content__description">
                {{ $t('HOW_IT_WORKS_DAO.INVEST_ON_MARKETPLACE_DESCRIPTION') }}
              </p>
            </div>
          </div>
        </div>
        <div class="how-it-works__image-container">
          <img
            src="/images/sources/image_119.png"
            alt="How it works"
            class="how-it-works__image-container__image"
          />
        </div>
      </div>

      <div class="faq">
        <h2 class="faq___title">{{ $t('HOW_IT_WORKS_DAO.FAQ_TITLE') }}</h2>
        <ul class="faq__list">
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#what-is-df-platform"
              class="faq__list__item__question"
              target="_blank"
            >
              {{ $t('HOW_IT_WORKS_DAO.FAQ.WHAT_IS_DF_PLATFORM') }}
            </a>
          </li>
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#who-can-use-the-lemox-platform-to-invest-in-real-estate"
              class="faq__list__item__question"
              target="_blank"
            >
              {{ $t('HOW_IT_WORKS_DAO.FAQ.WHO_CAN_USE_THE_LEMOX_PLATFORM') }}
            </a>
          </li>
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#how-does-definder-select-and-vet-real-estate-projects"
              class="faq__list__item__question"
              target="_blank"
            >
              {{
                $t(
                  'HOW_IT_WORKS_DAO.FAQ.HOW_DOES_DEFINDER_SELECT_AND_VET_REAL_ESTATE_PROJECTS'
                )
              }}
            </a>
          </li>
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#how-is-my-definder-investment-income-taxed"
              class="faq__list__item__question"
              target="_blank"
            >
              {{
                $t(
                  'HOW_IT_WORKS_DAO.FAQ.HOW_IS_MY_DEFINDER_INVESTMENT_INCOME_TAXED'
                )
              }}
            </a>
          </li>
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#why-should-i-invest-through-definder-instead-of-other-real-estate-investment-options"
              class="faq__list__item__question"
              target="_blank"
            >
              {{
                $t('HOW_IT_WORKS_DAO.FAQ.WHY_SHOULD_I_INVEST_THROUGH_DEFINDER')
              }}
            </a>
          </li>
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#how-does-definder-differ-from-other-crowdfunding-platforms-in-europe"
              class="faq__list__item__question"
              target="_blank"
            >
              {{
                $t(
                  'HOW_IT_WORKS_DAO.FAQ.HOW_DOES_DEFINDER_DIFFER_FROM_OTHER_CROWDFUNDING_PLATFORMS'
                )
              }}
            </a>
          </li>
          <li class="faq__list__item">
            <a
              href="https://docs.definder.global/df-platform-white-paper/need-help/faq#how-does-definder-ensure-safety"
              class="faq__list__item__question"
              target="_blank"
            >
              {{ $t('HOW_IT_WORKS_DAO.FAQ.HOW_DOES_DEFINDER_ENSURE_SAFETY') }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HowItWorksDAO',
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/how-it-works-dao/how-it-works-dao';
</style>
