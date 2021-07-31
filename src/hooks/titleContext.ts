import { createContext, useContext, useEffect } from "react"

export const TitleContext = createContext<{ setTitle: (title: string) => void; title: string}>({
  title: "",
  setTitle: () => null,
})

export const useTitleContext = () => useContext(TitleContext);

export const useUpdateTitle = (title: string) => {
  const { setTitle } = useTitleContext();
  useEffect(() => {
    setTitle(title)
    return () => {
      setTitle("")
    }
  }, [title, setTitle])
}