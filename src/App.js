import { useState } from 'react'
import './App.css'
import { Input, FormControl, Button, Image } from '@chakra-ui/react'
import {
  Container,
  Box,
  Flex,
  UnorderedList,
  ListItem
} from '@chakra-ui/layout'

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
      const json = await response.json()
      console.log(json)
      if (!response.ok) {
        throw new Error()
      }
      setAmiibo(json.amiibo)
    } catch (error) {
      setAmiibo(null)
      setError('Não foi encontrado')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleClick()
  }

  const handleClick = async () => {
    await fetchAmiibo()
  }

  return (
    <div>
      <header className="App-header">
        <h3>Amiibos</h3>
      </header>
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
            <Input
              placeholder="Insira o nome do Amiibo"
              value={amiiboData}
              onChange={handleChange}
            />
            <Container marginTop="2rem">
              <Button colorScheme="facebook" onClick={handleClick}>
                Pesquisar
              </Button>
            </Container>
          </FormControl>
        </Container>
      </Box>
      <Flex justify="center" margin="3rem">
        {error && <p>{error}</p>}
        {amiibo &&
          amiibo.map((item) => {
            return (
              <Container padding="2.5rem" key={item.head + item.tail}>
                <Flex justify="center">
                  <Flex w="50%" direction="column" justifyContent="center">
                    <UnorderedList>
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
                    </UnorderedList>
                  </Flex>
                  <Flex w="50%" alignItems="end" justifyContent="start">
                    <Image src={item.image} alt={item.character} />
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
