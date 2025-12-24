# BeyondChats Article Processing & Enhancement Suite

A complete system designed to scrape, manage, and improve blog content using AI. This project showcases a pipeline that goes from raw data extraction to content optimization driven by an LLM.

## Project Overview
This project has three main parts integrated into a single repository:
1. **Laravel Backend**: Provides APIs for managing articles.
2. **NodeJS Automation**: Handles scraping Google Search and enhancing content with an LLM.
3. **ReactJS Frontend**: A user-friendly, responsive dashboard to compare original and enhanced articles.

## Tech Stack
- **Frontend**: ReactJS, TailwindCSS, Lucide Icons, React Markdown.
- **Backend**: Laravel 10+, MySQL.
- **Automation**: NodeJS, Puppeteer (for scraping), GROQ API(LLM).

## Local Setup Instructions

### 1. Backend (Laravel)
1. Go to the `/backend` directory.
2. Run `composer install`.
3. Copy `.env.example` to `.env` and set up your database credentials.
4. Run `php artisan migrate`.
5. Start the server with `php artisan serve`.

### 2. Automation Script (NodeJS)
1. Go to the `/automation` directory.
2. Run `npm install`.
3. Add your `LLM_API_KEY` to the `.env` file.
4. Run the script with `node index.js`.

### 3. Frontend (React)
1. Go to the `/frontend` directory.
2. Run `npm install`.
3. Start the development server with `npm run dev`.

## Data Flow Summary
1. **Scrape**: The five oldest articles are fetched from BeyondChats and stored via the Laravel API.
2. **Process**: The NodeJS script fetches the latest article, searches Google, scrapes the top results, and calls the LLM.
3. **Publish**: The enhanced article is saved back to the database.
4. **View**: The React frontend displays both versions for comparison.

## Architecture Diagram
<img width="2726" height="985" alt="image" src="https://github.com/user-attachments/assets/dcf680a1-0753-41b4-a2a0-09a85c09f8f0" />
