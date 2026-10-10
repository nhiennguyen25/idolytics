# Idolytics

An AI-powered dance coaching platform that uses computer vision to help learners practice choreography and receive feedback on movement and timing.

## Project Overview

Idolytics compares a learner's movements against a prerecorded choreography reference using pose estimation and movement analysis.

Our hackathon prototype focuses on a short choreography segment and aims to provide an interactive practice experience:

**Watch → Dance → Get Coached → Review → Try Again**

## Technology Stack

- React
- Vite
- JavaScript
- MediaPipe Pose Landmarker
- Canvas API
- Git and GitHub

Reference landmarks will be stored in JSON. A Python backend and persistent storage are optional stretch goals.

## Running the Application

1. Install [Node.js](https://nodejs.org/).
2. Clone this repository.
3. Open a terminal in the `frontend` directory.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal.

## Project Structure

- `frontend/` — React application.
- `data/` — Reference landmark data.
- `docs/` — Project documentation.

## Team

Built collaboratively for Knight Hacks IX.

## Project Status

Initial project setup. Features and implementation are in progress.