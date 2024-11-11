// context/CompendiumContext.js
"use client";
import { createContext, useContext, useState } from 'react';

const CompendiumContext = createContext();

export const useCompendium = () => useContext(CompendiumContext);

export const CompendiumProvider = ({ children }) => {
  const [showCompendium, setShowCompendium] = useState(false);

  return (
    <CompendiumContext.Provider value={{ showCompendium, setShowCompendium }}>
      {children}
    </CompendiumContext.Provider>
  );
};