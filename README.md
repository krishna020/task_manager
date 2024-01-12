
cd task-manager-Mern-Stack
 Install dependencies:
    cd backend
    npm install
 Create a `.env` file in the `backend` directory and configure the following environment variables:

  MONGODB_URI=your-mongodb-uri

cd frontend
npm install

 Start the Backend Server:

npm start
 Start the Frontend:

npm run dev

You can access it at http://localhost:5173 



## API Endpoints

### Get Tasks

GET /api/v1/tasks

### Create Task

POST /api/v1/tasks


### Update Task

PATCH /api/v1/tasks/:id

### Delete Task

DELETE /api/v1/tasks/:id

### Complete Task

PATCH /api/v1/tasks/:id/complete

npm run build


