// --------------------- //
// --- IMPORTACIONES --- //
// --------------------- //

// Compresión de imagenes.
import imageCompression from "browser-image-compression";

// Supabase.
import { SupabaseClient } from "@supabase/supabase-js";

// ------------------ //
// --- CONSTANTES --- //
// ------------------ //

const IMAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET;
const COMPRESSED_SIZE_MB = 2;
const MAX_WIDTH_PX = 1920;

// ------------------------------------------ //
// --- FUNCIÓN: SUBIR IMAGEN DESDE PUBLIC --- //
// ------------------------------------------ //

export default async function uploadPhoto(
  supabase: SupabaseClient,
  file: File,
  name: string,
  compressedSizeMB = COMPRESSED_SIZE_MB,
  maxWidthPX = MAX_WIDTH_PX,
) {
  // Verificamos que el bucket sea un string válido.
  if (IMAGE_BUCKET == undefined) {
    console.log(
      "ERROR: No se encuentra el IMAGE_BUCKET. Añadelo a la lista .env con NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET",
    );
    return;
  }

  // Comprimimos la imagen hasta ocupar 2MB.
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: compressedSizeMB,
      maxWidthOrHeight: maxWidthPX,
      useWebWorker: true,
    });

    // Tras comprimir, subimos a la base de datos de supabase.
    await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(`${name}.jpg`, compressed, {
        contentType: compressed.type,
        upsert: true,
        cacheControl: "31536000", // 1 año.
      });
  } catch (error) {
    console.log(error);
  }
}
