'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Typography, Button } from "@/components/Material-Components";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating fetching data from an API
    setTimeout(() => {
      setData({
        usersByRole: {
          labels: ["Admin", "User", "Moderator"],
          datasets: [{
            label: "Users by Role",
            data: [5, 20, 3],
            backgroundColor: ["#8B5CF6", "#3B82F6", "#10B981"],
          }],
        },
        activeUsers: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [{
            label: "Active Users",
            data: [50, 60, 80, 70, 90],
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
          }],
        },
      });
    }, 1000);
  }, []);

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="text-gray-800 font-semibold mb-6">Analytics Dashboard</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <Typography variant="h5" className="mb-4">Users by Role</Typography>
            <Pie data={data.usersByRole} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Typography variant="h5" className="mb-4">Active Users Over Time</Typography>
            <Line data={data.activeUsers} />
          </CardBody>
        </Card>
      </div>
      <div className="mt-6">
        <Button color="gray" onClick={() => router.push("/admin-panel")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
