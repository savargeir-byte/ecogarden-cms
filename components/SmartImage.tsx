import Image from "next/image";

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function SmartImage({ 
  src, 
  alt, 
  width = 1200, 
  height = 800,
  priority = false,
  className = ""
}: SmartImageProps) {
  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className || "w-full h-auto object-cover"}
      loading={priority ? undefined : "lazy"}
      priority={priority}
    />
  );
}
