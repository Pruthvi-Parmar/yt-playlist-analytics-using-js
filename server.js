// This is a simple Express server that can be used to handle API requests
// You would need to run this separately from your Vite app
// Install express with: npm install express cors

import express from "express"
import cors from "cors"
import { scrapePlaylist } from "./src/app/api/scrape-playlist/route.js"

const app = express()
const PORT = process.env.PORT || 3001

// Configure CORS to allow requests from any origin during development
app.use(cors())
app.use(express.json())

// Add a simple health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

app.post("/api/scrape-playlist", async (req, res) => {
  try {
    const { playlistUrl } = req.body

    if (!playlistUrl) {
      return res.status(400).json({ error: "Playlist URL is required" })
    }

    console.log("Received request to scrape playlist:", playlistUrl)

    const data = await scrapePlaylist(playlistUrl)

    console.log(`Successfully scraped playlist with ${data.videoList.length} videos`)

    res.json(data)
  } catch (error) {
    console.error("API Error:", error)
    res.status(500).json({ error: error.message || "An unknown error occurred" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check available at: http://localhost:${PORT}/api/health`)
  console.log(`API endpoint available at: http://localhost:${PORT}/api/scrape-playlist`)
})
