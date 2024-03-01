import { beforeEach, describe, expect, test } from "vitest";
import { Graph } from "./graph";

describe("Graph", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph([], []);
  });
  test("adds", () => {
    expect(graph.points.length).toEqual(0);
  });
});
