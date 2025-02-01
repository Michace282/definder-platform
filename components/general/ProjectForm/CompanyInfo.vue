<template>
  <div class="company-info">
    <ValidationProvider
      v-slot="{ errors }"
      class="company-info__name"
      tag="div"
      rules="min:3|max:200"
      :name="$t('PROJECT.COMPANY_NAME').toLowerCase()"
    >
      <BaseInput
        v-model="companyNameData"
        :label="$t('PROJECT.COMPANY_NAME')"
        :disabled="disabled"
        class="company-info__name-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="company-info__linkedin"
      tag="div"
      rules="website|min:3|max:200"
      :name="$t('SOCIALS.LINKEDIN').toLowerCase()"
    >
      <BaseInput
        v-model="linkedinData"
        :label="$t('SOCIALS.LINKEDIN')"
        :disabled="disabled"
        class="company-info__linkedin-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="company-info__instagram"
      tag="div"
      rules="website|min:3|max:200"
      :name="$t('SOCIALS.INSTAGRAM').toLowerCase()"
    >
      <BaseInput
        v-model="instagramData"
        :label="$t('SOCIALS.INSTAGRAM')"
        :disabled="disabled"
        class="company-info__instagram-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="company-info__facebook"
      tag="div"
      rules="website|min:3|max:200"
      :name="$t('SOCIALS.FACEBOOK').toLowerCase()"
    >
      <BaseInput
        v-model="facebookData"
        :label="$t('SOCIALS.FACEBOOK')"
        :disabled="disabled"
        class="company-info__facebook-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="company-info__youtube"
      tag="div"
      rules="website|min:3|max:200"
      :name="$t('SOCIALS.YOUTUBE').toLowerCase()"
    >
      <BaseInput
        v-model="youtubeData"
        :label="$t('SOCIALS.YOUTUBE')"
        :disabled="disabled"
        class="company-info__youtube-input"
        :error="errors[0]"
      />
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ errors }"
      class="company-info__twitter"
      tag="div"
      rules="website|min:3|max:200"
      :name="$t('SOCIALS.TWITTER').toLowerCase()"
    >
      <BaseInput
        v-model="twitterData"
        :label="$t('SOCIALS.TWITTER')"
        :disabled="disabled"
        class="company-info__twitter-input"
        :error="errors[0]"
      />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import BaseInput from '~/components/base/BaseInput'

export default {
  name: 'CompanyInfo',

  components: {
    BaseInput,
    ValidationProvider,
  },

  props: {
    companyName: {
      type: String,
      default: null,
    },

    linkedin: {
      type: String,
      default: null,
    },

    instagram: {
      type: String,
      default: null,
    },

    facebook: {
      type: String,
      default: null,
    },

    youtube: {
      type: String,
      default: null,
    },

    twitter: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: null,
    },
  },

  computed: {
    companyNameData: {
      get() {
        return this.companyName
      },
      set(value) {
        this.$emit('update:company-name', value)
      },
    },

    linkedinData: {
      get() {
        return this.linkedin
      },
      set(value) {
        this.$emit('update:linkedin', value)
      },
    },

    instagramData: {
      get() {
        return this.instagram
      },
      set(value) {
        this.$emit('update:instagram', value)
      },
    },

    facebookData: {
      get() {
        return this.facebook
      },
      set(value) {
        this.$emit('update:facebook', value)
      },
    },

    youtubeData: {
      get() {
        return this.youtube
      },
      set(value) {
        this.$emit('update:youtube', value)
      },
    },

    twitterData: {
      get() {
        return this.twitter
      },
      set(value) {
        this.$emit('update:twitter', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/company-info';
</style>
