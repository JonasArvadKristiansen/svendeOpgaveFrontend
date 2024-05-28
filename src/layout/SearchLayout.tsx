import React, { useState } from 'react'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Props {
  children: React.ReactNode;
}

function SearchLayout(prop: Props) {
  const [searchData, setSearchData] = useState()

  return (
    <>
      <Header/>
        {prop.children}
      <Footer/>
    </>
  )
}

export default SearchLayout