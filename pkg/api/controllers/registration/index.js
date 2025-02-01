import { ApiFactory } from '~/pkg/api/api-factory'
import { Register } from '~/pkg/api/controllers/registration/register'
import { VerifyEmail } from '~/pkg/api/controllers/registration/verify-email'
import { ResendVerificationEmail } from '~/pkg/api/controllers/registration/resend-verification-email'

export class RegistrationController extends ApiFactory {
  async register(data) {
    const request = new Register(this.context, data)
    return await request.fetch(this.axios)
  }

  async verifyEmail(data) {
    const request = new VerifyEmail(this.context, data)
    return await request.fetch(this.axios)
  }

  async resendVerificationEmail(data) {
    const request = new ResendVerificationEmail(this.context, data)
    return await request.fetch(this.axios)
  }
}
