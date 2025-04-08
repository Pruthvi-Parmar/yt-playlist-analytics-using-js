"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { YoutubeIcon, Loader2 } from "lucide-react"

function PlaylistForm({ onSubmit, isLoading }) {
  const [playlistUrl, setPlaylistUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(playlistUrl)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <YoutubeIcon className="h-5 w-5 text-red-500" />
          <span>YouTube Playlist Analyzer</span>
        </CardTitle>
        <CardDescription>Enter a YouTube playlist URL to analyze view counts and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="https://www.youtube.com/playlist?list=..."
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Playlist"
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Example: https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default PlaylistForm
