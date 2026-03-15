"use client";

import { useState } from "react";
// CSS.
import styles from "../Imputs.module.css";
// Subir Imagen.
import { supabase } from "../../../supabaseClient";
import uploadVideo from "@/app/functions/uploadVideo";

export default function VideoInput() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const name = file.name.split(".")[0];
    // TODO: añadir lógica para los nombres de los videos.
    await uploadVideo(supabase, file, name);
  };

  return (
    <div className={styles.container}>
      <h5>SUBIDA VÍDEO</h5>
      <input
        className={styles.input}
        type="file"
        id="photo"
        name="photo"
        accept="video/mp4, video/webp"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <input
        className={styles.button}
        type="button"
        value="Subir video"
        onClick={handleUpload}
      />
    </div>
  );
}
