# Full Stack Todo Application

A demonstration of various full-stack implementations of a Todo application, showcasing different technology stacks and architectural approaches.

## Currently Implemented Stacks

### Available Components

#### Databases
- [x] PostgreSQL
- [ ] MongoDB (planned)
- [ ] MySQL (planned)

#### Backend APIs
- [x] Express.js with Node.js
- [ ] FastAPI with Python (planned)
- [ ] Spring Boot with Java (planned)

#### Frontend Frameworks
- [x] React 18 (with Vite)
- [x] Angular 17
- [ ] Vue.js (planned)
- [ ] Next.js (planned)

#### Mobile
- [ ] React Native (planned)

### Running Different Combinations

Currently implemented combinations:

```bash
# PostgreSQL + Express + React
docker-compose up db backend frontend-react-vite

# PostgreSQL + Express + Angular
docker-compose up db backend frontend-angular
```

### Implementation Status

| Component    | Status | Docker Ready | K8s Ready | Platform     |
|-------------|--------|--------------|-----------|--------------|
| PostgreSQL  | ✅     | ✅          | ✅        | Server       |
| Express.js  | ✅     | ✅          | ✅        | Server       |
| React       | ✅     | ✅          | ✅        | Web          |
| Angular     | ✅     | ✅          | ✅        | Web          |
| Spring Boot | 🚧     | ❌          | ❌        | Server       |

## Project Structure
```
todo-app/
├── frontend/
│   ├── angular/          # Angular implementation
│   └── react-vite/       # React with Vite implementation
├── backend/
│   └── express/          # Express.js backend
├── db/
|   └── postgres/         # PostgreSQL database
├── nginx/
│   └── express/          # Express NGINX configuration
└── k8s/                  # Kubernetes configurations
```

## Features
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Responsive design
- Containerized deployment
- Kubernetes orchestration
- Multiple frontend implementations sharing the same backend

## Technical Highlights
- **TypeScript** usage across all implementations
- **Docker** multi-container setup
- **Kubernetes** deployment configurations
- **NGINX** reverse proxy configuration
- **Database** migrations and seeding
- **API** documentation

## Getting Started

### Prerequisites
- Docker Desktop with Kubernetes enabled
- Node.js 18+
- npm or yarn

### Running with Docker
```bash
# Clone the repository
git clone https://github.com/mtanfield/todos-app.git

# Start the application
docker-compose up -d
```

### Running with Kubernetes
```bash
# Apply Kubernetes configurations
kubectl apply -f k8s/
```

### Development Setup
```bash
# Install dependencies for React frontend
cd frontend/react-vite
npm install

# Install dependencies for Angular frontend
cd frontend/angular
npm install

# Install backend dependencies
cd backend/express
npm install
```

## Architecture
Build/CI:
  - react-build -> writes to volume react_dist -> mounted by nginx at /usr/share/nginx/html/react
  - angular-build -> writes to volume angular_dist -> mounted by nginx at /usr/share/nginx/html/angular

Notes:
 - Docker-compose: use builder services to populate volumes, nginx mounts them.
 - Kubernetes: use Ingress rules to route /react, /angular, /api to corresponding Services.
 - Frontends must be built with base paths '/react/' and '/angular/'.

## Contributing
This is a portfolio project, but suggestions and feedback are welcome! Please open an issue to discuss proposed changes.