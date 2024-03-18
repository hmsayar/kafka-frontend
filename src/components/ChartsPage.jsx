import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ChartsPage({ chartData }) {
  return (
    <div>
      <h2>Chart<span className="chart-singular">s</span></h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="viewedCount" fill="#8884d8" />
        <Bar dataKey="purchasedCount" fill="#82ca9d" />
        <Bar dataKey="favoritedCount" fill="#88aa9a" />
      </BarChart>

    </div>
  );
}

