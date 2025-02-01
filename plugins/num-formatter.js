class NumFormatter {
  constructor(ctx) {
    this.ctx = ctx
  }

  formatToThousand(value) {
    let num
    let decimals
    if (value?.toString()?.split('.')[1]) {
      ;[num, decimals] = value?.toString()?.split('.') || ''
    } else {
      num = value
    }

    const copy = num ? num.toString().split('').reverse().join('') : ''

    const size = 3
    const parts = []
    for (let i = 0; i < copy.length; i += size) {
      parts.push(copy.slice(i, i + size))
    }

    const output = parts.join(' ')
    const formattedNum = output.split('').reverse().join('')
    return decimals ? `${formattedNum}.${decimals}` : formattedNum
  }

  formatWithUSDT(value) {
    if (!value) return ''

    // Format the value using the existing method
    const formattedValue = this.formatToThousand(value)

    // Check if it already has 'USDT' appended
    return formattedValue.includes('USDT')
      ? formattedValue
      : `${formattedValue} USDT`
  }
}

export default (ctx, inject) => {
  const convertor = new NumFormatter(ctx)
  ctx.$numFormatter = convertor
  inject('numFormatter', convertor)
}
