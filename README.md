# 📰 NewsFeed App

A responsive news aggregator built with React that fetches real-time
headlines from NewsAPI, with category filtering, live search, and pagination.

## ✨ Features

- 🔍 Live search with debounce for better performance
- 📂 Filter news by category (General, Business, Sports, Health...)
- 📄 Pagination to browse more articles
- 💀 Skeleton loading UI for better user experience
- 🔗 Click any article to read the full story

## 🛠️ Tech Stack

- **React 19** — Functional components & Hooks
- **Vite** — Fast build tool
- **Material UI (MUI)** — UI components & theming
- **Styled Components** — Custom styled MUI components
- **Lodash** — Debounce for search optimization
- **NewsAPI** — Real-time news data

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Abdallah-Mahdy-eg/newsfeed_app.git
cd newsfeed_app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Create a `.env` file in the root:

```
VITE_NEWS_API_KEY=your_api_key_here
```

Get a free key from: https://newsapi.org

### 4. Run the app

```bash
npm run dev
```

## 🌐 Live Demo

[View Live →](YOUR_VERCEL_LINK)