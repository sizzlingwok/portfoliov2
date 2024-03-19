import React, { useRef } from "react";
import mediumZoom from "medium-zoom/dist/pure";
import "medium-zoom/dist/style.css";

export function ImageZoom({ options, ...props }) {
  const zoomOptions = {
    background: "#111111",
    ...options,
  };

  const zoomRef = useRef(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom(zoomOptions);
    }

    return zoomRef.current;
  }

  function attachZoom(image) {
    const zoom = getZoom();

    if (image) {
      zoom.attach(image);
    } else {
      zoom.detach();
    }
  }

  return <img {...props} ref={attachZoom} />;
}
