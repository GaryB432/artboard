import type { PageLoad, RouteParams } from "./$types";
import type { BBox, MultiPolygon, Position } from "geojson";

export const load = (async ({ params, fetch }) => {
  const resp = await fetch("/districts/states/MO/shape.geojson");
  let coordinates: Position[][][] = [];
  let bbox: BBox | undefined;
  if (resp.statusText === "OK") {
    const d = (await resp.json()) as MultiPolygon;
    if (d.type === "MultiPolygon") {
      coordinates = d.coordinates;
      bbox = d.bbox;
    }
  }

  return {
    coordinates,
    bbox,
  };
}) satisfies PageLoad;
