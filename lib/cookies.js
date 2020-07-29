import Cookies from 'universal-cookie'

export default class extends Cookies {
  constructor(ctx) {
    super(ctx.req && ctx.req.headers && ctx.req.headers.cookie)
  }
}
