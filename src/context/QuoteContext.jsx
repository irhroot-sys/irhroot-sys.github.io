import { createContext, useContext } from "react";

export const QuoteContext = createContext(null);

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used inside QuoteContext.Provider");
  return context;
}
