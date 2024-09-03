import { useEffect, useState } from "react";

interface ICustomImageProps {
   src: string | undefined,
   alt?: string,
   className?: string,
   style?: React.CSSProperties
}


function ImgTag(
   { src, alt = "", className, style }: ICustomImageProps
): JSX.Element {

   const [error, setError] = useState(false);

   useEffect(() => {
      setError(false);
   }, [src])

   if (!src) {
      return <></>;
   }

   return (
      <>
         {error ? <></> : <img
            style={style}
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
         />
         }
      </>
   );
}

export default ImgTag;