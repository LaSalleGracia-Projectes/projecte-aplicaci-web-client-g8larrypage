'use client';

import supabase from "@/helpers/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@/components/Material-Components";
import { Line, Pie, Doughnut } from "react-chartjs-2";
import { FaHome, FaUser, FaMailBulk, FaChartBar } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [userRole, setUserRole] = useState("null");

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: user } = await supabase.from("Usuario").select("role").eq("id", session.user.id).single();
        if (user) {
          setUserRole(user.role);
        }
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: users, error } = await supabase.from("Usuario").select("id, role, last_connexion");

      if (error || !users) {
        console.error("Error fetching users:", error);
        return;
      }

      const roleCounts = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});

      setData({
        usersByRole: {
          labels: Object.keys(roleCounts).length ? Object.keys(roleCounts) : ["Sin datos"],
          datasets: [
            {
              label: "Usuarios por Rol",
              data: Object.values(roleCounts).length ? Object.values(roleCounts) : [1],
              backgroundColor: ["#8B5CF6", "#3B82F6", "#10B981"],
            },
          ],
        },
        activeUsers: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Usuarios Activos",
              data: [12, 19, 30, 0, 0], // Datos ficticios
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
            },
          ],
        },
        sessionsByChannel: {
          labels: ["Gmail", "Facebook", "Email"],
          datasets: [
            {
              label: "Sesiones por Canal",
              data: [30, 40, 20], // Datos ficticios
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        deviceStatus: {
          uptime: "195 Días, 8 horas",
          usedMemory: "168.3GB",
          totalMemory: "256GB",
          ramUsage: 65, // % de memoria usada
        },
      });
    };

    fetchData();
  }, []);


  if (userRole !== "admin") {
    return <p>Access Denied</p>;
  }

  if (!data || !data.usersByRole || !data.activeUsers) {
    return <div className="flex justify-center items-center h-screen">Cargando datos...</div>;
  }

  if (!data.deviceStatus) {
    return <div className="flex justify-center items-center h-screen">Cargando estado del dispositivo...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white hidden md:block">
        <div className="p-4 space-y-6 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
            <nav className="space-y-1">
              <Link href="/admin-panel" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-zinc-700">
                <FaMailBulk className="h-4 w-4" /><span>Emails</span>
              </Link>
              <Link href="/admin-panel/users" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-zinc-700">
                <FaUser className="h-4 w-4" /><span>Users</span>
              </Link>
              <Link href="/admin-panel/analytics" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-zinc-700">
                <FaChartBar className="h-4 w-4" /><span>Analytics</span>
              </Link>
            </nav>
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md bg-gray-700 hover:bg-gray-600">
            <FaHome className="h-4 w-4" /><span>Main Page</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6 bg-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Card className="p-3 shadow-sm">
            <CardBody>
              <Typography variant="h5" className="mb-4">Usuarios por Rol</Typography>
              <Pie data={data.usersByRole} />
            </CardBody>
          </Card>
          <Card className="p-3 shadow-sm">
            <CardBody>
              <Typography variant="h5" className="mb-4">Usuarios Activos</Typography>
              <Line data={data.activeUsers} />
            </CardBody>
          </Card>
          <Card className="p-3 shadow-sm">
            <CardBody>
              <Typography variant="h5" className="mb-4">Sesiones por Proveedor</Typography>
              <Doughnut data={data.sessionsByChannel} />
            </CardBody>
          </Card>
          <Card className="p-3 shadow-sm col-span-3">
            <CardBody>
              <Typography variant="h6" className="mb-4">Estado del Dispositivo</Typography>
              <p>Uptime: {data.deviceStatus.uptime}</p>
              <p>Memoria usada: {data.deviceStatus.usedMemory} de {data.deviceStatus.totalMemory}</p>
              <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                <div className="bg-green-500 h-2 rounded-lg" style={{ width: `${data.deviceStatus.ramUsage}%` }}></div>
              </div>
              <p className="mt-2">Uso de RAM: {data.deviceStatus.ramUsage}%</p>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
