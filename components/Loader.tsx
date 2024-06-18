import React from "react";
import { Spinner } from "@nextui-org/react";
import styled from "styled-components";

interface LoaderProps {
  type?: "FULL" | "NORMAL";
}

const SFull = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  z-index: 10000;
`;

export default function Loader({ type = "NORMAL" }: LoaderProps) {
  if (type === "NORMAL") {
    return (
      <div className="flex gap-4">
        <Spinner size="lg" color="success" />
      </div>
    );
  } else {
    return (
      <SFull>
        <div className="flex gap-4">
          <Spinner size="lg" color="success" />
        </div>
      </SFull>
    );
  }
}
