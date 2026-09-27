"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/nav";

export default function EventsAsServiceNav() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const update = () => {
      setOverHero(window.scrollY < window.innerHeight * 0.82);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <Nav heroOverlay={overHero} />;
}
