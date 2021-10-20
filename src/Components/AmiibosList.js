import { useAmiibos } from '../AmiibosContext'
import { Alert, AlertTitle } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'
import AmiibosCard from './AmiibosCard'
import Loading from './Loading'

const Teste = () => {
  const { amiibos, loading, error } = useAmiibos()

  return (
    <>
      <Flex m="3rem" justifyContent="center" wrap="wrap">
        {loading && <Loading />}
        {error && (
          <Alert status="error" justifyContent="center" width="40%">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        {amiibos &&
          amiibos.map((item) => {
            return <AmiibosCard key={item.head + item.tail} {...item} />
          })}
      </Flex>
    </>
  )
}

export default Teste
