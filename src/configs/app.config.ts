export type AppConfig = {
  authenticatedEntryPath: string
  unAuthenticatedEntryPath: string
  tourPath: string
}

const appConfig: AppConfig = {
  authenticatedEntryPath: '/seller',
  unAuthenticatedEntryPath: '/login',
  tourPath: '/home',
}

export default appConfig
