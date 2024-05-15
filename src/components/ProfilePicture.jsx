import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ProfilePicture = ({ image_name, width, height, start_x, end_x, start_y, end_y, start_scroll, end_scroll }) => {
    const { scrollYProgress } = useScroll()
    
    // Define animation for profile picture
    const xPos = useTransform(scrollYProgress, [start_scroll, end_scroll], [start_x, end_x])
    const yPos = useTransform(scrollYProgress, [start_scroll, end_scroll], [start_y, end_y])

    return (
        <motion.div style={{ x: xPos, y: yPos }}>
            <div>
                <img className={`rounded-lg ${width} ${height} object-cover`} src={image_name} alt="Profile" />
            </div>
        </motion.div>
    );
};

export default ProfilePicture