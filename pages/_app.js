import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return(
    <>
      <Nav/>
      <Component {...pageProps} />
    </>
  )
   
}

export default MyApp
