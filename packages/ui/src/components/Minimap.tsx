import React from "react"
import { Annotation, ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

interface MinimapProps {
  label: string
  lnglat: [number, number]
}

export const Minimap = ({ label, lnglat }: MinimapProps) => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        //rotate: [-10.0, -52.0, 0],
        center: lnglat,
        scale: 1800
      }}>
      <Geographies geography={geoUrl}>
        {({ geographies }: any) =>
          geographies.map((geo: any) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: "#D6D6DA",
                  stroke: "#FF5533",
                  outline: "none",
                  strokeWidth: 1,
                }
              }}
            />
          ))
        }
      </Geographies>
      <Annotation
        subject={lnglat}
        dx={-90}
        dy={-30}
        curve={-1}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 12,
          strokeLinecap: "round"
        }}
      >
        <text x="400" y="-50" fontSize={'60'} textAnchor="end" alignmentBaseline="middle" fill="black" >
          {label}
        </text>
      </Annotation>
    </ComposableMap>
  )
}