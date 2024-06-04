import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface Props {
  children: React.ReactNode;
}

function DeafultLayout(prop: Props) {
  return (
    <>
      <Header/>
        <main className='content container-sm'>
          {prop.children}
        </main>
      <Footer/>
    </>
  )
}

export default DeafultLayout