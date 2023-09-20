import type { APIArtist, APIImage, ArtistBasicInfo, StringBoolean } from '../../payloads';

/**
 * Represents a response from the `artist.getinfo` method
 */
export interface APIGetArtistInfo {
  artist: APIArtist;
}

/**
 * Represents a response from the `artist.getsimilar` method
 */
export interface APIGetSimilarTrack {
  similarartists: {
    artist: (ArtistBasicInfo & {
      /**
       * The image for the artist
       */
      image: APIImage[];

      // In similartracks, match is a number, but here it's a string
      /**
       * The match percentage of the track. This is a number between 0 and 1
       */
      match: string;
      /**
       * Whether the artist is streamable
       */
      streamable: StringBoolean;
    })[];
  };
}
