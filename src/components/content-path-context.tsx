"use client";

import { createContext, useContext } from "react";

/** 현재 페이지의 content_path를 하위 컴포넌트에 전달 */
export const ContentPathContext = createContext<string>("");

export function useContentPath() {
  return useContext(ContentPathContext);
}
