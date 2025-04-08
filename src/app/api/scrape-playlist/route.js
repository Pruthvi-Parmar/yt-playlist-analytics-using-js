import { PlaywrightCrawler, Dataset } from "crawlee"
import { v4 as uuidv4 } from "uuid"

// This is adapted from the Next.js API route
// In a Vite project, this would need to be a separate backend service
// For demo purposes, we'll keep it here but it won't be used directly

export async function scrapePlaylist(playlistUrl) {
  if (!playlistUrl) {
    throw new Error("Playlist URL is required")
  }

  const playlistId = new URL(playlistUrl).searchParams.get("list")
  if (!playlistId) {
    throw new Error("Invalid playlist URL")
  }

  const uuid = uuidv4()
  const dataset = await Dataset.open(`playlist-${uuid}`)

  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: 50,
    async requestHandler({ request, page, log }) {
      log.info(`Processing ${request.url}...`)

      await page.waitForSelector("#contents ytd-playlist-video-renderer", {
        timeout: 30000,
      })

      // Scroll to load all videos
      await page.evaluate(async () => {
        while (true) {
          const oldHeight = document.body.scrollHeight
          window.scrollTo(0, document.body.scrollHeight)
          await new Promise((resolve) => setTimeout(resolve, 2000))
          if (document.body.scrollHeight === oldHeight) break
        }
      })

      const videos = await page.$$eval("#contents ytd-playlist-video-renderer", (elements) => {
        return elements.map((el) => {
          const title = el.querySelector("#video-title")?.textContent?.trim() || ""
          const viewsText = el.querySelector("#video-info span")?.textContent?.trim() || ""
          const thumbnail = el.querySelector("img")?.src || ""

          const viewsMatch = viewsText.match(/^([\d,.]+[KMB]?)\s*views?$/i)
          let views = 0
          if (viewsMatch) {
            const viewString = viewsMatch[1].toUpperCase().replace(/,/g, "")
            if (viewString.endsWith("K")) views = Number.parseFloat(viewString.replace("K", "")) * 1000
            else if (viewString.endsWith("M")) views = Number.parseFloat(viewString.replace("M", "")) * 1000000
            else if (viewString.endsWith("B")) views = Number.parseFloat(viewString.replace("B", "")) * 1000000000
            else views = Number.parseInt(viewString)
          }

          return { title, views, thumbnail }
        })
      })

      log.info(`Found ${videos.length} videos in the playlist`)

      await dataset.pushData({ videos })
    },

    failedRequestHandler({ request, log }) {
      log.error(`Request ${request.url} failed too many times.`)
    },
  })

  try {
    // Use a unique key for the request to bypass caching
    await crawler.run([{ url: playlistUrl, uniqueKey: `${playlistUrl}:${uuid}` }])

    const results = await dataset.getData()
    const videos = results.items[0]?.videos || []

    // Limit to 20 videos for better chart readability if there are too many
    const limitedVideos = videos.length > 20 ? videos.slice(0, 20) : videos

    // Create graph data with shortened titles for better display
    const graphData = limitedVideos.map((video, index) => ({
      name: `Video ${index + 1}`,
      views: video.views,
      title: video.title.length > 30 ? video.title.substring(0, 30) + "..." : video.title,
    }))

    const playlistData = {
      videoList: videos,
      graphData: graphData,
    }

    await dataset.drop()

    return playlistData
  } catch (error) {
    console.error("Crawling failed:", error)
    await dataset.drop()
    throw new Error("An error occurred while scraping the playlist")
  }
}
