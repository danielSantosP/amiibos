import { createContext, useState, useContext } from 'react'

export const AmiibosContext = createContext()

export const AmiibosStorage = ({ children }) => {
  const [amiibos, setAmiibos] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const fetchAmiibos = async (data) => {
    let json = null
    try {
      setLoading(true)
      setAmiibos(null)
      setError(null)
      if (!data) {
        json = null
        return
      }
      const response = await fetch(
        `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${data}&showgames`
      )
      if (!response.ok && !!data) {
        throw new Error()
      }
      if (!!data && response.ok) {
        const { amiibo } = await response.json()
        json = amiibo
      }
    } catch (error) {
      setAmiibos(null)
      setError('Não foi encontrado')
    } finally {
      setAmiibos(json)
      setLoading(false)
    }
  }

  return (
    <AmiibosContext.Provider
      value={{
        amiibos,
        loading,
        error,
        fetchAmiibos
      }}
    >
      {children}
    </AmiibosContext.Provider>
  )
}

export const useAmiibos = () => useContext(AmiibosContext)
