import React, { createContext, useState, useContext, ReactNode, useRef } from 'react';

interface SelectionContextType {
  selectedText: string;
  setSelectedText: (text: string) => void;
  selectionPosition: { x: number; y: number } | null;
  setSelectionPosition: (position: { x: number; y: number } | null) => void;
  insertTextToInput: (text: string) => void;
  registerInputSetter: (setter: (text: string) => void) => void;
}

const defaultContext: SelectionContextType = {
  selectedText: '',
  setSelectedText: () => {},
  selectionPosition: null,
  setSelectionPosition: () => {},
  insertTextToInput: () => {},
  registerInputSetter: () => {},
};

const SelectionContext = createContext<SelectionContextType>(defaultContext);

export const useSelection = () => useContext(SelectionContext);

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  
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

  return (
    <SelectionContext.Provider
      value={{
        selectedText,
        setSelectedText,
        selectionPosition,
        setSelectionPosition,
        insertTextToInput,
        registerInputSetter,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
