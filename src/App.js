import { useState, useEffect } from 'react'
import './App.css'
import {
  Select,
  FormControl,
  Button,
  Image,
  Alert,
  AlertTitle,
  CircularProgress
} from '@chakra-ui/react'
import {
  Container,
  Box,
  Flex,
  UnorderedList,
  ListItem
} from '@chakra-ui/layout'

function App() {
  const [amiibos, setAmiibos] = useState(null)
  const [amiiboSeries, setAmiiboSeries] = useState(null)
  const [amiiboSeriesLoading, setAmiiboSeriesLoading] = useState(false)
  const [amiiboSerieData, setAmiiboSerieData] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target }) => {
    setAmiiboSerieData(target.value)
  }

  const fetchAmiibos = async () => {
    let json = null
    try {
      setLoading(true)
      setAmiibos(null)
      setError(null)
      const response = await fetch(
        `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${amiiboSerieData}`
      )
      if (!response.ok && !!amiiboSerieData) {
        throw new Error()
      }
      if (!amiiboSerieData) {
        json = null
      }
      if (!!amiiboSerieData && response.ok) {
        const { amiibo } = await response.json()
        json = amiibo
      }
    } catch (error) {
      setAmiibos(null)
      setError('Não foi encontrado')
    } finally {
      setAmiibos(json)
      setAmiiboSerieData('')
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleClick()
  }

  const handleClick = async () => {
    await fetchAmiibos()
  }

  useEffect(() => {
    const fetchAmiiboSeries = async () => {
      let json = null
      try {
        setAmiiboSeriesLoading(true)
        setAmiiboSeries(null)
        setError(null)
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
        setError('Séries não encontradas')
      } finally {
        setAmiiboSeries(json)
        setAmiiboSeriesLoading(false)
      }
    }
    fetchAmiiboSeries()
  }, [])

  return (
    <div>
      <header className="App-header">
        <h3>Amiibos</h3>
      </header>
      {amiiboSeriesLoading ? (
        <Flex m="3rem" justifyContent="center" wrap="wrap">
          <CircularProgress
            isIndeterminate
            valueText="Carregando..."
            color="var(--chakra-colors-blue-800)"
          />
        </Flex>
      ) : (
        <Box
          as="form"
          width="50%"
          justify="center"
          align="center"
          margin="0 auto"
          onSubmit={handleSubmit}
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
      <Flex m="3rem" justifyContent="center" wrap="wrap">
        {loading && (
          <CircularProgress
            isIndeterminate
            valueText="Carregando..."
            color="var(--chakra-colors-blue-800)"
          />
        )}
        {error && (
          <Alert status="error" justifyContent="center" width="40%">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {amiibos &&
          amiibos.map((item) => {
            return (
              <Container
                pt="2rem"
                pb="2rem"
                key={item.head + item.tail}
                borderWidth="2px"
                borderRadius="lg"
                borderColor="#eee"
                m="0.5rem"
                _hover={{
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
                  transform: 'translateY(-6px)'
                }}
              >
                <Flex justifyContent="center" alignItems="center">
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      maxW="250px"
                      maxH="315px"
                      src={item.image}
                      alt={item.name}
                    />
                  </Flex>
                  <Flex direction="column" justifyContent="center">
                    <UnorderedList ml="2rem">
                      <ListItem>
                        <b>Nome: </b>
                        {item.name}
                      </ListItem>
                      <ListItem>
                        <b>Personagem: </b>
                        {item.character}
                      </ListItem>
                      <ListItem>
                        <b>Série: </b>
                        {item.amiiboSeries}
                      </ListItem>
                      <ListItem>
                        <b>Personagem: </b>
                        {item.character}
                      </ListItem>
                      <ListItem>
                        <b>Jogo da série: </b>
                        {item.gameSeries}
                      </ListItem>
                      <ListItem>
                        <b>Tipo: </b>
                        {item.type}
                      </ListItem>
                      <ListItem>
                        <b>Data de lançamento</b>
                        <UnorderedList>
                          <ListItem>
                            <b>Japão:</b>{' '}
                            {item.release.jp
                              ? new Date(item.release.jp).toLocaleDateString(
                                  'pt-br'
                                )
                              : 'Não foi lançado'}
                          </ListItem>
                          <ListItem>
                            <b>Europa:</b>{' '}
                            {item.release.eu
                              ? new Date(item.release.eu).toLocaleDateString(
                                  'pt-br'
                                )
                              : 'Não foi lançado'}
                          </ListItem>
                          <ListItem>
                            <b>América do Norte:</b>{' '}
                            {item.release.na
                              ? new Date(item.release.na).toLocaleDateString(
                                  'pt-br'
                                )
                              : 'Não foi lançado'}
                          </ListItem>
                          <ListItem>
                            <b>Austrália:</b>{' '}
                            {item.release.au
                              ? new Date(item.release.au).toLocaleDateString(
                                  'pt-br'
                                )
                              : 'Não foi lançado'}
                          </ListItem>
                        </UnorderedList>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </Flex>
              </Container>
            )
          })}
      </Flex>
    </div>
  )
}

export default App
