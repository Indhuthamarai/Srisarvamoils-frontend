import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { CSVLink } from "react-csv";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#6A33AA"];

export default function Report() {
  const [report, setReport] = useState(null);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    axios.get("https://srisarvamoils-backend.onrender.com/api/report")
      .then(res => {
        setReport(res.data);
        setCsvData([
          ["Metric", "Value"],
          ["Total Revenue", res.data.totalRevenue],
          ["Total Products Sold", res.data.totalItemsSold],
          ["Total Stock Remaining", res.data.totalStockRemaining],
          ["Total Orders", res.data.totalOrders],
          ...Object.entries(res.data.statusCounts).map(([status, count]) => [status, count])
        ]);
      })
      .catch(err => console.error("Error fetching report:", err));
  }, []);

  if (!report) return <div>Loading report...</div>;

  const chartData = Object.entries(report.statusCounts).map(([status, count]) => ({
    name: status,
    count
  }));

  // Simulated line chart data (in real case, use createdAt or monthly totals from backend)
  const lineData = [
    { name: "Jan", revenue: 12000 },
    { name: "Feb", revenue: 18000 },
    { name: "Mar", revenue: 25000 },
    { name: "Apr", revenue: 22000 },
    { name: "May", revenue: report.totalRevenue },
  ];

  return (
    <>
      <AdminNav />
      <div className="report-container" style={{ padding: "30px" }}>
        <h2>Business Report</h2>
        <CSVLink data={csvData} filename="business_report.csv" className="btn btn-primary" style={{ marginBottom: "20px" }}>
          Download CSV
        </CSVLink>

        <div className="report-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="report-card">
            <h4>Total Revenue</h4>
            <p>₹ {report.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="report-card">
            <h4>Total Products Sold</h4>
            <p>{report.totalItemsSold}</p>
          </div>
          <div className="report-card">
            <h4>Total Stock Remaining</h4>
            <p>{report.totalStockRemaining}</p>
          </div>
          <div className="report-card">
            <h4>Total Orders</h4>
            <p>{report.totalOrders}</p>
          </div>

          <div className="report-card" style={{ gridColumn: "1 / -1" }}>
            <h4>Order Status Breakdown</h4>
            {Object.entries(report.statusCounts).map(([status, count]) => (
              <p key={status}><strong>{status}:</strong> {count}</p>
            ))}
          </div>

          <div className="report-card" style={{ gridColumn: "1 / -1" }}>
            <h4>Status Bar Chart</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="report-card" style={{ gridColumn: "1 / -1" }}>
            <h4>Status Pie Chart</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData} dataKey="count" nameKey="name" outerRadius={120} label>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="report-card" style={{ gridColumn: "1 / -1" }}>
            <h4>Revenue Over Time (Mock Data)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
