import { useEffect, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

export default function MyTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = new DataSet([
      {
        id: 1,
        start: new Date(2010, 7, 15),
        end: new Date(2010, 8, 2),
        content: "Trajectory A",
      },
    ]);

    const options = {
      height: "300px",
    };

    const timeline = new Timeline(containerRef.current, items, options);

    return () => timeline.destroy();
  }, []);

  return <div ref={containerRef} className="w-full" />;
}