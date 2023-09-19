/**
 * The error object returned by the Last.fm API
 */
export interface APIError {
  /**
   * The error code
   */
  error: number;
  /**
   * The links to the last.fm documentation
   */
  links: string[];
  /**
   * The error message
   */
  message: string;
}
