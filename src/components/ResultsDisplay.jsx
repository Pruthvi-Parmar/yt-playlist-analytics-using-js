import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { BarChartIcon, ListIcon, TrendingUpIcon } from "lucide-react"
import VideoList from "./VideoList"
import ViewsChart from "./ViewsChart"
import AreaViewsChart from "./AreaViewsChart"

function ResultsDisplay({ videoData, graphData }) {
  // Add some console logs to debug the data
  console.log("Video Data:", videoData)
  console.log("Graph Data:", graphData)

  return (
    <div className="mt-8 max-w-5xl mx-auto">
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            <span>Bar Chart</span>
          </TabsTrigger>
          <TabsTrigger value="area" className="flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4" />
            <span>Area Chart</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <ListIcon className="h-4 w-4" />
            <span>Video List</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>View Count Analysis</CardTitle>
              <CardDescription>Visual representation of view counts across videos in the playlist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {graphData && graphData.length > 0 ? (
                  <ViewsChart data={graphData} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No chart data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Area Chart</CardTitle>
              <CardDescription>View trends and patterns with this interactive area visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {graphData && graphData.length > 0 ? (
                  <AreaViewsChart data={graphData} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No chart data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Video List</CardTitle>
              <CardDescription>Detailed list of videos in the playlist with view counts</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoList videos={videoData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ResultsDisplay
