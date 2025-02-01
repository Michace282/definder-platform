export const ProjectsCategoriesEnum = {
  highRisk: {
    code: 'high_risk',
    textCode: 'PROJECT.HIGH_RISK',
  },

  lowRisk: {
    code: 'low_risk',
    textCode: 'PROJECT.LOW_RISK',
  },

  residential: {
    code: 'residential',
    textCode: 'Residential',
  },

  mobility: {
    code: 'mobility',
    textCode: 'Mobility',
  },

  fb: {
    code: 'fb',
    textCode: 'Hospitality',
  },

  retail: {
    code: 'retail',
    textCode: 'Retail',
  },

  tech: {
    code: 'tech',
    textCode: 'Tech',
  },

  unknown: {
    code: 'unknown',
    textCode: 'PROJECT.UNKNOWN_CATEGORY',
  },
}

export const ProjectsCategories = [
  // ProjectsCategoriesEnum.lowRisk,
  // ProjectsCategoriesEnum.highRisk,
  // ProjectsCategoriesEnum.residential,
  ProjectsCategoriesEnum.mobility,
  ProjectsCategoriesEnum.fb,
  ProjectsCategoriesEnum.retail,
  // ProjectsCategoriesEnum.tech,
]

export const ProjectsStatusesEnum = {
  any: {
    code: null,
    textCode: 'PROJECT.ALL_STATUSES',
  },

  moderation: {
    code: 'moderation',
    textCode: 'PROJECT.MODERATION',
  },

  reservation: {
    code: 'reservation',
    textCode: 'PROJECT.RESERVATION',
  },

  financing: {
    code: 'financing',
    textCode: 'PROJECT.FINANCING',
  },

  completed: {
    code: 'completed',
    textCode: 'PROJECT.COMPLETED',
  },

  unknown: {
    code: 'unknown',
    textCode: 'PROJECT.UNKNOWN_STATUS',
  },
}

export const ProjectsStatuses = [
  ProjectsStatusesEnum.any,
  // ProjectsStatusesEnum.moderation,
  ProjectsStatusesEnum.reservation,
  ProjectsStatusesEnum.financing,
  ProjectsStatusesEnum.completed,
]

export const ProjectNamesLanguages = [
  {
    code: 'nameEn',
    text: 'PROJECT.NAME_LANG_EN',
  },
  {
    code: 'nameRu',
    text: 'PROJECT.NAME_LANG_RU',
  },
  {
    code: 'nameZhHans',
    text: 'PROJECT.NAME_LANG_CH',
  },
]

export const ProjectDescriptionLanguages = [
  {
    code: 'descriptionEn',
    text: 'PROJECT.DESCRIPTION_LAND_EN',
  },
  {
    code: 'descriptionRu',
    text: 'PROJECT.DESCRIPTION_LAND_RU',
  },
  {
    code: 'descriptionZhHans',
    text: 'PROJECT.DESCRIPTION_LAND_CH',
  },
]