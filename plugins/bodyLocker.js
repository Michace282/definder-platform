class Locker {
  constructor() {
    this.isLocked = false
  }

  lock() {
    const scrollWidth = window.innerWidth - document.body.clientWidth
    document.body.style.paddingRight = `${scrollWidth}px`
    document.body.style.overflow = 'hidden'

    this.isLocked = true
  }

  unlock() {
    document.body.style.paddingRight = null
    document.body.style.overflow = null

    this.isLocked = false
  }
}

export default (context, inject) => {
  const locker = new Locker()
  context.$bodyLocker = locker
  inject('bodyLocker', locker)
}
