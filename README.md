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
