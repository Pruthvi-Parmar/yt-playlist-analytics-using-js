import * as React from "react"
import { cn } from "../../lib/utils"

const ChartContainer = React.forwardRef(({ children, config, className, ...props }, ref) => {
  const colors = React.useMemo(() => {
    if (!config) return {}
    return Object.entries(config).reduce((acc, [key, value]) => {
      if (value.color) {
        acc[`--color-${key}`] = value.color
      }
      return acc
    }, {})
  }, [config])

  return (
    <div ref={ref} className={cn("h-full w-full", className)} style={colors} {...props}>
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef(({ content, cursor = true, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {content}
      {cursor && <div className="recharts-tooltip-cursor" />}
    </div>
  )
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef(
  ({ className, indicator = "dot", formatter, labelKey, hideLabel = false, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
        <div className="grid gap-2">
          {!hideLabel && props.label && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">
                {labelKey && props.payload?.[0]?.payload?.[labelKey] ? props.payload[0].payload[labelKey] : props.label}
              </span>
            </div>
          )}
          <div className="grid gap-1">
            {props.payload?.map((entry, index) => {
              const color = entry.color || entry.stroke
              const value = formatter ? formatter(entry.value, entry.name) : entry.value

              return (
                <div key={`item-${index}`} className="flex items-center gap-2">
                  {indicator === "dot" && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />}
                  {indicator === "line" && <div className="h-1 w-4 rounded-full" style={{ backgroundColor: color }} />}
                  <span className="text-sm font-medium text-muted-foreground">{entry.name}</span>
                  <span className="ml-auto text-sm font-medium">{value}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
