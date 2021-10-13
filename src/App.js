import { useState } from 'react'
import './App.css'
import { Input, FormControl, Button } from '@chakra-ui/react'
import { Container, Flex } from '@chakra-ui/layout'

function App() {
  const [amiibo, setAmiibo] = useState('')

  const handleChange = ({ target }) => {
    setAmiibo(target.value)
  }
  const handleClick = () => {
    console.log(amiibo)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>Amiibos</h3>
      </header>
      <Flex
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
              value={amiibo}
              onChange={handleChange}
            />
            <Container marginTop="2rem">
              <Button
                colorScheme="facebook"
                justify="end"
                onClick={handleClick}
              >
                Pesquisar
              </Button>
            </Container>
          </FormControl>
          {amiibo}
        </Container>
      </Flex>
    </div>
  )
}

export default App
