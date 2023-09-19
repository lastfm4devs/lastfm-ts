import type { APIPartialTrack, APITrack } from '../../payloads';

/**
 * Represents a response from the `track.getinfo` method
 */
export type APIGetTrack = APITrack;

/**
 * Represents a response from the `track.search` method
 */
export type APISearchTrack = APIPartialTrack[];
