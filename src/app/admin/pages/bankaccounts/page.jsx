'use client'
import { useEffect, useState } from 'react';
import FilterableTable from "./FilterableTable";
import useAuth from "../useAuth";
export default function Home() {
  const [data, setData] = useState([]);

  useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/account'); // Replace with your actual API endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <FilterableTable data={data} />
    </div>
  );
}