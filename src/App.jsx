import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import ServiceDetail from './pages/Services/ServiceDetail'
import Blog from './pages/Blog/Blog'
import BlogPost from './pages/Blog/BlogPost'
import Contact from './pages/Contact/Contact'
import SiteMap from './pages/SiteMap/SiteMap'
import Seo from './components/Seo/Seo'

// Sobe para o topo a cada troca de rota
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function NotFound() {
  return (
    <main className="pt-48 pb-32 min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-7xl font-black text-[#4a8c0a] mb-4">404</h1>
        <p className="text-gray-500 text-lg mb-6">Página não encontrada</p>
        <Link to="/" className="text-[#4a8c0a] font-semibold hover:underline">← Voltar para o início</Link>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Seo />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/servicos/:slug" element={<ServiceDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/mapa-do-site" element={<SiteMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
