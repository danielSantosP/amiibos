import { useState } from 'react'
import './App.css'
import {
  Input,
  FormControl,
  Button,
  Image,
  Alert,
  AlertTitle
} from '@chakra-ui/react'
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
        `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Super Smash Bros.`
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
      <Flex m="3rem" justifyContent="center" wrap="wrap">
        {error && (
          <Alert status="error" justifyContent="center" width="40%">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {amiibo &&
          amiibo.map((item) => {
            return (
              <Container
                padding="2rem"
                alignSelf="center"
                key={item.head + item.tail}
                borderWidth="2px"
                borderRadius="lg"
                borderColor="#eee"
                _hover={{
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
                  transform: 'translateY(-6px)'
                }}
              >
                <Flex justify="center">
                  <Flex
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="start"
                  >
                    <Image src={item.image} alt={item.name} />
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
