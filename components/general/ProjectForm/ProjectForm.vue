<template>
  <div class="project-form">
    <div class="project-form__container">
      <SectionTitle header-tag="h3" class="project-form__title">
        {{ title }}
      </SectionTitle>

      <ValidationObserver
        ref="createObserver"
        class="create-form"
        tag="form"
        @submit.prevent="create"
      >
        <ProjectInfo
          :names="names"
          :goal.sync="goal"
          :address.sync="address"
          :website.sync="website"
          :telegram-group.sync="telegramGroup"
          :disabled="isCreateDisabled"
          :hide-languages="isAddWalletsMode"
          class="create-form__info"
          @update-name="updateName"
        />

        <ProjectPhoto
          :photos.sync="photos"
          :disabled="isCreateDisabled"
          class="create-form__photo"
        />

        <CompanyInfo
          :company-name.sync="companyName"
          :linkedin.sync="linkedin"
          :instagram.sync="instagram"
          :facebook.sync="facebook"
          :youtube.sync="youtube"
          :twitter.sync="twitter"
          :disabled="isCreateDisabled"
          class="create-form__company"
        />

        <ProjectDocuments
          :documents.sync="documents"
          :disabled="isCreateDisabled"
          claas="create-form__documents"
        />

        <ProjectDescription
          :descriptions="descriptions"
          :disabled="isCreateDisabled"
          :hide-languages="isAddWalletsMode"
          class="create-form__description"
          @update-description="updateDescription"
        />

        <div v-if="isCreateMode" class="create-form__send">
          <BaseButton
            :loading="isCreateDisabled"
            component="button"
            form-type="submit"
            color="blue"
            type="filled"
            class="create-form__send-btn"
          >
            {{ $t('PROJECT.SEND_FOR_MODERATION') }}
          </BaseButton>
        </div>
      </ValidationObserver>

      <ValidationObserver
        v-if="isAddWalletsMode"
        ref="addWalletsObserver"
        class="add-wallets-form"
        tag="form"
        @submit.prevent="submitAddWallets"
      >
        <ProjectWallets
          :disabled="isAddWalletsLoading"
          :currencies="currencies"
          :wallets="visibleWallets"
          @add-coin-wallet="addCoinWallet"
          @update-coin-wallet="updateCoinWallet"
          @delete-coin-wallet="deleteCoinWallet"
        />

        <div class="add-wallets-form__send">
          <BaseButton
            :loading="isAddWalletsLoading"
            component="button"
            form-type="submit"
            color="blue"
            type="filled"
            class="add-wallets-form__send-btn"
          >
            {{ $t('PROJECT.SEND_FOR_MODERATION') }}
          </BaseButton>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import SectionTitle from '~/components/general/SectionTitle'
import ProjectInfo from '~/components/general/ProjectForm/ProjectInfo'
import ProjectPhoto from '~/components/general/ProjectForm/ProjectPhoto'
import CompanyInfo from '~/components/general/ProjectForm/CompanyInfo'
import ProjectDocuments from '~/components/general/ProjectForm/ProjectDocuments'
import ProjectDescription from '~/components/general/ProjectForm/ProjectDescription'
import ProjectWallets from '~/components/general/ProjectForm/ProjectWallets'
import BaseButton from '~/components/base/BaseButton'

import {
  ProjectNamesLanguages,
  ProjectDescriptionLanguages,
} from '~/pkg/configs/projects'

