import { useState } from 'react'
import './App.css'
import { Input, FormControl, Button, Image } from '@chakra-ui/react'
import { Container, Box, Grid, GridItem } from '@chakra-ui/layout'

function App() {
  const [amiibo, setAmiibo] = useState(null)
  const [amiiboData, setAmiiboData] = useState('')
  const [error, setError] = useState(null)

  const handleChange = ({ target }) => {
    setAmiiboData(target.value)
  }

  const fetchAmiibo = async () => {
    try {
      setError(null)
      const response = await fetch(
        `https://www.amiiboapi.com/api/amiibo/?name=${amiiboData}`
      )
      console.log('response: ', response)
      const json = await response.json()
      if (!response.ok) {
        throw new Error()
      }
      setAmiibo(json.amiibo)
    } catch (error) {
      console.log(error)
      setAmiibo(null)
      setError('Não foi encontrado')
    }
  }

  const handleClick = async () => {
    await fetchAmiibo()
    console.log(amiiboData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Amiibos</h3>
      </header>
      <Box
        as="form"
        width="50%"
        justify="center"
        align="center"
        margin="0 auto"
      >
        <Container marginTop="2rem">
          <FormControl>
            <label htmlFor="amiiboLabel">Insira o nome do Amiibo</label>
            <Input
              id="amiiboLabel"
              name="amiiboLabel"
              placeholder="teste"
              value={amiiboData}
              onChange={handleChange}
            />
            <Container marginTop="2rem">
              <Button colorScheme="facebook" onClick={handleClick}>
                Pesquisar
              </Button>
            </Container>
          </FormControl>

          {error && <p>{error}</p>}
          <Grid templateColumns="repeat(2, 3fr)">
            {amiibo &&
              amiibo.map((item) => {
                return (
                  <GridItem key={item.head + item.tail} colSPan={6}>
                    <p>Série: {item.amiiboSeries}</p>
                    <p>Personagem: {item.character}</p>
                    <p>Jogo da série: {item.gameSeries}</p>
                    <p>Tipo: {item.type}</p>
                    <Image
                      src={item.image}
                      alt={item.character}
                      marginBottom="3rem"
                    />
                  </GridItem>
                )
              })}
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default App
