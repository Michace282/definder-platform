import { GetApiRequest } from '~/pkg/api/base'

export class GetProfile extends GetApiRequest {
  constructor(context) {
    const url = '/profile/account/'
    super(context, url)
  }
}
