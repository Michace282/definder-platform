<template>
  <ValidationProvider
    v-slot="{ errors }"
    class="project-photo"
    tag="div"
    rules="required|minmax:3,10"
    :name="$t('PROFILE.PHOTO')"
  >
    <ResourceUploader
      ref="uploader"
      :value="photosData"
      :title="$t('PROJECT.PHOTO')"
      :upload-text="$t('PROJECT.UPLOAD_PHOTO')"
      :upload-hint="uploadHint"
      :accept="accept"
      :max="max"
      :disabled="disabled"
      class="project-photo__uploader"
      :error="errors[0]"
      @input="inputPhotosData"
    >
      <template #content>
        <BaseDraggable
          v-model="photosData"
          ghost-class="ghost"
          :animation="0"
          :disabled="disabled"
          handle=".move"
          class="project-photo__content"
          @start="startDragging"
          @end="stopDragging"
        >
          <transition-group
            :name="!drag ? 'flip-list' : null"
            type="transition"
            tag="ul"
            mode="out-in"
            class="project-photo__list"
          >
            <template v-for="(item, index) in displayedPhotos">
              <li
                v-if="!item.isTemplate"
                :key="item.photoId"
                class="project-photo__item"
              >
                <BaseFileInput
                  :value="item"
                  :accept="accept"
                  @input="updatePhoto(item, $event)"
                >
                  <div class="project-photo__item-img">
                    <img :src="getImage(item)" alt="uploaded image" />
                  </div>

                  <transition name="fade">
                    <div v-if="index === 0" class="project-photo__item-status">
                      {{ $t('PROJECT.MAIN_PHOTO') }}
                    </div>
                  </transition>

                  <div v-if="!disabled" class="project-photo__item-controls">
                    <div class="project-photo__item-move move">
                      <svg><use href="#icon-move" /></svg>
                    </div>

                    <transition name="fade">
                      <div
                        class="project-photo__item-delete"
                        @click.stop.prevent="deletePhoto(item)"
                      >
                        <svg><use href="#icon-trash" /></svg>
                      </div>
                    </transition>
                  </div>
                </BaseFileInput>
              </li>

              <li
                v-else
                :key="item.photoId"
                class="project-photo__template"
                @click="openUploader"
              >
                <div class="project-photo__template-content">
                  <div class="project-photo__template-icon">
                    <svg>
                      <use href="#icon-image" />
                    </svg>
                  </div>

                  <div class="project-photo__template-text">
                    {{ $t('PROJECT.NO_IMAGE_AVAILABLE') }}
                  </div>
                </div>
              </li>
            </template>
          </transition-group>
        </BaseDraggable>
      </template>
    </ResourceUploader>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import BaseDraggable from '~/components/base/BaseDraggable'
import BaseFileInput from '~/components/base/BaseFileInput'
import ResourceUploader from '~/components/general/ResourceUploader'

const minPhotos = 3
const maxPhotos = 10

export default {
  name: 'ProjectPhoto',

  components: {
    BaseDraggable,
    BaseFileInput,
    ResourceUploader,
    ValidationProvider,
  },

  props: {
    photos: {
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
      photoFormats: ['.jpeg', '.jpg', '.png'],
      min: minPhotos,
      max: maxPhotos,
      idCounter: 0,
      drag: false,

      templates: [],
    }
  },

  computed: {
    photosData: {
      get() {
        return this.photos
      },
      set(value) {
        this.$emit('update:photos', value)
      },
    },

    displayedPhotos() {
      return [...this.photosData, ...this.templates]
    },

    accept() {
      return this.photoFormats.join(',')
    },

    uploadHint() {
      const min = this.min
      const max = this.max
      const formats = this.photoFormats
        .map((item) => item.split('.')[1])
        .join(', ')

      return this.$t('PROJECT.UPLOAD_PHOTO_HINT', { formats, min, max })
    },
  },

  created() {
    this.initTemplates()
    this.reinitializePhotosData([...this.photosData])
  },

  methods: {
    initTemplates() {
      for (let i = 0; i < this.min; i++) {
        const template = this.getTemplate(this.idCounter++)
        this.templates.push(template)
      }
    },

    reinitializePhotosData(items) {
      for (const item of items) {
        item.photoId = null
      }

      this.inputPhotosData(items)
    },

    inputPhotosData(items) {
      for (const item of items) {
        if (item.photoId === undefined || item.photoId === null) {
          if (this.templates.length === 0) {
            item.photoId = this.idCounter++
            continue
          }

          const template = this.templates[0]
          this.templates.splice(0, 1)

          item.photoId = template.photoId
        }
      }

      this.photosData = items
    },

    getImage(photo) {
      if (photo.type === 'preload') {
        return photo.image
      }

      return URL.createObjectURL(photo)
    },

    updatePhoto(prev, next) {
      const index = this.photosData.findIndex((item) => item === prev)
      if (index === -1) {
        return
      }

      next.photoId = prev.photoId

      const copy = [...this.photosData]
      copy[index] = next
      this.photosData = copy
    },

    deletePhoto(photo) {
      const index = this.photosData.findIndex((item) => item === photo)
      if (index === -1) {
        return
      }

      const copy = [...this.photosData]
      copy.splice(index, 1)
      this.photosData = copy

      if (copy.length >= this.min) {
        return
      }

      const newTemplate = this.getTemplate(photo.photoId)
      this.templates.push(newTemplate)
    },

    getTemplate(photoId) {
      return {
        photoId,
        isTemplate: true,
      }
    },

    startDragging() {
      this.drag = true
    },

    stopDragging() {
      this.drag = false
    },

    openUploader() {
      this.$refs.uploader.open()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/project-form/project-photo';
</style>
