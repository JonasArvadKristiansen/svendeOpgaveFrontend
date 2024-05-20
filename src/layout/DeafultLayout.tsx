import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Props {
  children: any
}

function testLayout(prop: Props) {
  return (
    <>
      <Header/>
      {prop.children}
      <Footer/>
    </>
  )
}

export default testLayout