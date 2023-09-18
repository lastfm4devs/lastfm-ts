# Last.fm TypeScript API Wrapper

A powerful TypeScript library for interacting with the Last.fm API.

## Example

### API Wrapper

```typescript
import { Client } from '@lastfm-ts/wrapper';

const client = new Client('API_KEY');

const trackData = await client.tracks.get('DROELOE', 'Foolish Fish');
console.log(
  `${trackData.name} from ${trackData.artist.name} on album '${trackData.album.name}' has ${trackData.playcount} plays.`,
);
```

## Getting Started (contributing)

1. Clone the repository using `git clone https://github.com/lastfm-ts/lastfm-ts`
2. Navigate to the cloned repository using `cd lastfm-ts`
3. Install the dependencies using `pnpm install`
4. Build the monorepo packages using `pnpm build`

## NPM Scripts

The monorepo comes with the following npm scripts:

- `build`: Compiles all the packages in the monorepo.
- `dev`: Initiates the development server with hot-reloading enabled.
- `lint`: Ensures codebase formatting adheres to Prettier and ESLint standards.
- `format`: Automatically formats and rectifies codebase issues using Prettier and ESLint.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
