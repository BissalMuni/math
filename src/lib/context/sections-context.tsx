'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export interface Section {
  id: string;
  label: string;
}

interface SectionsContextType {
  sections: Section[];
  contentPath: string | null;
  registerSections: (sections: Section[]) => void;
  setContentPath: (path: string) => void;
}

const SectionsContext = createContext<SectionsContextType>({
  sections: [],
  contentPath: null,
  registerSections: () => {},
  setContentPath: () => {},
});

export function SectionsProvider({
  children,
  initialContentPath,
}: {
  children: React.ReactNode;
  initialContentPath?: string;
}) {
  const [sections, setSections] = useState<Section[]>([]);
  const [contentPath, setContentPath] = useState<string | null>(initialContentPath ?? null);

  const registerSections = useCallback((newSections: Section[]) => {
    setSections((prev) => {
      const existingIds = new Set(prev.map((s) => s.id));
      const toAdd = newSections.filter((s) => !existingIds.has(s.id));
      return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
    });
  }, []);

  return (
    <SectionsContext.Provider value={{ sections, contentPath, registerSections, setContentPath }}>
      {children}
    </SectionsContext.Provider>
  );
}

export const useSections = () => useContext(SectionsContext);
