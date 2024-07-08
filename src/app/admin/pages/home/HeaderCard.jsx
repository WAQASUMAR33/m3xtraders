"use client"
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";



const HeaderCard = ({ title, value, percentage, user, color ,icon  }) => {
    const isPositive = parseFloat(percentage) > 0;
    return (
        <div className={`shadow-lg rounded-lg p-4 w-full ${color} flex flex-col justify-between`}>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="text-gray-600">
              {icon}
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {percentage}
            </div>
            <div className="text-sm text-gray-500">{user}</div>
          </div>
        </div>
      );
};

export default HeaderCard;
