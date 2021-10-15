import React from 'react'
import AmiibosSearch from './AmiibosSearch'
import Header from './Header'
import AmiibosList from './AmiibosList'

const AmiibosContent = () => {
  return (
    <>
      <Header />
      <AmiibosSearch />
      <AmiibosList />
    </>
  )
}

export default AmiibosContent
