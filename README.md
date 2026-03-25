# Weather App

![Project](https://img.shields.io/badge/Project-Frontend-0ea5e9)
![Integration](https://img.shields.io/badge/API-OpenWeatherMap-16a34a)

## 🎨 Live Demo
Open [`index.html`](index.html) in your browser to check the weather.

## Overview
Real-time weather application demonstrating API integration and async JavaScript workflows.

## Tech Stack
- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## Setup
1. Create a free API key from https://openweathermap.org/api
2. Open `app.js` and add your key:
   ```js
   const API_KEY = 'your_key_here';
   ```
3. Open `index.html` in a browser.

## Learning Outcomes
- Fetch and display API data safely
- Handle loading and error states for user input
- Build reusable UI rendering logic

## Common Mistakes
- Exposing API keys in public commits
- Not handling invalid city names or failed responses

## Next Improvements
- Add a 5-day forecast view
- Add geolocation-based weather detection
