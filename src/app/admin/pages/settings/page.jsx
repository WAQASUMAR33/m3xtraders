"use client"
import { useEffect, useState } from 'react';
import FilterableTable from './FilterableTable';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings Management</h1>
      {isLoading ? <div>Loading...</div> : <FilterableTable data={data} fetchData={fetchData} />}
    </div>
  );
};

export default Home;
