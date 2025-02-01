import { extend, localize } from 'vee-validate'
import {
  required,
  confirmed,
  min,
  max,
  alpha,
  digits,
  numeric,
  length,
} from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'
import ru from 'vee-validate/dist/locale/ru.json'
import ch from 'vee-validate/dist/locale/zh_CN.json'

export default function ({ app, $date }) {
  extend('required', required)
  extend('confirmed', confirmed)
  extend('min', min)
  extend('max', max)
  extend('alpha', alpha)
  extend('digits', digits)
  extend('numeric', numeric)
  extend('length', length)

  extend('nameRequired', {
    ...required,
    message: app.i18n.t('VALIDATION.NAME_REQUIRED'),
  })

  extend('descriptionRequired', {
    ...required,
    message: app.i18n.t('VALIDATION.DESCRIPTION_REQUIRED'),
  })

  extend('name', {
    validate: (value) => {
      return value.match(/^[a-zA-Z0-9_ ]+$/)
    },
    message: app.i18n.t('VALIDATION.NAME'),
  })

  extend('email', {
    validate: (value) => {
      return value.match(
        /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
      )
    },
    message: app.i18n.t('VALIDATION.EMAIL'),
  })

  extend('password', {
    validate: (value) => {
      return value.match(/(?=.*[A-Z]).{1,}(?=.*[a-z]).{1,}(?=.*[0-9]).{1,}/)
    },
    message: app.i18n.t('VALIDATION.PASSWORD'),
  })

  extend('telegram', {
    validate: (value) => {
      return value.match(
        /^.*\B@(?=\w{5,33}\b)[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/
      )
    },
    message: app.i18n.t('VALIDATION.TELEGRAM'),
  })

  extend('telephone', {
    validate: (value) => {
      return value.match(/^(\+\*?[0-9\s]{1,25})*$/)
    },
    message: app.i18n.t('VALIDATION.TELEPHONE'),
  })

  extend('website', {
    validate: (value) => {
      return value.match(/https?:\/\/(.+)\.(.+)/)
    },
    message: app.i18n.t('VALIDATION.WEBSITE', { field: '{_field_}' }),
  })

  extend('transaction-link', {
    validate: (value) => {
      return value.match(/https?:\/\/(.+)\.(.+)/)
    },
    message: app.i18n.t('VALIDATION.TRANSACTION_LINK', { field: '{_field_}' }),
  })

  extend('minmax', {
    validate: (array, minmax) => {
      return array.length >= minmax.min && array.length <= minmax.max
    },
    params: ['min', 'max'],
    message: app.i18n.t('VALIDATION.MIN_MAX', { min: '{min}', max: '{max}' }),
  })

  extend('dntwallet', {
    validate: (value) => {
      return value.match(/^0x[a-fA-F0-9]{40}$/)
    },
    message: app.i18n.t('VALIDATION.DNT_WALLET', { field: '{_field_}' }),
  })

  extend('biggerThanStart', {
    validate: (value, { start }) => {
      if (!start || start === 'null' || start === 'undefined') {
        return true
      }

      const startDate = new Date(start)
      return (
        $date.formatToSystemDate(value) > $date.formatToSystemDate(startDate)
      )
    },
    params: ['start'],
    message: app.i18n.t('VALIDATION.BIGGER_THAN_START', { field: '{_field_}' }),
  })

  extend('regexp', {
    validate: (value, { exp }) => {
      const regexp = new RegExp(exp)
      return regexp.test(value)
    },
    params: ['exp'],
    message: app.i18n.t('VALIDATION.COIN_WALLET', { field: '{_field_}' }),
  })

  extend('unique', {
    validate: (value, { array, reduce, getOption }) => {
      let counter = 0
      for (const item of array) {
        if (reduce(value) === getOption(item)) {
          counter++
        }

        if (counter > 1) {
          break
        }
      }

      if (counter <= 1) {
        return true
      }
    },
    params: ['array', 'reduce', 'getOption'],
    message: app.i18n.t('VALIDATION.UNIQUE', { field: '{_field_}' }),
  })

  // extend('requiredFile', {
  //   validate: (value) => {
  //     if (
  //       value === null ||
  //       value === undefined ||
  //       (Array.isArray(value) && value.length === 0) ||
  //       value === false
  //     ) {
  //       return false
  //     }
  //
  //     return !!String(value).trim().length
  //   },
  //   message: 'requiredFile',
  // })

  // extend('futureDate', {
  //   validate: (value) => {
  //     return value > new Date()
  //   },
  //   message: 'The date must be in future',
  // })

  // extend('addressRequired', {
  //   validate: (value, address) => {
  //     return address?.data?.isAddressCorrect
  //   },
  //   params: ['data'],
  //   message: 'Selected address is incorrect',
  // })

  // Object.keys(rules).forEach((rule) => {
  //   extend(rule, rules[rule])
  // })

  // extend('is', {
  //   validate: (value, { compare }) => {
  //     return value.match(/^[a-zA-Z0-9_]+$/)
  //   },
  //   params: ['compare', 'additional'],
  //   message: 'Message {additional}',
  // })

  // Object.keys(rules).forEach(rule => {
  // extend(rule, rules[rule]);
  // });

  // localize('en', en)
  const locale = app.i18n.localeProperties.code || 'en'
  let lang
  if (locale === 'ru') {
    lang = ru
  } else if (locale === 'ch') {
    lang = ch
  } else {
    lang = en
  }
  localize(`${locale}`, lang)
}
