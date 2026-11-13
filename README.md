# --- ENGLISH ---

# Research on Web Image and Video Compression

This research project investigates how to compress and upload images and videos for a web app, using Supabase Storage and the image-compression library.
It summarizes the findings on image quality and file sizes, chunked video uploads (TUS), and Supabase's file size limits, and explains the environment setup needed to run the repository.

---

## Image Conclusions

An image with an approximate resolution of 2K **loses much of its sharpness when compressed below 5MB**.

This can be used in different ways. One of them is resizing, which can be adjusted using the image-compression library for things like profile pictures.

We can set fixed sizes, for example:

- Venue photos are stored at a size of 600x600 if they are going to be square, and are compressed to a maximum size of 2-5MB.
- For other types of photos, it may be better to set a compression level but allow a more flexible format.

## Video Conclusions

Regarding upload by **chunks**, Supabase supports it **natively through a protocol called TUS** (Tus Resumable Upload Standard). It is also configurable, and it can be used so that the threshold's position can be moved within the project.

Changing it means bypassing the abstraction that Supabase offers with the client format, which makes the code more complicated. Even so, I would consider implementing it if we need to customize more aspects of the upload, possibly even building our own custom wrapper if necessary.

Supabase has a **file size limit of 50MB**. So two options need to be considered:

- Use the Pro plan (this requires payment).
- Also compress videos to a maximum size of 50MB. If they are short display videos, we should not have a problem.

## Usage

The only thing needed for this repository to work publicly is to add the following variables to your own `.env` file:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (for user-level access; the Supabase client must be changed in order to use it)
- `NEXT_PUBLIC_SUPABASE_SECRET_KEY` (server-level access — default)

- `NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET`
- `NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET`

# --- SPANISH ---

# Trabajo de investigación acerca de compresión de imagenes web.

## Conclusiones Imagenes:

Una imagen con una resolución aproximada de 2K **pierde gran parte de su nitidez al bajar de los 5MB**.

Esto se puede utilizar de formas diferentes. Siendo una de ellas poder cambiar el tamaño, cosa que se puede ajustar usando la librería image-compression para cosas como fotos de perfil.

Podemos establecer tamaños fijos, por ejemplo:

- Las fotos de los venues se guardan en un tamaño de 600x600, si van a ser cuadradas, y se comprimen a un tamaño máximo de 2-5MB.
- Para otro tipo de fotos quizás es mejor establecer una compresión pero dejar que tengan un formato mas libre.

## Conlusiones Vídeos:

Respecto a la subida por **Chunks**, Supabase la incorpora de forma **nativa mediante un protocolo que se llama TUS** (Tus Resumable Upload Standard). Igualmente, es ajustable, y se puede utilizar de forma que en el proyecto se pueda mover donde se coloca el umbral.

Cambiarlo supone que nos tengamos que saltar la abstracción que ofrece supabase con el formato del cliente, haciendo que el código se vuelva mas complicado, aunque me plantearía implementarlo si tenemos que personalizar mas aspectos de la subida, pudiendo llegar a hacer nuestro propio wrapper personalizado si hace falta.

Supabase tiene un **límite de tamaño de archivo de 50MB**. Por lo que hay que plantear dos cosas:

- Usar el plan pro (hay que pagar).
- Comprimir también los vídeos a un tamaño máximo de 50MB. Si son vídeos cortos de display no deberiamos de tener problema.

## Uso:

Lo unico que se necesita para que este repositorio funcione de forma pública es añadir a el .env propio las variables siguientes:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (para acceso a nivel de usuario, se deberá de cambiar el cliente de Supabase para poder usarla)
- NEXT_PUBLIC_SUPABASE_SECRET_KEY (acceso a nivel servidor - por defecto)

- NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET
- NEXT_PUBLIC_SUPABASE_VIDEO_BUCKET
