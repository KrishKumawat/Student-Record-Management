import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState("Dashboard");

    return (
        <div className="flex">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="w-5/6">
                <Navbar studentName="Jasveer Vaishnav" activeSection={activeSection} />
                <AdminDashboard />
            </div>
        </div>
    );
}

const AdminDashboard = () => {
    const stats = {
        students: 520,
        teachers: 40,
        classes: 12,
        subjects: 8,
        attendancePercentage: 85,
        pendingFees: 12000,
        collectedFees: 98000,
    };

    const barChartData = {
        labels: ["Students", "Teachers"],
        datasets: [
            {
                label: "Count",
                data: [stats.students, stats.teachers],
                backgroundColor: ["#06b6d4", "#f97316"],
            },
        ],
    };

    const feeChartData = {
        labels: ["Collected Fees", "Pending Fees"],
        datasets: [
            {
                data: [stats.collectedFees, stats.pendingFees],
                backgroundColor: ["#10b981", "#ef4444"],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <DashboardCard title="Total Students" value={stats.students} color="text-cyan-600" />
                <DashboardCard title="Total Teachers" value={stats.teachers} color="text-orange-500" />
                <DashboardCard title="Total Classes" value={stats.classes} color="text-blue-600" />
                <DashboardCard title="Total Subjects" value={stats.subjects} color="text-green-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ChartCard title="Student & Teacher Statistics">
                    <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </ChartCard>
                <ChartCard title="Fee Collection Overview">
                    <Doughnut data={feeChartData} />
                    <p className="text-sm text-gray-500 mt-2">Total Pending Fees: ₹{stats.pendingFees}</p>
                </ChartCard>
            </div>

            <AttendanceCard percentage={stats.attendancePercentage} />
        </div>
    );
};

const DashboardCard = ({ title, value, color }) => (
    <div className="p-4 bg-white shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const ChartCard = ({ title, children }) => (
    <div className="p-6 bg-white shadow rounded-lg">
        <h3 className="text-xl font-bold text-gray-600 mb-4">{title}</h3>
        {children}
    </div>
);

const AttendanceCard = ({ percentage }) => (
    <div className="mt-6 p-6 bg-white shadow rounded-lg">
        <h3 className="text-xl font-bold text-gray-600">Monthly Attendance Report</h3>
        <p className="text-lg text-gray-700 mt-2">
            Overall Attendance: <span className="text-green-600 font-bold">{percentage}%</span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div className="h-4 bg-green-500 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);
