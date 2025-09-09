import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Consumer from "./pages/Consumer";
import Farmer from "./pages/Farmer";
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Admin from "./pages/Admin";
import TraceView from "./pages/TraceView";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // Add this import



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<Landing />} />
        <Route path="/consumer" element={<Consumer />} />
                <Route path="/login" element={<Login />} />

        <Route path="/farmer" element={<Farmer />} />
        <Route path="/distributor" element={<Distributor />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/trace/:id" element={<TraceView />} />

        {/* IMPORTANT: DO NOT place any routes below this. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;