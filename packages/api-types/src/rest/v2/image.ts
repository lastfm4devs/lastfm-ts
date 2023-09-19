/**
 * Represents a Last.fm image
 */
export interface Image {
  /**
   * The URL of the image
   */
  '#text': string;
  /**
   * The size of the image
   */
  size: 'extralarge' | 'large' | 'medium' | 'mega' | 'small';
}
