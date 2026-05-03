import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { FAQ } from './pages/FAQ'
import { Support } from './pages/Support'
import { Contact } from './pages/Contact'
import { LegalPage } from './pages/LegalPage'
import { PackageDetails } from './pages/PackageDetails'
import { ItineraryPage } from './pages/ItineraryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/cookies" element={<LegalPage type="cookies" />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
