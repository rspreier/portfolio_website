import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function PorjectImage({ id, title, description }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
  
    return (
      <section>
          <div ref={ref}>
              <img src={`/img/${id}`} className="project_pic" alt="Project picture" />
          </div>
          <div className="text-container">
              <motion.h2 style={{ y }}>{title}</motion.h2>
              <motion.p className="project_text" style={{ y }}>{description}</motion.p>
          </div>
      </section>
    )
  }