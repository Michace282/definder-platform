import { GetApiRequest } from '~/pkg/api/base'

export class GetById extends GetApiRequest {
  constructor(context, data = {}) {
    const projectId = data.id
    const url = `/projects/${projectId}/`

    super(context, url)
  }
}
