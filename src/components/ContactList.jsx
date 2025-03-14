'use client'

import { useEffect, useState } from "react";
import { selectContact } from "@/supabase/selectContact";
import { formatDate } from "@/utils/formatDate";

export default function ContactPanel() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await selectContact();
      setContacts(contactsData);
    };
    fetchContacts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">{contact.nombre}</h2>
            <p className="text-gray-600"><strong>Email:</strong> {contact.correo}</p>
            <p className="text-gray-600"><strong>Subject:</strong> {contact.asunto}</p>
            <p className="text-gray-600"><strong>Message:</strong> {contact.mensaje}</p>
            <p className="text-gray-500 text-sm mt-4"><strong>{formatDate(contact.created_at)}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}
