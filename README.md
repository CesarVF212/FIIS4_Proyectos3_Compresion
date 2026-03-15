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
