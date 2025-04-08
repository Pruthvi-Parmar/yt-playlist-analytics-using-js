# YouTube Playlist Analyzer

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install shadcn/ui components:
   ```bash
   npx shadcn-ui@latest init
   ```
4. Add required components:
   ```bash
   npx shadcn-ui@latest add button input card
   ```

## Key Features

- Server-side YouTube playlist scraping using Crawlee
- Client-side playlist data visualization
- Responsive design using Tailwind CSS

## Important Files

- `app/page.jsx`: Main component with UI and client-side logic
- `app/api/scrape-playlist/route.ts`: API route for playlist scraping


## UUID Strategy

To prevent Crawlee from caching requests, we use a UUID for each scraping operation:

1. Generate a UUID for each request
2. Use the UUID in the Crawlee request's `uniqueKey`
3. Include the UUID in the dataset name

This ensures that each scraping operation is treated as unique, even for the same playlist URL.

## Caveats and Notes

1. The app requires a server environment capable of running Playwright for scraping.
2. Ensure you have the necessary dependencies installed (`crawlee`, `uuid`).
3. The scraping process may take some time for large playlists.
4. Be mindful of YouTube's terms of service when using this app.
5. The app uses shadcn/ui components, which are built on top of Tailwind CSS. Make sure Tailwind is properly configured in your project.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

