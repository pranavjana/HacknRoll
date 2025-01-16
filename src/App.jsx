import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Pet from './components/Pet';
import Shop from './components/Shop';

export default function App() {
  // Shared state for coins
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('petCoins');
    return saved ? parseInt(saved, 10) : 100;
  });

  // Save coins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('petCoins', coins.toString());
  }, [coins]);

  const handlePurchase = (item) => {
    setCoins(prevCoins => prevCoins - item.price);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="pet" element={<Pet coins={coins} setCoins={setCoins} />} />
          <Route path="shop" element={<Shop coins={coins} onPurchase={handlePurchase} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
