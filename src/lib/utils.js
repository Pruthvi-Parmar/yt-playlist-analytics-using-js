
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ")
}


export function formatViews(views) {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  } else {
    return views.toString()
  }
}


export async function checkServerStatus() {
  try {
    const response = await fetch("/api/health")
    if (response.ok) {
      return { running: true, message: "Server is running" }
    } else {
      return { running: false, message: "Server is not responding correctly" }
    }
  } catch (error) {
    console.log("Server check failed:", error)
    return { running: false, message: "Server is not running" }
  }
}

// Fetch playlist data from the API
export async function fetchPlaylistData(playlistUrl) {
  if (!playlistUrl) {
    throw new Error("Playlist URL is required")
  }

  try {
    const response = await fetch("/api/scrape-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlistUrl }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error:", response.status, errorText)
      throw new Error(`API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching playlist data:", error)

    // If we're in development mode and the error suggests the server isn't running,
    // fall back to mock data
    if (import.meta.env.DEV) {
      console.log("Falling back to mock data in development mode")
      return getMockData()
    }

    throw error
  }
}

function getMockData() {
  // Return mock data
  return {
    videoList: [
      { title: "Introduction to Web Development", views: 1250000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "HTML Fundamentals", views: 980000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "CSS Styling Basics", views: 875000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "JavaScript for Beginners", views: 1500000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "Building Your First Website", views: 750000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "Responsive Design Principles", views: 620000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "Working with APIs", views: 930000, thumbnail: "/placeholder.svg?height=120&width=160" },
      { title: "Modern JavaScript Frameworks", views: 1100000, thumbnail: "/placeholder.svg?height=120&width=160" },
    ],
    graphData: [
      { name: "Video 1", views: 1250000 },
      { name: "Video 2", views: 980000 },
      { name: "Video 3", views: 875000 },
      { name: "Video 4", views: 1500000 },
      { name: "Video 5", views: 750000 },
      { name: "Video 6", views: 620000 },
      { name: "Video 7", views: 930000 },
      { name: "Video 8", views: 1100000 },
    ],
  }
}
