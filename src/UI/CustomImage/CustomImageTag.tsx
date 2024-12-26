import { ImgHTMLAttributes, useEffect, useState } from "react";

function ImgTag(data: ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
   const [error, setError] = useState(false);

   useEffect(() => {
      setError(false);
   }, [data.src]);

   return !data.src || error ? (
      <></>
   ) : (
      <img {...data} onError={() => setError(true)} />
   );
}

export default ImgTag;
