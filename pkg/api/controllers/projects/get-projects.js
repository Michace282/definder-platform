import { GetApiRequest } from '~/pkg/api/base'

export class GetProjects extends GetApiRequest {
  constructor(context, data = {}) {
    data = { ...data, pageSize: data.pageSize || 6 }

    const url = '/projects/'

    super(context, url, data)
  }
}
