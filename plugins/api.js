import Api from '~/pkg/api'

export default (context, inject) => {
  const api = new Api(context)
  context.$api = api
  inject('api', api)
}
