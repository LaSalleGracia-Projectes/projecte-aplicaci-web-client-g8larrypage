'use client'

import { useEffect, useState } from "react";
import { selectContact } from "@/supabase/selectContact";
import { formatDate } from "@/utils/formatDate";

export default function ContactPanel() {
  const [contacts, setContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsData = await selectContact();
      setContacts(contactsData);
    };
    fetchContacts();
  }, []);

  // Función para truncar texto
  const truncateText = (text, maxLength = 80) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
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
              <div className="mt-2">
                <p className="text-gray-600"><strong>Message:</strong></p>
                <p className="text-gray-700 mt-1">
                  {truncateText(contact.mensaje)}
                  {contact.mensaje && contact.mensaje.length > 80 && (
                    <button 
                      onClick={() => setSelectedMessage(contact)}
                      className="text-blue-500 hover:text-blue-700 ml-1"
                    >
                      Ver más
                    </button>
                  )}
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-4"><strong>{formatDate(contact.created_at)}</strong></p>
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{selectedMessage.asunto}</h3>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <p className="font-medium text-lg">{selectedMessage.nombre}</p>
                <p className="text-gray-600">{selectedMessage.correo}</p>
                <p className="text-gray-500 text-sm">{formatDate(selectedMessage.created_at)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="whitespace-pre-wrap">{selectedMessage.mensaje}</p>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}