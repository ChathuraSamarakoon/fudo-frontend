import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders'; // <--- අලුත් Orders page එක Import කළා (Imported the new Orders page)

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Checkout />} /> 
          <Route path="/orders" element={<Orders />} /> {/* <--- Orders page එකට Route එක හැදුවා (Added the route for Orders) */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;