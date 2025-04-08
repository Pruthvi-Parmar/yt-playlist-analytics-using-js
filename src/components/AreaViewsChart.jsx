import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatViews } from "../lib/utils"

function AreaViewsChart({ data }) {
  // Ensure we have data to display
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} interval={0} />
        <YAxis tickFormatter={(value) => formatViews(value)} width={60} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [formatViews(value), "Views"]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
          itemStyle={{ color: "var(--foreground)" }}
        />
        <Area
          type="monotone"
          dataKey="views"
          stroke="hsl(var(--chart-1))"
          fillOpacity={1}
          fill="url(#colorViews)"
          activeDot={{ r: 6 }}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaViewsChart
