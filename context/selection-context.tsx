"use client";

import React, { createContext, useState, useContext, ReactNode, useRef } from 'react';

interface SelectionContextType {
  selectedText: string;
  setSelectedText: (text: string) => void;
  selectionPosition: { x: number; y: number } | null;
  setSelectionPosition: (position: { x: number; y: number } | null) => void;
  insertTextToInput: (text: string) => void;
  registerInputSetter: (setter: (text: string) => void) => void;
  clearSelection: () => void;
  selectionActive: boolean;
}

const defaultContext: SelectionContextType = {
  selectedText: '',
  setSelectedText: () => {},
  selectionPosition: null,
  setSelectionPosition: () => {},
  insertTextToInput: () => {},
  registerInputSetter: () => {},
  clearSelection: () => {},
  selectionActive: false,
};

const SelectionContext = createContext<SelectionContextType>(defaultContext);

export const useSelection = () => useContext(SelectionContext);

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectionActive, setSelectionActive] = useState(false);
  
  // Use ref instead of state to avoid rendering issues
  const messageInputSetterRef = useRef<((text: string) => void) | null>(null);

  const insertTextToInput = (text: string) => {
    if (messageInputSetterRef.current) {
      messageInputSetterRef.current(text);
    }
  };
  
  const registerInputSetter = (setter: (text: string) => void) => {
    messageInputSetterRef.current = setter;
  };
  
  // Set text selection and mark as active
  const setSelectedTextWithActive = (text: string) => {
    setSelectedText(text);
    setSelectionActive(!!text);
  };
  
  // Clear selection state
  const clearSelection = () => {
    setSelectedText('');
    setSelectionPosition(null);
    setSelectionActive(false);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedText,
        setSelectedText: setSelectedTextWithActive,
        selectionPosition,
        setSelectionPosition,
        insertTextToInput,
        registerInputSetter,
        clearSelection,
        selectionActive,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
