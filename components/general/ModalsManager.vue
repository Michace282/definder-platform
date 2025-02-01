<template>
  <TransitionGroup name="modals" tag="div" class="modals" @after-leave="leave">
    <BaseModal
      v-for="modal in OPENED_MODALS"
      :key="modal.id"
      v-bind="modalComponents[modal.component].wrapperOptions"
      :modal-id="modal.id"
      class="modals__item"
    >
      <component
        :is="modalComponents[modal.component].component"
        v-bind="modal.options"
        :modal-id="modal.id"
        class="modals__item-content"
      />
    </BaseModal>
  </TransitionGroup>
</template>

<script>
import { mapGetters } from 'vuex'

import BaseModal from '~/components/base/BaseModal'
import ChangePassword from '~/components/modal-content/ChangePassword'

export default {
  name: 'ModalsManager',

  components: {
    BaseModal,
    ChangePassword,
  },

  computed: {
    ...mapGetters('modal', ['OPENED_MODALS']),

    modalComponents() {
      return {
        ChangePassword: {
          component: () => import('~/components/modal-content/ChangePassword'),
          wrapperOptions: { size: 'md' },
        },

        ConfirmAction: {
          component: () => import('~/components/modal-content/ConfirmAction'),
          wrapperOptions: { size: 'sm' },
        },

        TextModal: {
          component: () => import('~/components/modal-content/ConfirmAction'),
          wrapperOptions: { size: 'sm', noBottomPadding: true },
        },

        SuccessInvestmentPopup: {
          component: () =>
            import('~/components/modal-content/SuccessInvestmentPopup'),
          wrapperOptions: { size: 'sm' },
        },

        InformPopup: {
          component: () => import('~/components/modal-content/InformPopup'),
          wrapperOptions: { size: 'sm' },
        },

        ProjectCalculator: {
          component: () =>
            import('~/components/modal-content/ProjectCalculator'),
          wrapperOptions: { size: 'lg' },
        },

        ImagesPreview: {
          component: () => import('~/components/modal-content/ImagesPreview'),
          wrapperOptions: { size: 'full', background: 'transparent' },
        },

        LoginReminder: {
          component: () => import('~/components/modal-content/LoginReminder'),
          wrapperOptions: { size: 'sm' },
        },
      }
    },
  },

  watch: {
    OPENED_MODALS(next) {
      const isLocked = this.$bodyLocker.isLocked

      if (isLocked === false && next.length > 0) {
        this.$bodyLocker.lock()
      }
    },
  },

  methods: {
    leave() {
      const isLocked = this.$bodyLocker.isLocked
      if (isLocked === true && this.OPENED_MODALS.length === 0) {
        this.$bodyLocker.unlock()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/modals-manager';
</style>
