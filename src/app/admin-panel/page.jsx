"use client"

import supabase from "@/helpers/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardBody, Input, Button, Typography } from "@/components/Material-Components";
import { FaSearch, FaHome, FaUser, FaBars, FaMailBulk } from "react-icons/fa";
import ContactPanel from "@/components/ContactList";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState("null");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { data: user, error } = await supabase.from('Usuario').select('role').eq('id', session.user.id).single();
        if (user) {
          setUserRole(user.role);
        }
      }
    }
    fetchUserRole();
  }, [])

  if (userRole !== 'admin') {
    return <p>Access Denied</p>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className={`${isSidebarOpen ? "w-64" : "w-0 -ml-64"} md:ml-0 transition-all duration-300 bg-gray-800 text-white hidden md:block`}>
          <div className="p-4 space-y-6 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
              <nav className="space-y-1">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-zinc-700 transition-colors">
                  <FaUser className="h-4 w-4" /><span>Users</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-zinc-700 transition-colors">
                  <FaMailBulk className="h-4 w-4" /><span>Emails</span>
                </Link>
              </nav>
            </div>
            <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md bg-gray-700 hover:bg-gray-600 transition-colors">
              <FaHome className="h-4 w-4" /><span>Main Page</span>
            </Link>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="border-b bg-background p-4 flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <FaBars className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold ml-4">Ciudad de las Leyendas / Admin Panel / Dashboard</h1>
            <div className="relative">
              <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
          </div>
          <div className="p-6">
            <Card>
              <CardBody>
                <Typography variant="h6" className="mb-4">Users Panel</Typography>
                <ContactPanel />
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}