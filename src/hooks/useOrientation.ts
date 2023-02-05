import { useEffect, useState } from "react";
import { OrientationType } from "../types";

export default function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationType>("portrait");

  useEffect(() => {
    const func = () => {
      setOrientation(window.innerWidth <= window.innerHeight - 53 ? "portrait" : "landscape");
    };
    window.addEventListener("resize", func);
    func();
    return () => {
      window.removeEventListener("resize", func);
    };
  }, []);

  return orientation;
}
