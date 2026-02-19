"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import travelsData from "@/data/travels.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";


type Continent = "Europe" | "Africa" | "NorthAmerica" | "Asia" | "SouthAmerica" | "Oceania";
type TravelFilter = "all" | Continent;

interface TravelEntry {
  id: string;
  title: string;
  location: string;
  country: string;
  continent: Continent;
  dateRange: { start: string; end: string | null };
  description: string;
  highlights?: string[];
  tags?: string[];
  status: "upcoming" | "current" | "past";
  coordinates: [number, number];
  countryCode: string;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Continent color scheme
const continentColors = {
  Europe: {
    primary: "hsl(210,70%,55%)",
    light: "hsl(210,70%,55%,0.2)",
    marker: "hsl(210,70%,60%)",
  },
  Asia: {
    primary: "hsl(15,70%,55%)",
    light: "hsl(15,70%,55%,0.2)",
    marker: "hsl(15,70%,60%)",
  },
  Africa: {
    primary: "hsl(45,70%,55%)",
    light: "hsl(45,70%,55%,0.2)",
    marker: "hsl(45,70%,60%)",
  },
  NorthAmerica: {
    primary: "hsl(120,50%,50%)",
    light: "hsl(120,50%,50%,0.2)",
    marker: "hsl(120,50%,55%)",
  },
  SouthAmerica: {
    primary: "hsl(330,60%,55%)",
    light: "hsl(330,60%,55%,0.2)",
    marker: "hsl(330,60%,60%)",
  },
  Oceania: {
    primary: "hsl(180,60%,50%)",
    light: "hsl(180,60%,50%,0.2)",
    marker: "hsl(180,60%,55%)",
  },
};

const travels: TravelEntry[] = travelsData as TravelEntry[];

// continent display names
const continentDisplayNames: Record<Continent, string> = {
  Europe: "Europe",
  Africa: "Africa",
  NorthAmerica: "North America",
  Asia: "Asia",
  SouthAmerica: "South America",
  Oceania: "Oceania",
};

const WorldMap = ({
  travels,
  onMarkerClick,
  filter,
}: {
  travels: TravelEntry[];
  onMarkerClick: (travel: TravelEntry) => void;
  filter: TravelFilter;
}) => {
  const [zoom, setZoom] = useState(2.5);
  const [center, setCenter] = useState<[number, number]>([15, 35]);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const visitedCountries = useMemo(() => travels.map((t) => t.countryCode), [travels]);

  const filteredTravels = filter === "all"
    ? travels.filter((t) => t.continent !== "NorthAmerica")
    : travels.filter((t) => t.continent === filter && t.continent !== "NorthAmerica");

  // cluster markers based on proximity and zoom level
  const markerGroups = useMemo(() => {
    const groups: { id: string; position: [number, number]; travels: TravelEntry[] }[] = [];
    const processed = new Set<string>();

    // low zoom (≤ 3), cluster within 2 degrees (aggressive)
    // medium zoom (3-8), cluster within 0.5 degrees
    // high zoom (> 8), cluster within 0.05 degree (no clustering)
    const threshold = zoom <= 3 ? 2 : zoom <= 8 ? 0.5 : 0.05;

    filteredTravels.forEach((travel) => {
      if (processed.has(travel.id)) return;

      const nearby = filteredTravels.filter((other) => {
        if (processed.has(other.id) || other.id === travel.id) return false;
        const [lon1, lat1] = travel.coordinates;
        const [lon2, lat2] = other.coordinates;
        const distance = Math.sqrt(Math.pow(lon2 - lon1, 2) + Math.pow(lat2 - lat1, 2));
        return distance < threshold;
      });

      const allInGroup = [travel, ...nearby];
      const avgLon = allInGroup.reduce((sum, t) => sum + t.coordinates[0], 0) / allInGroup.length;
      const avgLat = allInGroup.reduce((sum, t) => sum + t.coordinates[1], 0) / allInGroup.length;

      groups.push({
        id: allInGroup.map(t => t.id).join('-'),
        position: [avgLon, avgLat],
        travels: allInGroup
      });
      allInGroup.forEach((t) => processed.add(t.id));
    });

    return groups;
  }, [filteredTravels, zoom]);

  const handleClusterClick = (group: { id: string; position: [number, number]; travels: TravelEntry[] }) => {
    if (group.travels.length > 1) {

      // bounds of the cluster
      const lons = group.travels.map(t => t.coordinates[0]);
      const lats = group.travels.map(t => t.coordinates[1]);
      const centerLon = (Math.min(...lons) + Math.max(...lons)) / 2;
      const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;

      // zoom in
      setCenter([centerLon, centerLat]);
      setZoom(15);
    } else {
      // single
      onMarkerClick(group.travels[0]);
    }
  };

  const handleResetView = () => {
    setCenter([15, 35]);
    setZoom(2.5);
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setCenter(position.coordinates);
    setZoom(position.zoom);
  };

  return (
    <div className="relative w-full h-full">
      <ComposableMap projection="geoMercator" style={{ width: "100%", height: "100%" }}>
        <ZoomableGroup
          center={center}
          zoom={zoom}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={20}
          translateExtent={[[-200, -100], [800, 600]]}
        >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo: any) => {
              const isVisited = visitedCountries.includes(geo.properties.ISO_A3);
              const visitedTravel = isVisited
                ? travels.find((t) => t.countryCode === geo.properties.ISO_A3)
                : null;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isVisited && visitedTravel
                      ? continentColors[visitedTravel.continent].light
                      : "hsl(0,0%,24%)"
                  }
                  stroke="hsl(0,0%,30%)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      outline: "none",
                      fill: isVisited && visitedTravel
                        ? continentColors[visitedTravel.continent].primary
                        : "hsl(0,0%,26%)",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {markerGroups.map((group) => {
          const mainTravel = group.travels[0];
          const isMulti = group.travels.length > 1;
          const isHovered = hoveredMarker === group.id;

          return (
            <Marker key={group.id} coordinates={group.position}>
              <g
                className="cursor-pointer"
                onMouseEnter={() => !isMulti && setHoveredMarker(group.id)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* cluster marker with ring  */}
                {isMulti ? (
                  <g onClick={() => handleClusterClick(group)}>
                    <circle
                      r={1.2}
                      fill={continentColors[mainTravel.continent].marker}
                      className="transition-all hover:scale-125"
                    />
                    <circle
                      r={2.5}
                      fill="none"
                      stroke={continentColors[mainTravel.continent].marker}
                      strokeWidth={0.4}
                      opacity={0.7}
                      className="transition-all hover:scale-125"
                    />
                  </g>
                ) : (
                  /* single */
                  <g>
                    <circle
                      r={0.5}
                      fill={continentColors[mainTravel.continent].marker}
                      className="transition-all hover:scale-150"
                      onClick={() => handleClusterClick(group)}
                    />
                    {/* label on hover */}
                    {isHovered && (
                      <text
                        x={2}
                        y={-1}
                        textAnchor="start"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "2.5px",
                          fill: continentColors[mainTravel.continent].marker,
                          fontWeight: 400,
                          pointerEvents: "none",
                        }}
                      >
                        {mainTravel.location}
                      </text>
                    )}
                  </g>
                )}
              </g>
            </Marker>
          );
        })}
      </ZoomableGroup>
    </ComposableMap>
    </div>
  );
};

