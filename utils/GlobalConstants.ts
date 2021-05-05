export const refresh = 'refresh-token';
export const host = process.env.NEXT_PUBLIC_SERVER_PATH;
export const graphQLEndpoint = `${
  host ? host : 'https://dev.codeiris.dev'
}/graphql`;
export const refreshUrl = `${
  host ? host : 'https://dev.codeiris.dev'
}/auth/refresh-token`;
