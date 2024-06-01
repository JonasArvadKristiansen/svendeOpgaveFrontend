import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Props {
  children: React.ReactNode;
}

function DeafultLayout(prop: Props) {
  return (
    <>
      <Header/>
        {prop.children}
      <Footer/>
    </>
  )
}

export default DeafultLayout