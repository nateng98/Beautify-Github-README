import Categories from './components/Categories'
import DistributedBrands from './components/DistributedBrands'
import FooterTop from './components/FooterTop'
import Highlight from './components/Highlight'
import HomeBanner from './components/HomeBanner'
import News from './components/News'
import ProductList from './components/ProductList'

function App() {

  return (
    <main>
      <HomeBanner />
      <Highlight />
      <Categories />
      <ProductList />
      <News />
      <DistributedBrands />
      <FooterTop />
    </main>
  )
}

export default App
