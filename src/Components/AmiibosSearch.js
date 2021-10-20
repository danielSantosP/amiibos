import { useState, useEffect } from 'react'
import { useAmiibos } from '../AmiibosContext'
import { Select, FormControl, Button } from '@chakra-ui/react'
import { Container, Box, Flex } from '@chakra-ui/layout'
import Loading from './Loading'
import Error from './Error'

const AmiibosSearch = () => {
  const [amiiboSerieData, setAmiiboSerieData] = useState('')
  const [amiiboSeries, setAmiiboSeries] = useState(null)
  const [amiiboSeriesLoading, setAmiiboSeriesLoading] = useState(null)
  const [amiiboSeriesError, setAmiiboSeriesError] = useState(null)

  const { fetchAmiibos } = useAmiibos()

  const handleChange = ({ target }) => {
    setAmiiboSerieData(target.value)
  }

  const handleClick = async () => {
    await fetchAmiibos(amiiboSerieData)
  }

  useEffect(() => {
    async function fetchAmiiboSeries() {
      let json = null
      try {
        setAmiiboSeriesLoading(true)
        setAmiiboSeries(null)
        setAmiiboSeriesError(null)
        const response = await fetch(
          `https://www.amiiboapi.com/api/amiiboseries/`
        )
        if (!response.ok) {
          throw new Error()
        }
        const { amiibo } = await response.json()
        json = amiibo
      } catch (error) {
        setAmiiboSeries(null)
        setAmiiboSeriesError('Séries não encontradas')
      } finally {
        setAmiiboSeries(json)
        setAmiiboSeriesLoading(false)
      }
    }
    fetchAmiiboSeries()
  }, [])

  return (
    <>
      {amiiboSeriesLoading && (
        <Flex m="3rem" justifyContent="center">
          <Loading />
        </Flex>
      )}
      {amiiboSeriesError && (
        <Flex m="3rem" justifyContent="center">
          <Error error={amiiboSeriesError} />
        </Flex>
      )}
      {amiiboSeries && (
        <Box
          as="form"
          width="50%"
          justify="center"
          align="center"
          margin="0 auto"
        >
          <Container marginTop="2rem">
            <FormControl>
              <Select value={amiiboSerieData} onChange={handleChange}>
                <option value={''}>Selecione uma das opções</option>
                {amiiboSeries &&
                  amiiboSeries.map(({ key, name }) => (
                    <option key={key} id={key} value={key}>
                      {name}
                    </option>
                  ))}
              </Select>
              <Container marginTop="2rem">
                <Button bgColor="blue.800" color="#eee" onClick={handleClick}>
                  Pesquisar
                </Button>
              </Container>
            </FormControl>
          </Container>
        </Box>
      )}
    </>
  )
}

export default AmiibosSearch
