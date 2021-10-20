import React from 'react'
import { Image } from '@chakra-ui/react'
import { Box, Container, Flex } from '@chakra-ui/layout'

const AmiibosCard = ({ id, image, name }) => {
  return (
    <>
      <Container
        w="300px"
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
        <Flex
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box mb="2rem">
            <Image maxW="250px" maxH="315px" src={image} alt={name} />
          </Box>
          <Box mt="1rem">
            <h1>
              <b>{name}</b>
            </h1>
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default AmiibosCard
