CREATE TABLE IF NOT EXISTS projects (
	id BIGSERIAL PRIMARY KEY,
	category VARCHAR(20) NOT NULL,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	technologies_csv TEXT NOT NULL,
	image_url VARCHAR(255) NOT NULL,
	image_alt VARCHAR(255) NOT NULL,
	sort_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS experiences (
	id BIGSERIAL PRIMARY KEY,
	position VARCHAR(255) NOT NULL,
	company VARCHAR(255) NOT NULL,
	period VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	sort_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(120) NOT NULL,
	email VARCHAR(254) NOT NULL,
	subject VARCHAR(200) NOT NULL,
	message TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO projects (category, title, description, technologies_csv, image_url, image_alt, sort_order)
VALUES
	('app', 'Senior Capstone Project - OSU | September 2022-June 2023',
	 $$One of my notable achievements includes my recent Capstone Project at Oregon State University, where I collaborated with a team of students and project partners from OptiTrack. We developed a C++ plugin for ROS2 to translate data from the company's motion capture software, conducted extensive testing, and created a demonstration for the school's engineering expo. My specific role in this project was to conduct testing of plugin with robots and created a demonstration in Python for the OSU engineering expo. This experience allowed me to gain practical experience in project planning, management, working with new programming languages, Linux OS, version control, and team collaboration.$$,
	 'C++,Python,ROS2,Linux,Git',
	 '/img/capstone.gif',
	 'Capstone demo showing ROS2 plugin output with robot testing',
	 1),
	('app', 'TimeVault Application Project - OSU Mobile Development | Jan 2024 - Mar 2024',
	 $$TimeVault is an application that allows users to document their interests and experiences in real-time,
	    creating personalized 'time capsules' for future reflection. With features such as photo uploads from camera roll,
		taking a picture using the phone's camera app, text entries, and link attachments, users can capture diverse moments
		and memories with ease. When a user adds an item, it is buried in a ''time capsule'' for the day. The calendar interface
		allows for navigation through past capsules so that users can see what they added on certain days, similar to an archive.
		Lastly, there is also an option to schedule reminders through notifications to enhance the user experience by prompting revisits
		to specific capsules on desired dates. This app uses Google's Firebase API to assist with sending notifications. This was a short term
		project for my Mobile Sofware Development class at Oregon State University and was feature on Professor Hess' Hall of Fame.$$,
	 'React Native,Firebase,JavaScript,Git',
	 '/img/timevault.gif',
	 'TimeVault mobile app interface with calendar and time-capsule entries',
	 2),
	('web', 'Betting Application Project - OSU Advanced Web Development | Jan 2024 - Mar 2024',
	 $$This project spotlighted my focus on user interface design and web development. This particular project involved designing a sports
		betting application where users can engage in peer-to-peer betting, rather than traditional house-based betting. Live odds sourced from
		the Odds API fuel the betting system, offering various lines from multiple betting services. To ensure a seamless user experience, I employed
		the React.js framework to construct the frontend of the application. This was a short term project worked on with two other student in the early
		stage of development. More work is to be done on the application with improvements to the interface and adding a backend to the app.$$,
	 'React,JavaScript,API Integration,Git',
	 '/img/bet.png',
	 'Sports betting web application interface with peer-to-peer features',
	 3)
ON CONFLICT DO NOTHING;

INSERT INTO experiences (position, company, period, description, sort_order)
VALUES
	('Techinical Editor', '3D PDF Consortium', 'May 2020 - June 2020',
	 $$Edited the ISO 24064 standard, ensuring technical content was correctly and consistently formatted and well documented according to International Standards Organization (ISO) guidelines. Used Adobe Acrobat Reader and Microsoft Word to review and prepare documentation for publication.$$,
	 3),
	('Contract Developer Work', 'Elysium', 'July 2024',
	 $$Developed a command-line application in Java to embed PDF attachments into existing PDF documents using iText. Utilized Apache Maven for dependency management and build automation.$$,
	 2),
	('Software Developer / Tester', 'Information Systems Laboratories', 'December 2024 - Present',
	 $$I contributed on the development and testing of simulation software and web-based applications as part of a cross-functional team. I have built full-stack simulation features using Java, Go, Wails, WebSockets, and HTMX, with primary responsibility for GUI design and backend communication. I am also responsible for unit, integrated, and regression testing across multiple applications to ensure functional accuracy and system reliability. This includes developing automated, requirement based tests using test-driven development practices to improve code coverage, maintainability, and refactoring safety.$$,
	 1)
ON CONFLICT DO NOTHING;
