class DateFormatter {
  constructor(ctx) {
    this.ctx = ctx
  }

  formatToShort(date) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }

    return new Date(date).toLocaleDateString(this.langCode, options)
  }

  formatToLong(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return new Date(date).toLocaleDateString(this.langCode, options)
  }

  get langCode() {
    return this.ctx?.i18n?.localeProperties?.iso
  }
}

export default (ctx, inject) => {
  const convertor = new DateFormatter(ctx)
  ctx.$date = convertor
  inject('date', convertor)
}
