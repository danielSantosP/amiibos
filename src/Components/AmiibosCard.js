import React from 'react'
import { Image } from '@chakra-ui/react'
import { Container, Flex, UnorderedList, ListItem } from '@chakra-ui/layout'

const AmiibosCard = ({
  image,
  name,
  character,
  amiiboSeries,
  gameSeries,
  type,
  release
}) => {
  return (
    <>
      <Container
        pt="2rem"
        pb="2rem"
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
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Image maxW="250px" maxH="315px" src={image} alt={name} />
          </Flex>
          <Flex direction="column" justifyContent="center">
            <UnorderedList ml="2rem">
              <ListItem>
                <b>Nome: </b>
                {name}
              </ListItem>
              <ListItem>
                <b>Personagem: </b>
                {character}
              </ListItem>
              <ListItem>
                <b>Série: </b>
                {amiiboSeries}
              </ListItem>
              <ListItem>
                <b>Personagem: </b>
                {character}
              </ListItem>
              <ListItem>
                <b>Jogo da série: </b>
                {gameSeries}
              </ListItem>
              <ListItem>
                <b>Tipo: </b>
                {type}
              </ListItem>
              <ListItem>
                <b>Data de lançamento</b>
                <UnorderedList>
                  <ListItem>
                    <b>Japão:</b>{' '}
                    {release.jp
                      ? new Date(release.jp).toLocaleDateString('pt-br')
                      : 'Não foi lançado'}
                  </ListItem>
                  <ListItem>
                    <b>Europa:</b>{' '}
                    {release.eu
                      ? new Date(release.eu).toLocaleDateString('pt-br')
                      : 'Não foi lançado'}
                  </ListItem>
                  <ListItem>
                    <b>América do Norte:</b>{' '}
                    {release.na
                      ? new Date(release.na).toLocaleDateString('pt-br')
                      : 'Não foi lançado'}
                  </ListItem>
                  <ListItem>
                    <b>Austrália:</b>{' '}
                    {release.au
                      ? new Date(release.au).toLocaleDateString('pt-br')
                      : 'Não foi lançado'}
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

export default AmiibosCard
