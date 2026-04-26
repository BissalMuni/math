"use client";

import { Mafs, Coordinates, type MafsProps } from "mafs";
import "mafs/core.css";

/** Mafs 시각화 래퍼 */
export function MathViz({
  children,
  height = 300,
  ...props
}: {
  children: React.ReactNode;
  height?: number;
} & Partial<MafsProps>) {
  return (
    <div className="my-6 rounded-lg border border-sidebar-border overflow-hidden">
      <Mafs height={height} {...props}>
        <Coordinates.Cartesian />
        {children}
      </Mafs>
    </div>
  );
}
