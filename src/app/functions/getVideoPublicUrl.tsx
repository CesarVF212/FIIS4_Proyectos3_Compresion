// Importación Supabase.
import { SupabaseClient } from "@supabase/supabase-js";

// Bucket de videos.
const VIDEO_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET;

// ------------------------------------- //
// --- FUNCIÓN: OBTENER URL PÚBLICA --- //
// ------------------------------------ //
export default function getVideoPublicUrl(
  supabase: SupabaseClient,
  path: string,
) {
  if (VIDEO_BUCKET == undefined) {
    console.log(
      "ERROR: No se encuentra el VIDEO_BUCKET. Añadelo a la lista .env con NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET",
    );
    return;
  }
  const { data } = supabase.storage.from(VIDEO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
