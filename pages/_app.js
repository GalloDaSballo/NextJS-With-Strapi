import Header from '../components/partials/Header'
import Footer from '../components/partials/Footer'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <content>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </content>
  )
}

export default MyApp
