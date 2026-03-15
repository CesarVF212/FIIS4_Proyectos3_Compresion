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

// Supabase - Subir vídeos.
import uploadPhotoFromPublic from "./functions/uploadPhotoFromPublic";
import uploadVideoFromPublic from "./functions/uploadVideoFromPublic";

// Supabase - Obtener URL's públicas.
import getImagePublicUrl from "./functions/getImagePublicUrl";
import getVideoPublicUrl from "./functions/getVideoPublicUrl";

// Buckets.
const IMAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET;
const VIDEO_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET;

// ------------------------ //
// ----CLIENTE SUPABASE --- //
// ------------------------ //
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!,
);

// ------------------------ //
// --- INTERFAZ: Imagen --- //
// ------------------------ //

interface Images {
  url?: string;
  name: string;
}
interface Videos {
  url?: string;
  name: string;
}

export default function Home() {
  const [images, setImages] = useState<Images[]>([]);
  const [videos, setVideos] = useState<Videos[]>([]);

  // ------------------------------------------- //
  // --- USE EFFECT: Subir y comprimir fotos --- //
  // ------------------------------------------- //

  useEffect(() => {
    // Return en el caso de no tener los buckets.
    if (IMAGE_BUCKET == undefined) {
      console.log(
        "ERROR: No se encuentra el IMAGE_BUCKET. Añadelo a la lista .env con NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET",
      );
      return;
    }
    if (VIDEO_BUCKET == undefined) {
      console.log(
        "ERROR: No se encuentra el VIDEO_BUCKET. Añadelo a la lista .env con NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET",
      );
      return;
    }

    const run = async () => {
      // Imagen.
      const responseImage = await fetch("/raw.jpg");
      const blobImage = await responseImage.blob();
      const imageFile = new File([blobImage], "raw.jpg", {
        type: "image/jpeg",
      });

      await uploadPhotoFromPublic(supabase, imageFile, "image");

      // Vídeo.
      const responseVideo = await fetch("/video.mp4");
      const blobVideo = await responseVideo.blob();
      const videoFile = new File([blobVideo], "video.mp4", {
        type: "video/mp4",
      });

      // Obtenemos las URLS públicas una vez subido y guardamos.
      await uploadVideoFromPublic(supabase, videoFile, "video");
      setImages([
        {
          url: getImagePublicUrl(supabase, "image.jpg"),
          name: "COMPRIMIDA A 2MB",
        },
      ]);
      setVideos([
        { url: getVideoPublicUrl(supabase, "video.mp4"), name: "Video" },
      ]);
    };

    // Ejecutamos todo de forma asíncrona.
    run();
  }, []);

  // -------------- //
  // --- RENDER --- //
  // -------------- //

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {images.map((image, i) => (
          <div key={i} className={styles.card}>
            <p>{image.name}</p>
            <img src={image.url} className={styles.image} />
          </div>
        ))}
        {videos.map((video, i) => (
          <div key={i} className={styles.card}>
            <p>{video.name}</p>
            <video src={video.url} className={styles.image} controls />
          </div>
        ))}
      </div>
    </div>
  );
}
