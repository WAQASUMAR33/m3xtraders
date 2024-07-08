"use client";
import React, { useEffect, useState } from "react";
import HeaderCard from "./HeaderCard";
import { FaUsers } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import useAuth from "../useAuth";


const Dashboard = () => {
  useAuth();

  const [users, setUsers] = useState([]);
  //const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await fetch("/api/getStatistics");
        const usersData = await usersResponse.json();
        // const invoicesData = await invoicesResponse.json();

        setUsers(usersData);
        // setInvoices(invoicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract data for HeaderCards

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <HeaderCard
          title="Total Users"
          value={users.total_users}
          percentage="N/A" 
          user=""
          color="bg-green-100" 
          icon={<FaUsers size={42}/>}
        />

        <HeaderCard
          title="Pending Deposits"
          value={users.pending_deposits}
          percentage="N/A" 
          user=""
          color="bg-purple-100" 
          icon={<FaArrowCircleDown size={42}/>}
        />

        <HeaderCard
          title="Pending Withdrawals"
          value={users.pending_withdrawals}
          percentage="N/A" 
          user=""
          color="bg-red-100"
          icon={<FaArrowCircleUp size={42}/>}
        />

        <HeaderCard
          title="Total Deposits"
          value={users.total_deposits}
          percentage="N/A" 
          user=""
          color="bg-purple-100" 
          icon={<TbMoneybag size={42}/>}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        {/* <Graph /> */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
          {/* <UserTable users={users} /> */}
        </div>
        {/* <InvoiceList invoices={invoices} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
