/**
 * Some Last.fm boolean values are represented as strings.
 * '0' means false. '1' means true.
 */
export type StringBoolean = '0' | '1';

export interface Entity {
  /**
   * The unique identifier of the entity on Last.fm
   */
  id?: string;
  /**
   * The unique identifier of the entity on MusicBrainz
   */
  mbid?: string;
}
