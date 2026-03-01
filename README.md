# India Granite
This is a monorepo setup for the India Granite platform.

## Structure
- `client/`: Frontend application (Vite + React)
- `server/`: Backend service (Express + REST APIs)
- `shared/`: Shared models/schema

## Deployment
- **Frontend** should be deployed on **Vercel** (`client/vercel.json` included). Ensure environment variable `VITE_API_URL` points to backend.
- **Backend** should be deployed on **Render** (Node.js). Ensure `node server/dist/index.js` runs successfully and environment variables in `.env` are supplied.
