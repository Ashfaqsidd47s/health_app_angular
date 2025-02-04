# Health App - Single Page Application (SPA)

## Introduction
This is a **Health App** built as a **Single Page Application (SPA)**. The primary goal was to create a seamless experience where users can interact with different sections of the application without full-page reloads. The app consists of three main pages: **Home**, **Workouts**, and **Progress**.

## Assumptions
While developing this project, i made these assumptions:
- By "SPA" (Single Page Application) i assume it ment  **navigating between different sections without full-page reloads**.
- SPA does **not** necessarily mean keeping everything on a single route.
- The application should have a structured navigation system with distinct pages while maintaining a seamless user experience.
- I have added three pages 

- on submitting the form i have delayed it for 2 seconds as it will be in future when requesting to server and showing the disabled functionality 
- for now i have kept only a few types of workouts not aded custom workout but i have stored it in enums so that as a dev we can add other workouts just in that enum in consts same goes for the paginations 
- in the wokouts page  i have make it to visible only to the sise of scrreen so that all rows and page chaing can be done at a fixed point otherwise on changing from 5 to 20 elemnts it would be so huge change and so i kept it screen size its responsive even the charts page as well 
- I used angular 18 after i got a bunch of dependencies issus in latest one (which by default is using stand alone components) so i continued with stand alone componets 

## Features
### **Home Page**
- Users can add their workouts.
- Full validation is applied to ensure correct data entry.

### **Workouts Page**
- Displays a list of all users and their workouts and total workout time
- Core functionality includes viewing multiple users and their workout details.
- Core functionality of **pagination** selecting multiple rows etc.

### **Progress Page**
- A dashboard that visualizes workout data.
- Includes **bar and pie charts** to represent user progress.

## Setup Instructions
To set up and run the project locally, follow these steps:

1. **Clone the repository** or **download the ZIP file**:
   ```sh
   git clone https://github.com/Ashfaqsidd47s/health_app_angular
   cd health-app
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Run on local system**:
   ```sh
   npm start
   ```
4. **For Running Tests**:
   ```sh
   npm run test
   ```
**Note:** angular version ``` 18.2.0 ``` with tailwind css version ```3.4.17``` 

## Code Coverage 
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)
for 1 component 1 service as mentioned

**Overall Coverage**
![Coverage](https://img.shields.io/badge/Coverage-88%25-brightgreen)

you can verify it localy


## Conclusion
This hope you will like it all the functionalities are done completely and also i have writen tests as well for the compnents and services except the graph one which was optional so i hope you will keep a loos hand on that part
i tried to write clean code the folder strucure is standard.