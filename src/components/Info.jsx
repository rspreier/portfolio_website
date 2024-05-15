import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'

const Info = ({ start_x, end_x, start_y, end_y, start_scroll, end_scroll, description }) => {
    const { scrollYProgress } = useScroll()
    
    // Define animation for content
    const xPos = useTransform(scrollYProgress, [start_scroll, end_scroll], [start_x, end_x])
    const yPos = useTransform(scrollYProgress, [start_scroll, end_scroll], [start_y, end_y])

    return (
        <motion.div className="container right" style={{ x: xPos, y: yPos }}>
            <div className="content">
                <p>{description}</p>
            </div>
        </motion.div>
    );
};

export default Info