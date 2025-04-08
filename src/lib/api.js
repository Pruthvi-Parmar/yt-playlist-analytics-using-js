

export async function fetchPlaylistData(playlistUrl) {
    // Check if URL is valid
    if (!playlistUrl.includes("youtube.com/playlist") && !playlistUrl.includes("youtu.be")) {
      throw new Error("Invalid YouTube playlist URL")
    }
  
    console.log("Attempting to fetch playlist data:", playlistUrl)
  
    try {
      // Use a relative URL which will be handled by the Vite proxy
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
      console.log("Successfully fetched playlist data")
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
        {
          title: "Introduction to Web Development",
          views: 1250000,
          thumbnail: "/placeholder.svg?height=120&width=160",
        },
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
  