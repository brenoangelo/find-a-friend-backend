export class OrgEmailAlreadyExistsError extends Error {
  constructor() {
    super('Org E-mail already exists')
  }
}
