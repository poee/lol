import { createContext, useContext } from "react"

export const TitleContext = createContext<{ setTitle: (title: string) => void; title: string}>({
  title: "",
  setTitle: () => null,
})

export const useTitleContext = () => useContext(TitleContext);