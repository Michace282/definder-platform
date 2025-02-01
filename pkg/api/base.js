export class BaseApiFactory {
  constructor(context, axios) {
    this.addRequestHandler(axios)

    this.context = context
    this.axios = axios
  }

  addRequestHandler(axios) {
    axios.onRequest((config) => this.configureRequest(config))
  }

  configureRequest(config) {
    const method = config.method.toUpperCase()
    console.warn(`[${method}] Making request to ${config.url}`)

    const token = this.context.$auth.strategy.token.get()
    if (token) {
      config.headers.common.Authorization = token
    }

    const language = this.context.i18n.localeProperties.code
    if (language) {
      config.headers.common['Accept-Language'] = language
    }

    return config
  }
}

export class BaseApiRequest {
  constructor(context, method, url) {
    if (!url) throw new Error('path is not provided')

    this.url = url
    this.method = method

    this.app = context
    this.nuxtError = context.error
  }

  async fetch(axios) {
    await console.warn('method is not provided')
  }

  async handleErrors(error) {
    const token = this.app.$auth.strategy.token.get()
    const originalRequest = error.config

    if (
      token &&
      error.response.status === 401 &&
      !originalRequest.headers.RepeatRequest
    ) {
      try {
        await this.app.$auth.strategy.refreshTokens()

        originalRequest.headers.Authorization =
          this.app.$auth.strategy.token.get()
        originalRequest.headers.RepeatRequest = true

        return await this.app.$axios(originalRequest)
      } catch (e) {
        const status = e?.response?.status
        if (status === 401) {
          await this.reloadPage()
        }

        throw error
      }
    }

    this.displayLogMessage(error)

    throw error
  }

  async reloadPage() {
    if (window && window.location) {
      await window.location.reload()
    }
    await this.app.redirect(this.app.route)
  }

  displayLogMessage(error) {
    if (process.server) {
      console.error({ error })
      throw error
    }

    if (error.response) {
      const messages = []

      const errorStatusTitle = this.translateMessage('TOAST.ERROR_STATUS')
      const errorStatus = `${errorStatusTitle}: ${error.response.status}`
      messages.push(errorStatus)

      const { errorMessage, validationErrors } = error.response.data

      if (errorMessage) {
        this.app.$toast.error(errorMessage)
      }

      if (validationErrors) {
        if (Object.keys(validationErrors).length === 0) {
          return
        }

        for (const key of Object.keys(validationErrors)) {
          const content = validationErrors[key]
          let message
          if (Array.isArray(content)) {
            message = content.join('<br>')
          } else {
            message = content.toString()
          }

          this.app.$toast.error(message)
        }
      }
    } else {
      this.app.$toast.error(`${this.translateMessage('TOAST.REQUEST_ERROR')}`)
      console.error(error)
    }
  }

  translateMessage(message) {
    return this.app.i18n.t(message)
  }
}

export class GetApiRequest extends BaseApiRequest {
  constructor(context, url, params) {
    const method = 'get'
    super(context, method, url)

    this.params = params
  }

  async fetch(axios) {
    try {
      const result = await this.get(axios, this.url, this.params)
      return result.data || result
    } catch (e) {
      const result = await this.handleErrors(e)
      const data = result.data && result.data.data
      return data || result
    }
  }

  async get(axios, url, params) {
    return await axios.$get(url, { params })
  }
}

export class ChangeDataApiRequest extends BaseApiRequest {
  constructor(context, method, url, data = null) {
    super(context, method, url)

    this.data = data
    this.method = method
  }

  async fetch(axios) {
    try {
      const result = await this.request(axios)
      return result.data || result
    } catch (e) {
      const result = await this.handleErrors(e)
      const data = result.data && result.data.data
      return data || result
    }
  }

  async request(axios) {
    return await this.requestMethod(axios)
  }

  async requestMethod(axios) {
    const url = this.url
    const data = this.data
    const method = this.method
    return await axios[`$${method}`](url, data)
  }
}

export class PostApiRequest extends ChangeDataApiRequest {
  constructor(context, url, data) {
    const method = 'post'
    super(context, method, url, data)
  }

  async request(axios) {
    return await this.post(axios)
  }

  async post(axios) {
    return await this.requestMethod(axios)
  }
}

export class PutApiRequest extends ChangeDataApiRequest {
  constructor(context, url, data) {
    const method = 'put'
    super(context, method, url, data)
  }

  async request(axios) {
    return await this.put(axios)
  }

  async put(axios) {
    return await this.requestMethod(axios)
  }
}

export class DeleteApiRequest extends ChangeDataApiRequest {
  constructor(context, url, data) {
    const method = 'delete'
    super(context, method, url, data)
  }

  async request(axios) {
    return await this.delete(axios)
  }

  async delete(axios) {
    return await this.requestMethod(axios)
  }
}
