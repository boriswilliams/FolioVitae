export function Media({ src, alt }: { src: string; alt: string; }) {
  return /\.(mp4|webm|ogg)$/i.test(src)
    ? <video src={src} aria-label={alt} autoPlay loop muted playsInline />
    : <img src={src} alt={alt} loading='lazy' />;
}