export default {
  name: 'ProjectForm',

  components: {
    SectionTitle,
    ProjectInfo,
    ProjectPhoto,
    CompanyInfo,
    ProjectDocuments,
    ProjectDescription,
    ProjectWallets,
    BaseButton,
    ValidationObserver,
  },

  props: {
    mode: {
      type: String,
      default: 'create',
      validator(value) {
        return ['create', 'add-wallets'].includes(value)
      },
    },

    project: {
      type: Object,
      default: null,
    },

    currencies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      names: [],
      goal: '',
      address: '',
      website: '',
      telegramGroup: '',

      photos: [],

      companyName: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: '',

      documents: [],

      descriptions: [],

      wallets: [],

      isCreateLoading: false,
      isAddWalletsLoading: false,
    }
  },

  setup() {
    if (this.isCreateMode) {
      this.initCreateMode()
    } else if (this.isAddWalletsMode) {
      this.initAddWalletsMode()
    }
  },

  computed: {
    isCreateMode() {
      return this.mode === 'create'
    },

    isAddWalletsMode() {
      return this.mode === 'add-wallets'
    },

    isCreateDisabled() {
      return !this.isCreateMode || this.isCreateLoading
    },

    title() {
      if (this.isCreateMode) {
        return this.$t('PROJECT.CREATE_TITLE')
      } else if (this.isAddWalletsMode) {
        return this.$t('PROJECT.ADD_WALLETS_TITLE')
      }

      return null
    },

    visibleWallets() {
      return this.wallets.filter((item) => item.isDelete === false)
    },
  },

  methods: {
    initCreateMode() {
      const descriptions = []
      for (const lang of ProjectDescriptionLanguages) {
        descriptions.push({
          code: lang.code,
          text: lang.text,
          value: '',
        })
      }

      this.descriptions = descriptions

      const names = []
      for (const lang of ProjectNamesLanguages) {
        names.push({
          code: lang.code,
          text: lang.text,
          value: '',
        })
      }

      this.names = names
    },

    initAddWalletsMode() {
      this.names = [
        {
          code: 'default',
          text: 'default',
          value: this.project.name,
        },
      ]
      this.goal = this.project.goal?.toString() || null
      this.address = this.project.address || null
      this.website = this.project.webSite || null
      this.telegramGroup = this.project.telegramGroup || null

      this.photos = this.project.projectImages.map((item, index) => ({
        id: index * -1 - 1,
        itemId: item.id,
        type: 'preload',
        image: item.imageCompressed,
      }))

      this.companyName = this.project.companyName || null
      this.linkedin = this.project.linkedin || null
      this.instagram = this.project.instagram || null
      this.facebook = this.project.facebook || null
      this.youtube = this.project.youtube || null
      this.twitter = this.project.twitter || null

      this.documents = this.project.projectDocuments.map((item, index) => ({
        id: index * -1 - 1,
        itemId: item.id,
        type: 'preload',
        file: item.file,
        name: item.fileName,
        fileType: item.documentType,
      }))

      this.descriptions = [
        {
          code: 'default',
          text: 'default',
          value: this.project.description,
        },
      ]

      const projectWallets = [...this.project.coinWallets].sort((item) =>
        item.isActive ? -1 : 0
      )
      for (const item of projectWallets) {
        this.addCoinWallet(
          item.name,
          this.currencies.find((cur) => cur.name === item.currency),
          {
            oldId: item.id,
            isActive: item.isActive,
          }
        )
      }
      if (this.wallets.length === 0) {
        this.addCoinWallet()
      }
    },

    updateName(source, value) {
      const findingCallback = (item) => item.code === source.code
      const index = this.names.findIndex(findingCallback)
      if (index === -1) {
        return
      }

      const updatedLand = { ...source, value }

      this.$set(this.names, index, updatedLand)
    },

    updateDescription(source, value) {
      const findingCallback = (item) => item.code === source.code
      const index = this.descriptions.findIndex(findingCallback)
      if (index === -1) {
        return
      }

      const updatedLand = { ...source, value }

      this.$set(this.descriptions, index, updatedLand)
    },

    async create() {
      const isValid = await this.$refs.createObserver.validate()
      if (!isValid) {
        return
      }

      const names = this.getFormatterNames()
      const descriptions = this.getFormatterDescriptions()

      const data = {
        ...names,
        address: this.address,
        goal: this.goal,
        webSite: this.website,
        telegramGroup: this.telegramGroup,
        companyName: this.companyName,
        facebook: this.facebook,
        twitter: this.twitter,
        linkedin: this.linkedin,
        instagram: this.instagram,
        youtube: this.youtube,
        video: this.video,
        projectImages: this.photos,
        projectDocuments: this.documents,
        ...descriptions,
      }

      this.isCreateLoading = true

      try {
        await this.$api.projects.createProject(data)

        const message = 'PROJECT.WAS_SENT_FOR_MODERATION'
        this.$toast.success(this.$t(message).toString())

        await this.redirectToMyProjects()
      } catch {
      } finally {
        this.isCreateLoading = false
      }
    },

    getFormatterNames() {
      const names = {}
      for (const { code, value } of this.names) {
        names[code] = value
      }
      return names
    },

    getFormatterDescriptions() {
      const descriptions = {}
      for (const { code, value } of this.descriptions) {
        descriptions[code] = value
      }
      return descriptions
    },

    async redirectToMyProjects() {
      await this.$router.push(
        this.localePath({
          name: 'profile-my-projects',
        })
      )
    },

    addCoinWallet(name = '', currency = '', { oldId, isActive } = {}) {
      const biggerId = this.wallets.reduce(
        (prev, item) => (item.id > prev ? item.id : prev),
        0
      )

      const newItem = {
        id: (biggerId || 0) + 1,
        isActive: isActive || false,
        name,
        currency,
        isUpdate: false,
        isDelete: false,
        oldId: oldId || null,
      }

      this.wallets.push(newItem)
    },

    updateCoinWallet(item, key, value) {
      const updatedItem = {
        ...item,
        [key]: value,
      }

      const index = this.wallets.findIndex((item) => item.id === updatedItem.id)

      if (index === -1) {
        return
      }

      if (item.oldId !== null && updatedItem.isDelete !== true) {
        updatedItem.isUpdate = true
      }

      this.$set(this.wallets, index, updatedItem)
    },

    deleteCoinWallet(item) {
      const index = this.wallets.findIndex((el) => el.id === item.id)
      if (index === -1) {
        return
      }

      if (item.oldId !== null) {
        this.updateCoinWallet(item, 'isDelete', true)
        return
      }

      this.wallets.splice(index, 1)
    },

    async submitAddWallets() {
      const isValid = await this.$refs.addWalletsObserver.validate()
      if (!isValid) {
        return
      }

      const data = {
        id: this.project.id,
        coinWallets: this.wallets
          .filter(
            (item) => item.oldId === null || item.isUpdate || item.isDelete
          )
          .map((item) => ({
            name: item.name,
            currency: item.currency?.name,
            isUpdate: item.isUpdate,
            isDelete: item.isDelete,
            oldId: item.oldId || undefined,
          })),
      }

      this.isAddWalletsLoading = true

      try {
        await this.$api.projects.addWallets(data)

        const message = 'PROJECT.WAS_SENT_FOR_MODERATION'
        this.$toast.success(this.$t(message).toString())

        await this.redirectToMyProjects()
      } catch {
      } finally {
        this.isAddWalletsLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/project-form';
</style>
