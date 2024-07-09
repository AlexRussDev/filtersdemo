import React, { useRef, useEffect, useState } from "react";
import { Paper, PaperProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ResizablePaper = styled(Paper)<PaperProps>(() => ({
  overflow: "auto",
  resize: "none", // Disable the default resize
  minHeight: "400px",
  maxHeight: "100vh",
  position: "relative", // Required for absolute positioning of the handle
}));

const ResizeHandle = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "10px",
  position: "absolute",
  bottom: 0,
  left: 0,
  cursor: "ns-resize",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
}));

const ResizableWrapperComponent: React.FC<PaperProps> = (props) => {
  const resizableRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(700);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (resizableRef.current) {
        const newHeight =
          event.clientY - resizableRef.current.getBoundingClientRect().top;
        if (newHeight > 400 && newHeight < window.innerHeight * 0.8) {
          setHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
      document.body.style.cursor = "ns-resize";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const resizeHandle = resizableRef.current?.querySelector(".resize-handle");
    if (resizeHandle) {
      resizeHandle.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, []);

  return (
    <ResizablePaper {...props} ref={resizableRef} style={{ height }}>
      {props.children}
      <ResizeHandle className="resize-handle" />
    </ResizablePaper>
  );
};

export default ResizableWrapperComponent;
