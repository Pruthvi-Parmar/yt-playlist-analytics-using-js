import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatViews } from "../lib/utils"

function ViewsChart({ data }) {
  // Ensure we have data to display
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} interval={0} />
        <YAxis tickFormatter={(value) => formatViews(value)} width={60} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [formatViews(value), "Views"]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
          itemStyle={{ color: "var(--foreground)" }}
        />
        <Bar
          dataKey="views"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ViewsChart
