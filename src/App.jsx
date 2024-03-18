import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventLogs from './components/EventLogs';
import ChartsPage from './components/ChartsPage';
import About from './components/About';
import { Routes, Route, Link } from 'react-router-dom';
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_APP_BACK_URI}`);

function App() {
  const [eventLogsData, setEventLogsData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    socket.on('kafka-message', (message) => {

      if (message.topic === "mytopic") {
        setEventLogsData(prevLogs => {
          const updatedLogs = [message, ...prevLogs];
          if (updatedLogs.length > 100) {
            return updatedLogs.slice(-100); 
          }
          return updatedLogs;
        });
      }else{
        setChartData(prevData => {
          const index = prevData.findIndex(item => item.name === `Product ${message.key}`);
          const count = parseInt(message.value, 10);
  
          // Determine the message type and update the respective count
          const isViewCount = message.topic === "ProductViewedCountsTopic";
          const isPurchaseCount = message.topic === "ProductPurchasedCountsTopic";
          const isFavoriteCount = message.topic === "ProductFavoritedCountsTopic"; 
  
          if (index !== -1) {
            // Update existing item
            const existingItem = prevData[index];
            const updatedItem = {
              ...existingItem,
              viewedCount: isViewCount ? count : existingItem.viewedCount,
              purchasedCount: isPurchaseCount ? count : existingItem.purchasedCount,
              favoritedCount: isFavoriteCount ? count : existingItem.favoritedCount || 0, 
            };
            return [...prevData.slice(0, index), updatedItem, ...prevData.slice(index + 1)];
          } else {
            const newData = {
              name: `Product ${message.key}`,
              viewedCount: isViewCount ? count : 0,
              purchasedCount: isPurchaseCount ? count : 0,
              favoritedCount: isFavoriteCount ? count : 0, 
            };
            return [...prevData, newData];
          }
        });
      }
    });

    return () => {
      socket.off('kafka-message');
    };
  }, [socket]);

  return (
      <div className="App">
        <nav>
          <Link to="/event-logs">Event Logs</Link> | {" "}
          <Link to="/charts">Chart<span className='chart-singular'>s</span></Link> | {" "}
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/event-logs" element={<EventLogs eventLogsData={eventLogsData} />} />
          <Route path="/charts" element={<ChartsPage chartData={chartData} />} />
          <Route path="/about" element={<About/>} />
          <Route path="/" element={<EventLogs eventLogsData={eventLogsData} />} />
        </Routes>
      </div>
  );

}

export default App
