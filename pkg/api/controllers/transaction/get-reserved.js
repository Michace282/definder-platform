import { GetApiRequest } from '~/pkg/api/base'

export class GetReserved extends GetApiRequest {
  constructor(ctx, data) {
    const id = data.id
    const body = {
      page: data.page ?? undefined,
      pageSize: data.pageSize ?? 100,
    }

    const url = `/transactions/${id}/reserved/`
    super(ctx, url, body)
  }
}
