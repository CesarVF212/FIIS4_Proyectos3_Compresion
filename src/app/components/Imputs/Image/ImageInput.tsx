"use client";

// --------------------- //
// --- IMPORTACIONES --- //
// --------------------- //

// React.
import { useState } from "react";

// CSS.
import styles from "../Imputs.module.css";

// Cliente Supabase.
import { supabase } from "../../../supabaseClient";

// Subir Imagen.
import uploadPhoto from "@/app/functions/uploadPhoto";

// ------------------------- //
// --- FUNCIÓN PRINCIPAL --- //
// ------------------------- //

export default function ImageInput() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const name = file.name.split(".")[0];
    // TODO: añadir lógica para los nombres de las imagenes.
    await uploadPhoto(supabase, file, name);
  };

  return (
    <div className={styles.container}>
      <h5>SUBIDA IMAGEN</h5>
      <input
        className={styles.input}
        type="file"
        id="photo"
        name="photo"
        accept="image/png, image/jpeg"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <input
        className={styles.button}
        type="button"
        value="Subir imagen"
        onClick={handleUpload}
      />
    </div>
  );
}
