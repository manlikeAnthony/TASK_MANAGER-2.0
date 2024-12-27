# TASK_MANAGER-2.0

## Overview
The Task Manager API allows users to manage tasks efficiently by providing routes to create, retrieve, update, and delete tasks. The API is built using Node.js and Express.js, with authentication and authorization features to ensure user-specific task management.

---

## Base URL
```
https://your-domain.com/api/v1/tasks
```

---

## Authentication
The API uses **JWT (JSON Web Tokens)** for authentication. Include the following header in all requests requiring authentication:

```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 1. Create a Task
**URL:** `/`

**Method:** `POST`

**Description:** Creates a new task associated with the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

**Response:**
- **201 Created**
```json
{
  "success": true,
  "task": {
    "id": "taskId",
    "title": "Task Title",
    "description": "Task Description",
    "createdBy": "userId",
    "createdAt": "2024-12-25T00:00:00.000Z"
  }
}
```

---

### 2. Get All Tasks
**URL:** `/`

**Method:** `GET`

**Description:** Retrieves all tasks associated with the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "taskId1",
      "title": "Task Title 1",
      "description": "Task Description 1",
      "createdBy": "userId",
      "createdAt": "2024-12-25T00:00:00.000Z"
    },
    {
      "id": "taskId2",
      "title": "Task Title 2",
      "description": "Task Description 2",
      "createdBy": "userId",
      "createdAt": "2024-12-25T01:00:00.000Z"
    }
  ]
}
```

---

### 3. Get a Single Task
**URL:** `/:taskId`

**Method:** `GET`

**Description:** Retrieves a specific task by its ID, ensuring it belongs to the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "task": {
    "id": "taskId",
    "title": "Task Title",
    "description": "Task Description",
    "createdBy": "userId",
    "createdAt": "2024-12-25T00:00:00.000Z"
  }
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Task not found."
}
```

---

### 4. Update a Task
**URL:** `/:taskId`

**Method:** `PATCH`

**Description:** Updates the details of a task by its ID, ensuring it belongs to the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description"
}
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "task": {
    "id": "taskId",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "createdBy": "userId",
    "updatedAt": "2024-12-25T02:00:00.000Z"
  }
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Task not found."
}
```

---

### 5. Delete a Task
**URL:** `/:taskId`

**Method:** `DELETE`

**Description:** Deletes a specific task by its ID, ensuring it belongs to the logged-in user.

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
- **200 OK**
```json
{
  "success": true,
  "message": "Task deleted successfully."
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Task not found."
}
```

---

## Error Handling
The API uses a consistent error response format:

**Example:**
```json
{
  "success": false,
  "message": "Error description here."
}
```

**Common Errors:**
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: User attempting to access a resource they don't own.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **Mongoose**
- **JWT for Authentication**
- **MongoDB** as the database

---

## Future Improvements
- Add task prioritization and due dates.
- Implement pagination for `getAllTasks`.
- Allow task sharing with other users.
- Introduce a feature for marking tasks as complete/incomplete.

---

## Contact
For support or questions about the API, contact:
- **Name**: Anthony
- **Email**: chibuikeonyejesitony@example.com

