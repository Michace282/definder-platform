<template>
  <ValidationProvider
    v-slot="{ errors }"
    :class="{ 'project-documents_disabled': disabled }"
    class="project-documents"
    tag="div"
    rules="required"
    :name="$t('PROFILE.DOCUMENT')"
  >
    <ResourceUploader
      v-model="documentsData"
      :title="$t('PROJECT.DOCUMENTS')"
      :upload-text="$t('PROJECT.UPLOAD_DOCUMENTS')"
      :upload-hint="uploadHint"
      :accept="accept"
      :no-content-margin="documentsData.length === 0"
      :disabled="disabled"
      class="project-documents__uploader"
      :error="errors[0]"
    >
      <template #content>
        <div class="project-documents__content">
          <transition name="document">
            <div
              v-if="documentsData.length !== 0"
              class="project-documents__info-title"
            >
              {{ $t('PROJECT.LIST_OF_DOCUMENTS_TO_BE_UPLOAD') }}:
            </div>
          </transition>

          <transition-group
            name="document"
            tag="ul"
            class="project-documents__list"
          >
            <li
              v-for="item in documentsData"
              :key="item.id"
              class="project-documents__item"
              @pointerdown.prevent.stop
            >
              <div class="project-documents__item-icon">
                <img :src="getDocumentIcon(item)" alt="document icon" />
              </div>

              <div class="project-documents__item-name">
                {{ item.name }}
              </div>

              <div
                class="project-documents__item-delete"
                @click="deleteDocument(item)"
              >
                <svg><use href="#icon-trash" /></svg>
              </div>
            </li>
          </transition-group>
        </div>
      </template>
    </ResourceUploader>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import ResourceUploader from '~/components/general/ResourceUploader'

export default {
  name: 'ProjectDocuments',

  components: {
    ResourceUploader,
    ValidationProvider,
  },

  props: {
    documents: {
      type: Array,
      default: () => [],
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      documentFormats: ['.pdf', '.jpeg', '.jpg', '.png'],
    }
  },

  computed: {
    documentsData: {
      get() {
        return this.documents
      },
      set(value) {
        this.$emit('update:documents', value)
      },
    },

    accept() {
      return this.documentFormats.join(',')
    },

    uploadHint() {
      const formats = this.documentFormats
        .map((item) => item.split('.')[1])
        .join(', ')

      return this.$t('PROJECT.UPLOAD_DOCUMENTS_HINT', { formats })
    },
  },

  methods: {
    getDocumentIcon(doc) {
      let [, ext] = doc.type.split('/')
      if (!ext) {
        ext = doc.fileType || null
      }

      if (ext === 'pdf') {
        return '/images/sources/icon-pdf.svg'
      } else if (ext === 'png') {
        return '/images/sources/icon-png.svg'
      } else if (ext === 'jpg' || ext === 'jpeg') {
        return '/images/sources/icon-jpg.svg'
      }

      return ''
    },

    deleteDocument(doc) {
      const index = this.documentsData.findIndex((item) => item === doc)
      if (index === -1) {
        return
      }

      const copy = [...this.documentsData]
      copy.splice(index, 1)
      this.documentsData = copy
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/project-documents';
</style>
