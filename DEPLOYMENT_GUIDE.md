# Deployment Guide for Portfolio App

Since you have a separate **Backend** (Node.js) and **Frontend** (React/Vite), the best way to deploy is to treat them as two separate services that talk to each other.

We recommend using **Render (render.com)** as it makes deploying both very easy and free.

## Phase 1: Deploy the Backend
First, we need to get the API online so the frontend has something to talk to.

1.  **Log in to [Render.com](https://dashboard.render.com/)**.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository (`ruchitparmar11/Portfolio`).
4.  Configure the service:
    *   **Name**: `portfolio-backend` (or similar)
    *   **Region**: Choose the one closest to you (e.g., Singapore or Frankfurt).
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: `Free`
5.  Click **Create Web Service**.
6.  Wait for the deployment to finish. Once live, **copy the URL** (e.g., `https://portfolio-backend-xyz.onrender.com`). You will need this for Phase 2.

## Phase 2: Deploy the Frontend
Now we deploy the React app and tell it where the backend lives.

### Option A: Deploy on Vercel (Recommended for Frontend)
Vercel is extremely fast and optimized for React.

1.  **Log in to [Vercel](https://vercel.com/)**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    *   **Framework Preset**: Vite (should detect auto)
    *   **Root Directory**: Click the `Edit` button and select `frontend`.
    *   **Environment Variables**:
        *   Key: `VITE_API_URL`
        *   Value: *[Paste your Backend URL from Phase 1 here]* (remove any trailing slash `/` if present).
5.  Click **Deploy**.

### Option B: Deploy on Render (Keep everything in one place)
If you prefer to stay on Render:

1.  Click **New +** -> **Static Site**.
2.  Connect your repository.
3.  Configure the service:
    *   **Name**: `portfolio-frontend`
    *   **Root Directory**: `frontend`
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
4.  **Environment Variables**:
    *   Key: `VITE_API_URL`
    *   Value: *[Paste your Backend URL]*
5.  **Redirects/Rewrites** (Important for React Router):
    *   Go to the **Redirects/Rewrites** tab after creating.
    *   Add a rule:
        *   **Source**: `/*`
        *   **Destination**: `/index.html`
        *   **Status**: `Rewrite`
6.  Click **Create Static Site**.

## Troubelshooting
*   **CORS Issues**: If the frontend says "Network Error" or "CORS", you might need to update your backend's CORS settings.
    *   Currently, we have `app.use(cors())` which allows all origins, so it should work fine out of the box!
