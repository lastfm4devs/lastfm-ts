import type { APIPartialSearchTrack, APITrack } from '../../payloads';

/**
 * Represents a response from the `track.getinfo` method
 */
export interface APIGetTrackInfo {
  track: APITrack;
}

/**
 * Represents a response from the `track.search` method
 */
export interface APISearchTrack {
  results: {
    'opensearch:itemsPerPage': string;
    'opensearch:startIndex': string;
    'opensearch:totalResults': string;
    trackmatches: {
      track: APIPartialSearchTrack[];
    };
  };
}

/**
 * Represents a response from the `track.getsimilar` method
 */
export interface APIGetSimilarTrack {
  similartracks: {
    track: (Omit<APITrack, 'album' | 'listeners'> & {
      /**
       * The match percentage of the track. This is a number between 0 and 1
       */
      match: number;

      // For some reason, this endpoint returns playcount as a number
      /**
       * The number of plays the track has
       */
      playcount: number;
    })[];
  };
}
