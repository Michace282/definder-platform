import { GetApiRequest } from '~/pkg/api/base'

export class GetUserProjectList extends GetApiRequest {
  constructor(ctx, data = {}) {
    const id = data.id
    const body = {
      page: data.page ?? undefined,
      pageSize: data.pageSize ?? 100,
    }

    const url = `/projects/${id}/get-user-project-list/`
    super(ctx, url, body)
  }
}