const TravelCard = ({ travel, index }: { travel: TravelEntry; index: number }) => {
  const colors = continentColors[travel.continent];

  return (
    <div
      id={`travel-${travel.id}`}
      className="scroll-mt-24 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
      style={{
        borderLeft: `4px solid ${colors.primary}`,
      }}
    >
      {/* placeholder*/}
      <div
        className="h-48 relative"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.marker})`,
        }}
      >
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge
            className="text-white border-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            #{index + 1}
          </Badge>
          <Badge
            className="text-white border-0 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            {travel.continent}
          </Badge>
        </div>
        {travel.status === "current" && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">Currently Here</Badge>
          </div>
        )}
        {travel.status === "upcoming" && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">Coming Soon</Badge>
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-6 space-y-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: colors.primary }}>
          <MapPin className="h-4 w-4" />
          <span className="font-medium">
            {travel.location}, {travel.country}
          </span>
        </div>

        {/* title and date */}
        <h3 className="text-2xl font-bold text-foreground">{travel.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date(travel.dateRange.start).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}{" "}
            {travel.dateRange.end
              ? `- ${new Date(travel.dateRange.end).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}`
              : "- Present"}
          </span>
        </div>

        {/* deescription  */}
        <p className="text-muted-foreground leading-relaxed">{travel.description}</p>
        {travel.highlights && travel.highlights.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Highlights</h4>
            <ul className="space-y-2">
              {travel.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Travels = () => {
  const [filter, setFilter] = useState<TravelFilter>("all");

  const handleMarkerClick = (travel: TravelEntry) => {
    const element = document.getElementById(`travel-${travel.id}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // group travels by continent and sort by date
  const travelsByContinent = useMemo(() => {
    const grouped = travels
      .filter((t) => t.continent !== "NorthAmerica") // hiding na for now
      .reduce((acc, travel) => {
        if (!acc[travel.continent]) acc[travel.continent] = [];
        acc[travel.continent].push(travel);
        return acc;
      }, {} as Record<Continent, TravelEntry[]>);

    // oldest date first -> changing to ranking based later
    Object.keys(grouped).forEach((continent) => {
      grouped[continent as Continent].sort(
        (a, b) => new Date(a.dateRange.start).getTime() - new Date(b.dateRange.start).getTime()
      );
    });

    return grouped;
  }, []);

  // show continents with data
  const availableContinents = Object.keys(travelsByContinent) as Continent[];

  const filteredContinents =
    filter === "all"
      ? Object.entries(travelsByContinent)
      : Object.entries(travelsByContinent).filter(([continent]) => continent === filter);

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />

      {/* map*/}
      <section className="relative w-full h-[700px] bg-muted border-b border-border">
        {/* header on map */}
        <div
          className="absolute top-0 left-0 right-0 z-10 px-8 pt-24 pb-8 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.7) 70%, transparent 100%)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div className="flex items-center gap-2 text-[hsl(15,70%,60%)] mb-3">
            <Compass className="h-5 w-5" />
            <p className="text-sm font-medium">Travel Journal</p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            <span className="text-[hsl(15,70%,60%)]">Travels</span>
          </h1>
          <p className="text-lg text-muted-foreground">Click any location to see my notes.</p>
        </div>
        <WorldMap travels={travels} onMarkerClick={handleMarkerClick} filter={filter} />
      </section>

      {/* filters*/}
      <section className="py-8 px-6" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                filter === "all"
                  ? "border-[hsl(15,70%,60%)] bg-[hsl(15,70%,60%,0.15)] text-[hsl(15,70%,60%)]"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              <Compass className="h-4 w-4" />
              All Continents
            </button>
            {availableContinents.map((continent) => {
              const colors = continentColors[continent as Continent];
              return (
                <button
                  key={continent}
                  onClick={() => setFilter(continent as Continent)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all text-sm font-medium ${
                    filter === continent
                      ? `bg-opacity-15`
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                  }`}
                  style={
                    filter === continent
                      ? {
                          borderColor: colors.primary,
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                        }
                      : {}
                  }
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  {continentDisplayNames[continent]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* continent content -> cards for now. dont really want cards */}
      <section className="px-6 pb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="container mx-auto max-w-4xl space-y-16">
          {filteredContinents.map(([continent, entries]) => (
            <div key={continent} className="space-y-6">
              <h2
                className="text-3xl font-bold"
                style={{ color: continentColors[continent as Continent].primary }}
              >
                {continent}
              </h2>
              <div className="space-y-6">
                {entries.map((travel, index) => (
                  <TravelCard key={travel.id} travel={travel} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Travels;
