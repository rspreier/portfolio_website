import React from 'react';

import Layout from '@/app/Layout';
import Info from '@/components/Info';
import ProfilePicture from '@/components/ProfilePicture';

const Header = () => {
    return (
        <div className="flex items-center flex-col justify-center text-xl bg-purple-100 h-100">
            <h1>Learn More About Myself</h1>
            <h1>↓</h1>
        </div>
    )
}

export default function About() {
    return (
        <Layout>
            <div style={{ marginTop: '15vh' }} >
                <Header />
            </div>
            {/* Scrollable content */}
            <div>
            {/* First Example */}
                <ProfilePicture
                    image_name={"/img/profile_pic.jpg"}
                    width={"w-80"}
                    height={"h-100"}
                    start_x={"-25%"} 
                    end_x={"25%"} 
                    start_y={"50%"} 
                    end_y={"150%"} 
                    start_scroll={0} 
                    end_scroll={0.33}/>
                <Info 
                    start_x={"300%"} 
                    end_x={"150%"} 
                    start_y={"-55%"} 
                    end_y={"51%"} 
                    start_scroll={0} 
                    end_scroll={0.33} 
                    description={
                        "Hello! My name is Ryan Spreier. Currently, I'm actively seeking an entry-level position in software " +
                        "development and programming. My goal is to apply my programming skills, further my understanding of " +
                        "the discipline, and make meaningful contributions to a dedicated company and team. Throughout my time " +
                        "at Oregon State University, I've gained extensive project exposure, and now I'm eager to take the next " +
                        "step in my career. I thrive in collaborative environments and have a proven track record of working " +
                        "effectively with diverse teams. Please feel free to explore this section and other parts of the page " +
                        "to discover more about the projects I've undertaken!"
                    } 
                />
                {/* Second Example */}
                <ProfilePicture 
                    image_name={"/img/skills.jpg"} 
                    width={"w-100"} 
                    height={"h-96"}
                    start_x={"-25%"} 
                    end_x={"15%"} 
                    start_y={"200%"} 
                    end_y={"245%"} 
                    start_scroll={0.33} 
                    end_scroll={0.66}/>
                <Info
                    start_x={"300%"} 
                    end_x={"155%"} 
                    start_y={"100%"} 
                    end_y={"127%"} 
                    start_scroll={0.33} 
                    end_scroll={0.66} 
                    description={
                        <div>
                        • Knowledge of multiple programming languages and object-oriented programming: C++, C, Python, HTML, CSS, Java, JavaScript, Kotlin, SQL.<br/>
                        • Experience with programming fundamentals, methodologies, and frameworks: React, REST API, AWS, Docker, Next.js, XML, Linux, Bash, ROS, Figma, Node, and Git.<br/>
                        • Completed multiple websites and projects for school assignments using Agile Methodology.
                        </div>
                    }
                />        
                {/* Third Example */}
                <ProfilePicture 
                    image_name={"/img/osu_logo.jpg"} 
                    width={"w-100"} 
                    height={"h-96"}
                    start_x={"-25%"} 
                    end_x={"17%"} 
                    start_y={"250%"} 
                    end_y={"300%"} 
                    start_scroll={0.66} 
                    end_scroll={1}/>
                <Info
                    start_x={"300%"} 
                    end_x={"155%"} 
                    start_y={"200%"} 
                    end_y={"180%"} 
                    start_scroll={0.66} 
                    end_scroll={1} 
                    description={
                        <div>
                        Education <br/>
                        Oregon State University 2024 | Corvallis, OR <br/>
                        Bachelor of Science in Computer Science <br/>
                        Computer Systems Option <br/>
                        •	GPA (4.0 scale): 3.83 <br/>
                        •	Awards: Dean’s Honor List Fall 2023, 2022, 2020; Winter 2023, 2022, 2021; Spring 2022, 2021 <br/>
                        </div>
                    }
                />
                <div style={{ height: "118vh" }}></div>
            </div>
        </Layout>
    )
}