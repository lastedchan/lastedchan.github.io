import { useEffect, useState } from "react";
import { OrientationType } from "../types";

export default function useOrientation() {
  const [orientation, setOrientation] = useState<OrientationType>("portrait");

  useEffect(() => {
    const func = () => {
      setOrientation(window.innerWidth <= window.innerHeight - 53 ? "portrait" : "landscape");
    };
    window.onresize = func;
    func();
    return () => {
      window.onresize = null;
    };
  }, []);

  return orientation;
}
