export function debounce(func, delay = 500) {
  let timeout = null

  return function (...args) {
    const callback = func.bind(this, ...args)

    return new Promise((resolve, reject) => {
      clearTimeout(timeout)

      timeout = setTimeout(async () => {
        try {
          resolve(await callback())
        } catch (e) {
          reject(e)
        }
      }, delay)
    })
  }
}
