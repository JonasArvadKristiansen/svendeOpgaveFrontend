import Header from '../components/SematicElements/Header'
import Footer from '../components/SematicElements/Footer'

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