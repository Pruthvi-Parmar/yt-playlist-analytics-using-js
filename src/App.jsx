"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "./components/theme-provider"
import PlaylistForm from "./components/PlaylistForm"
import ResultsDisplay from "./components/ResultsDisplay"
import { fetchPlaylistData, checkServerStatus } from "./lib/utils"
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

function App() {
  const [videoData, setVideoData] = useState([])
  const [graphData, setGraphData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [serverStatus, setServerStatus] = useState({ checked: false, running: false, message: "" })

  // Check server status on component mount
  useEffect(() => {
    const checkServer = async () => {
      const status = await checkServerStatus()
      setServerStatus({ checked: true, ...status })
    }

    checkServer()
  }, [])

  const handleAnalyzePlaylist = async (playlistUrl) => {
    setIsLoading(true)
    setError(null)

    try {
      // Call our API service
      const response = await fetchPlaylistData(playlistUrl)
      setVideoData(response.videoList)
      setGraphData(response.graphData)
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to analyze playlist. Please check the URL and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">YouTube Playlist Analyzer</h1>
            <p className="text-muted-foreground">Analyze view counts and performance of YouTube playlists</p>
          </header>

          {serverStatus.checked && (
            <div className="mb-6">
              {serverStatus.running ? (
                <Alert variant="success" className="bg-green-500/10 border-green-500/50">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle>Server Connected</AlertTitle>
                  <AlertDescription>The backend server is running and ready to analyze playlists.</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Server Not Connected</AlertTitle>
                  <AlertDescription>
                    The backend server is not running. Please start the server with "npm run server" in a separate
                    terminal. Mock data will be used instead.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <PlaylistForm onSubmit={handleAnalyzePlaylist} isLoading={isLoading} />

          {error && <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mt-6">{error}</div>}

          {videoData.length > 0 && <ResultsDisplay videoData={videoData} graphData={graphData} />}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
