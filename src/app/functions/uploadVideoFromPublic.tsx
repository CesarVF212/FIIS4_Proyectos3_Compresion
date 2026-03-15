// --------------------- //
// --- IMPORTACIONES --- //
// --------------------- //

// Supabase.
import { SupabaseClient } from "@supabase/supabase-js";

// ------------------------------------------ //
// --- FUNCIÓN: SUBIR VIDEO DESDE PUBLIC --- //
// ------------------------------------------ //

const admitedFormats = ["video/mp4", "video/webp"];
const VIDEO_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET;

export default async function uploadVideoFromPublic(
  supabase: SupabaseClient,
  file: File,
  name: string,
) {
  // Condición de verificación de formato.
  if (!admitedFormats.includes(file.type)) {
    console.error("Formato no admitido:", file.type);
    return;
  }

  if (VIDEO_BUCKET == undefined) return;
  const { data, error } = await supabase.storage
    .from(VIDEO_BUCKET)
    .upload(`${name}.mp4`, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) console.error("Error:", error.message);
  else console.log("Subida exitosa:", data.path);
}
