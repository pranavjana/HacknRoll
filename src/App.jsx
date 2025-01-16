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
    const saved = localStorage.getItem('coins');
    return saved ? parseInt(saved, 10) : 100;
  });

  // Save coins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  const handlePurchase = (item) => {
    setCoins(prevCoins => prevCoins - item.price);
  };

  const handleLevelUp = () => {
    setCoins(prevCoins => prevCoins + 100);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks coins={coins} setCoins={setCoins} onLevelUp={handleLevelUp} />} />
          <Route path="pet" element={<Pet coins={coins} setCoins={setCoins} />} />
          <Route path="shop" element={<Shop coins={coins} onPurchase={handlePurchase} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
