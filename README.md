# Smart Traffic Management System - Frontend

A modern, responsive React.js + Vite + Tailwind CSS frontend for the Smart Traffic Management System.

## Features

- **Authentication**: Login, registration, JWT token management
- **Live Traffic Monitoring**: Real-time traffic status with WebSocket updates
- **Dashboard**: Comprehensive admin dashboard with key metrics
- **Traffic Maps**: Interactive maps with congestion visualization
- **Signal Management**: View and control traffic signals
- **Incident Reporting**: Create and track traffic incidents
- **Violation Management**: Review and manage traffic violations
- **Emergency Priority**: Manage emergency vehicle requests
- **Analytics**: Charts and reports on traffic patterns
- **User Management**: Manage system users and roles
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Axios
- Recharts
- Leaflet
- React Icons
- Zustand (State Management)
- React Query

## Project Structure

```
src/
├── components/          # Reusable React components
├── pages/               # Page components
├── layouts/             # Layout wrappers
├── services/            # API calls and utilities
├── hooks/               # Custom React hooks
├── store/               # State management (Zustand)
├── types/               # TypeScript interfaces
├── config/              # Configuration files
├── assets/              # Images, icons, etc
├── styles/              # Global styles
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend API running on http://localhost:8000

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd smart-traffic-management-system/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your backend URL and API keys.

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at http://localhost:5173

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## API Integration

The frontend connects to the FastAPI backend via REST APIs:
- **Authentication**: `/api/v1/auth/`
- **Roads**: `/api/v1/roads/`
- **Intersections**: `/api/v1/intersections/`
- **Signals**: `/api/v1/signals/`
- **Sensors**: `/api/v1/sensors/`
- **Traffic**: `/api/v1/traffic/`
- **Incidents**: `/api/v1/incidents/`
- **Violations**: `/api/v1/violations/`
- **Emergency**: `/api/v1/emergency/`
- **Notifications**: `/api/v1/notifications/`
- **Routes**: `/api/v1/routes/`

## WebSocket Connection

Real-time updates via WebSocket:
```javascript
ws://localhost:8000/ws/traffic
```

## Default Credentials

- **Email**: admin@traffic.local
- **Password**: Admin123!

## Features by Role

### Admin
- Full system access
- User management
- Settings and configuration
- All reports and analytics

### Operator
- Traffic monitoring
- Signal control
- Incident management
- Report generation

### Manager
- View dashboards and reports
- Manage incidents
- Traffic analysis

### Viewer
- View-only access
- Traffic status
- Reports

## Key Pages

- **/login** - User authentication
- **/register** - New user registration
- **/dashboard** - Main admin dashboard
- **/traffic/monitor** - Real-time traffic monitoring
- **/traffic/density** - Traffic density analysis
- **/signals/management** - Traffic signal management
- **/incidents/report** - Incident reporting
- **/violations/review** - Violation management
- **/emergency** - Emergency vehicle priority
- **/routes** - Alternative route recommendations
- **/analytics** - Traffic analytics and reports
- **/sensors** - IoT sensor management
- **/notifications** - User notifications
- **/users** - User management (admin only)
- **/settings** - System settings (admin only)

## Development

### Running with Backend

Make sure your backend is running:
```bash
cd backend
docker-compose up
```

Then run frontend in another terminal:
```bash
cd frontend
npm run dev
```

### Building Components

Create new components in `src/components/`:
```jsx
// src/components/MyComponent.jsx
export default function MyComponent({ prop1, prop2 }) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

### Using State Management

```javascript
import { useStore } from '@/store';

function MyComponent() {
  const { user, setUser } = useStore();
  // Use store state
}
```

### API Calls

```javascript
import { apiClient } from '@/services/api';

const fetchData = async () => {
  try {
    const response = await apiClient.get('/endpoint');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Styling

The project uses Tailwind CSS with a custom configuration:
- Primary color: Navy blue (#1e3a8a)
- Secondary color: Sky blue (#0ea5e9)
- Accent color: White (#ffffff)
- Dark backgrounds: #0f172a

## Performance Optimization

- Lazy loading with React.lazy()
- Code splitting with Vite
- Image optimization
- Memoization for expensive computations
- Virtual scrolling for large lists

## Error Handling

- Global error boundary
- API error interceptors
- User-friendly error messages
- Automatic retry logic

## Testing

To add tests:
```bash
npm install --save-dev vitest @testing-library/react
npm run test
```

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Docker
```bash
docker build -t smart-traffic-frontend .
docker run -p 80:80 smart-traffic-frontend
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please open a GitHub issue or contact the development team.
