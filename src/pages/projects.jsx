import Layout from '@/app/Layout';
import { useRef } from "react";

import ProjectImage from '@/components/ProjectImage';

export default function Projects() {
  return (
    <Layout>
        <div className="projects_page">
            <ProjectImage
                id={'capstone.gif'}
                title={"Senior Capstone Project - OSU | September 2022-June 2023"}
                description={
                    "One of my notable achievements includes my recent Capstone Project at Oregon State University, " +
                    "where I collaborated with a team of students and project partners from OptiTrack. We developed " +
                    "a C++ plugin for ROS2 to translate data from the company's motion capture software, conducted extensive testing, " +
                    "and created a demonstration for the school's engineering expo. My specific role in this project was " +
                    "to conduct testing of plugin with robots and created a demonstration in Python for the OSU engineering expo. " +
                    "This experience allowed me to gain practical experience in project planning, management, working with new programming languages, " +
                    "Linux OS, version control, and team collaboration."
                }/>
            <ProjectImage
                id={'timevault.gif'}
                title={"TimeVault Application Project- OSU Mobile Development | Jan 2024 - Mar 2024"}
                description={
                    "TimeVault is an application that allows users to document their interests and experiences in real-time, " +
                    "creating personalized 'time capsules' for future reflection. With features such as photo uploads from camera roll, " +
                    "taking a picture using the phone's camera app, text entries, and link attachments, users can capture diverse moments " +
                    "and memories with ease. When a user adds an item, it is buried in a 'time capsule' for the day. The calendar interface " +
                    "allows for navigation through past capsules so that users can see what they added on certain days, similar to an archive. " +
                    "Lastly, there is also an option to schedule reminders through notifications to enhance the user experience by prompting revisits " +
                    "to specific capsules on desired dates. This app uses Google's Firebase API to assist with sending notifications. This was a short term " +
                    "project for my Mobile Sofware Development class at Oregon State University and was feature on Professor Hess' Hall of Fame."
                }/>
            <ProjectImage
                id={'bet.png'}
                title={"Betting Application Project- OSU Advanced Web Development | Jan 2024 - Mar 2024"}
                description={
                    "This project spotlighted my focus on user interface design and web development. This particular project involved designing a sports " +
                    "betting application where users can engage in peer-to-peer betting, rather than traditional house-based betting. Live odds sourced from " +
                    "the Odds API fuel the betting system, offering various lines from multiple betting services. To ensure a seamless user experience, I employed " +
                    "the React.js framework to construct the frontend of the application. This was a short term project worked on with two other student in the early" +
                    "stage of development. More work is to be done on the application with improvements to the interface and adding a backend to the app."
                }/>
        </div>
    </Layout>
  )
}