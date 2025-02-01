class ModalFactory {
  constructor(ctx) {
    this.ctx = ctx
  }

  open(item) {
    this.ctx.store.commit('modal/OPEN_MODAL', item)
  }

  close(id) {
    this.ctx.store.commit('modal/CLOSE_MODAL', id)
  }
}

export default (context, inject) => {
  const factory = new ModalFactory(context)
  context.$modal = factory
  inject('modal', factory)
}
