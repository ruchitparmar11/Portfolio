# Interstellar Portfolio

A React + FastAPI + MySQL portfolio with an Interstellar movie theme.

## Setup

### Backend
1.  Navigate to `backend`:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  (Optional) Set up MySQL and update `DATABASE_URL` in environment variables or `database.py`.
4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    API will be running at `http://localhost:8000`.

### Frontend
1.  Navigate to `frontend`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    App will be running at `http://localhost:5173`.

## Features
-   **Interstellar Aesthetics**: Custom CSS animations, fonts, and layout.
-   **Dynamic Data**: Fetches Projects and Skills from the FastAPI backend.
-   **Database**: MySQL integration (SQLAlchemy).

## Deploying to Vercel

This repository contains a Vite React frontend in the `frontend` folder and a Python FastAPI backend in `backend` (the backend is not configured to run on Vercel in this repo). For static hosting of the frontend on Vercel, follow the steps below.

- Add `vercel.json` (already included) which references a Vercel secret `vite_api_url` and forwards it to the client as `VITE_API_URL`.

- Recommended: keep secrets out of source control. Create a Vercel secret for your production API base URL:

```bash
# create a secret (value should be your backend base URL, e.g. https://api.example.com)
vercel secrets add vite_api_url "https://your-backend.example.com"
```

- Deploy using the Vercel CLI (or connect your Git repository in the Vercel dashboard):

```bash
# from the project root
vercel --prod
```

- Alternatively, set the environment variable directly in the Vercel dashboard under Project → Settings → Environment Variables:

    - Key: `VITE_API_URL`
    - Value: `https://your-backend.example.com`
    - Environment: `Production` (and optionally `Preview`/`Development`)

Notes:

- Client-side environment variables used by Vite must be prefixed with `VITE_`. In your frontend code, read the value with `import.meta.env.VITE_API_URL`.
- Do NOT store database credentials or other sensitive secrets in `vercel.json`; use Vercel Secrets or the Dashboard to set `DATABASE_URL` if you plan to run services on Vercel or another host.

