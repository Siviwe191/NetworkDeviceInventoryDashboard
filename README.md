Getting Started

Clone the repository:

git clone <repository-url>
cd networkdeviceinventorydashboard

Install dependencies:

npm install

Run the development server:

npm run dev

The app will be available at http://localhost:3000

Build for Production
npm run build

Generated files will be in the dist/ directory.

Using Local Storage (Mock Backend)

Devices are stored in localStorage under the key devices.

Initial devices are preloaded on first load.

All CRUD operations update localStorage in real time.

Connecting to a Real Backend

Replace ClientService methods with real REST API calls:

GET /devices

POST /devices

PUT /devices/:id

DELETE /devices/:id

Ensure server-side validation and unique IP checks.

Consider using environment variables for API URLs:

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

Available Scripts
Command Description
npm run dev Start dev server with hot reload
npm run build Build production assets
npm run preview Preview production build locally
Notes

Browser cannot perform raw DNS lookups; DNS resolution is handled by the OS/network.

IP classification is handled on the client but server should validate data as well.

Demo Video:
<video src="demo.mp4" width="600" controls></video>


Light/Dark theme preference is saved to localStorage.
