"use client"
import { useState, useEffect } from 'react';

export default function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const userId = 1; // Replace with the actual user ID from authentication

  useEffect(() => {
    const fetchReferrals = async () => {
      const res = await fetch(`/api/referrals?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);
      } else {
        console.error('Failed to fetch referrals');
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div>
      <h1>My Referrals</h1>
      <ul>
        {referrals.map((referral) => (
          <li key={referral.id}>
            {referral.name} - Earned: ${referral.benefits.reduce((acc, benefit) => acc + benefit.amount, 0).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}