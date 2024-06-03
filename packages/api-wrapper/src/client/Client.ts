import { AlbumManager } from './managers/AlbumManager';
import { ArtistManager } from './managers/ArtistManager';
import { RestManager } from './managers/RestManager';
import { TrackManager } from './managers/TrackManager';

export interface ClientOptions {
  /**
   * The API URL to use. Defaults to `https://ws.audioscrobbler.com/2.0/`.
   */
  apiUrl: string;
}

/**
 * Represents a client for interacting with the Last.fm API.
 */
export class Client {
  public options: ClientOptions;

  public artists: ArtistManager;
  public albums: AlbumManager;
  public tracks: TrackManager;
  public rest: RestManager;

  /**
   * Creates a new Client instance.
   *
   * @param token - The Last.fm API token.
   * @param options - Optional client options.
   */
  public constructor(
    public token: string,
    options: Partial<ClientOptions> = {}
  ) {
    this.options = {
      apiUrl: 'https://ws.audioscrobbler.com/2.0/',
      ...options
    };

    this.setupManagers();
  }

  private setupManagers() {
    this.artists = new ArtistManager(this);
    this.albums = new AlbumManager(this);
    this.tracks = new TrackManager(this);
    this.rest = new RestManager(this);
  }
}
