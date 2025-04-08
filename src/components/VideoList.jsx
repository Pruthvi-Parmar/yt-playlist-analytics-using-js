import { ScrollArea } from "./ui/scroll-area"
import { formatViews } from "../lib/utils"

function VideoList({ videos }) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <ul className="space-y-4">
        {videos.map((video, index) => (
          <li key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0 relative overflow-hidden rounded-md w-24 h-16">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-1 rounded-tl">
                #{index + 1}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base line-clamp-2">{video.title}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-muted-foreground">{formatViews(video.views)} views</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

export default VideoList
