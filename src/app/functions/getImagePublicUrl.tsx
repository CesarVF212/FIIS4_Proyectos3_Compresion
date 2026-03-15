// Importación Supabase.
import { SupabaseClient } from "@supabase/supabase-js";

// Bucket de imagenes.
const IMAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET;

// ------------------------------------- //
// --- FUNCIÓN: OBTENER URL PÚBLICA --- //
// ------------------------------------ //
export default function getImagePublicUrl(
  supabase: SupabaseClient,
  path: string,
) {
  if (IMAGE_BUCKET == undefined) {
    console.log(
      "ERROR: No se encuentra el IMAGE_BUCKET. Añadelo a la lista .env con NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET",
    );
    return;
  }
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
