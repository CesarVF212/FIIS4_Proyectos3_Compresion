"use client";

// --------------------- //
// --- IMPORTACIONES --- //
// --------------------- //

// React.
import { useEffect, useState } from "react";

// CSS.
import styles from "./page.module.css";

// Supabase.
import { createClient } from "@supabase/supabase-js";

// Compresión de imagenes.
import imageCompression from "browser-image-compression";

// ------------------------ //
// ----CLIENTE SUPABASE --- //
// ------------------------ //

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);

// ------------------------------------------ //
// --- FUNCIÓN: SUBIR IMAGEN DESDE PUBLIC --- //
// ------------------------------------------ //

async function uploadToServerFromFile(file: File, name: string) {
  const { data, error } = await supabase.storage
    .from("imagenes")
    .upload(`${name}.jpg`, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) console.error("Error:", error.message);
  else console.log("Subida exitosa:", data.path);
}

// ------------------------------------------------ //
// --- FUNCIÓN: Obtener url pública de Supabase --- //
// ------------------------------------------------ //

function getPublicUrl(path: string) {
  const { data } = supabase.storage.from("imagenes").getPublicUrl(path);
  return data.publicUrl;
}

// ------------------------ //
// --- INTERFÁZ: Imagen --- //
// ------------------------ //

interface Images {
  url: string;
  name: string;
}

export default function Home() {
  const [images, setImages] = useState<Images[]>([]);

  // ------------------------------------------- //
  // --- USE EFFECT: Subir y comprimir fotos --- //
  // ------------------------------------------- //

  useEffect(() => {
    const run = async () => {
      const response = await fetch("/raw.jpg");
      const blob = await response.blob();
      const imageFile = new File([blob], "raw.jpg", { type: "image/jpeg" });

      await uploadToServerFromFile(imageFile, "raw");

      const uploadCompressed = async (maxSizeMB: number, name: string) => {
        try {
          const compressed = await imageCompression(imageFile, {
            maxSizeMB,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });
          await uploadToServerFromFile(compressed, name);
        } catch (error) {
          console.log(error);
        }
      };

      // Subir todas las imagenes.
      await uploadCompressed(5, "image5MB");
      await uploadCompressed(1, "image1MB");
      await uploadCompressed(0.5, "image0.5MB");
      await uploadCompressed(0.1, "image0.1MB");
      await uploadCompressed(0.05, "image0.05MB");

      // Guardar las urls públicas dentro de la interfáz.
      setImages([
        { url: getPublicUrl("raw.jpg"), name: "Original (PNG +- 10MB)" },
        { url: getPublicUrl("image5MB.jpg"), name: "JPG 5MB" },
        { url: getPublicUrl("image1MB.jpg"), name: "JPG 1MB" },
        { url: getPublicUrl("image0.5MB.jpg"), name: "JPG 0.5MB" },
        { url: getPublicUrl("image0.1MB.jpg"), name: "JPG 0.1MB" },
        { url: getPublicUrl("image0.05MB.jpg"), name: "JPG 0.05MB" },
      ]);
    };

    // Ejecutamos todo de forma síncrona.
    run();
  }, []);

  // -------------- //
  // --- RENDER --- //
  // -------------- //

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {images.map((images, i) => (
          <div key={i} className={styles.card}>
            <p>{images.name}</p>
            <img
              src={images.url}
              alt={`imagen-${i}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
