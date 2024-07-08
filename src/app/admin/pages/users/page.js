// pages/index.js

'use client'
import { useEffect, useState } from 'react';
import FilterableTable from "./viewtable";
import useAuth from "../useAuth";

export default function Home() {

  useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
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