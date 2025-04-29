import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/helpers/firebaseClient";

export async function insertContactToFirebase(data) {
  try {
    const docRef = await addDoc(collection(db, "formulariosContacto"), {
      nombre: data.nombre,
      email: data.email,
      asunto: data.asunto,
      mensaje: data.mensaje,
      fecha_envio: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
    return { success: false, error };
  }
}
