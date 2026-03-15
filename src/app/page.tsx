"use client";

// CSS.
import styles from "./page.module.css";
// Componentes de subida de archivos.
import ImageInput from "./components/Imputs/Image/ImageInput";
import VideoInput from "./components/Imputs/Video/VideoInput";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>PRUEBAS SUBIDA</h1>
      <div className={styles.inputContainer}>
        <ImageInput></ImageInput>
      </div>
      <div className={styles.inputContainer}>
        <VideoInput></VideoInput>
      </div>
    </div>
  );
}
