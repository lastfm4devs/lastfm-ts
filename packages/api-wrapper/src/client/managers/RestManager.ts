import querystring from 'node:querystring';
import type { APIError } from '@lastfm-ts/api-types/src/rest';
import type { Client } from '../Client';

export class RestManager {
  public constructor(public client: Client) {}

  /**
   * Makes a request to the Last.fm API.
   *
   * @param method - The HTTP method ('GET', 'PATCH', or 'POST').
   * @param endpoint - The API endpoint.
   * @param params - Query parameters for the request.
   * @returns A promise that resolves with the API response.
   */
  public async request<T extends Record<string, any>>(
    method: 'GET' | 'PATCH' | 'POST',
    endpoint: `${string}.${string}`,
    params: Record<string, number | string> = {},
  ): Promise<T> {
    const parsedQuerystring = querystring.stringify({
      method: endpoint,
      api_key: this.client.token,
      format: 'json',
      ...params,
    });

    const url = `${this.client.options.apiUrl}?${parsedQuerystring}`;

    const request = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'lastfm-ts (https://github.com/lastfm-ts/lastfm-ts, v1.0.0)',
      },
    });

    const response = (await request.json()) as APIError | T;

    if ('error' in response) {
      throw new Error(response.message);
    }

    return response;
  }
}
