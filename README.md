# NewAge Libraries - Backend API

A comprehensive library management system built with Node.js, Express, and MongoDB. Manage books, authors, students, and librarians with a RESTful API.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)

## Features

- 📚 **Book Management** - Create, read, update, delete books
- 👨‍✍️ **Author Management** - Manage book authors
- 👨‍🎓 **Student Management** - Register and manage students
- 👨‍💼 **Librarian Management** - Manage librarian accounts
- 🔄 **Book Borrowing** - Track book borrowing and returns
- ⏰ **Overdue Tracking** - Monitor overdue books

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Postman** (optional, for API testing) - [Download](https://www.postman.com/downloads/)

## Setup Instructions

### Step 1: Clone or Navigate to Project Directory

```bash
cd "C:\Users\hp\Documents\BACKEND\NEWAGE LIBRARIES"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `dotenv` - Environment variable management
- `nodemon` - Development server auto-reload

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Windows PowerShell
New-Item -Name ".env" -Value "PORT=4206`mongodb=mongodb://localhost:27017/librarydb" -Force

# Or create manually and add content below
```

**`.env` file content:**

```
PORT=4206
mongodb=mongodb://localhost:27017/librarydb
```

### Step 4: Verify MongoDB Connection

Ensure MongoDB is running:

```bash
# For MongoDB Community (local)
mongod

# Or verify MongoDB Atlas credentials in .env
```

### Step 5: Start the Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
node app.js
```

You should see:
```
Server is running on port 4206
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `4206` |
| `mongodb` | MongoDB connection string | `mongodb=mongodb://localhost:27017/librarydb` |

---

## API Documentation

**Base URL:** `http://localhost:4206`

### 1. Books API

#### Get All Books
```
GET /books
```

**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "507f1f77bcf86cd799439012",
    "isbn": "9780743273565",
    "publishedYear": 1925,
    "quantity": 5,
    "availableQuantity": 3,
    "borrowedBy": [],
    "createdAt": "2024-04-07T10:30:00.000Z"
  }
]
```

#### Get Book by ID
```
GET /books/:id
```

**Parameter:**
- `id` - Book MongoDB ID (string)

**Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "507f1f77bcf86cd799439012",
  "isbn": "9780743273565",
  "publishedYear": 1925,
  "quantity": 5,
  "availableQuantity": 3
}
```

#### Get Overdue Books
```
GET /books/overdue
```

**Response:** `200 OK` - Returns books not returned past due date

#### Create Book
```
POST /books
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "507f1f77bcf86cd799439012",
  "isbn": "9780743273565",
  "publishedYear": 1925,
  "quantity": 5
}
```

**Response:** `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "507f1f77bcf86cd799439012",
  "isbn": "9780743273565",
  "publishedYear": 1925,
  "quantity": 5,
  "availableQuantity": 5
}
```

#### Update Book
```
PUT /books/:id
Content-Type: application/json
```

**Parameters:**
- `id` - Book MongoDB ID (string)

**Request Body:** (all fields optional)
```json
{
  "title": "The Great Gatsby - Remastered",
  "quantity": 10,
  "publishedYear": 1925
}
```

**Response:** `200 OK`

#### Delete Book
```
DELETE /books/:id
```

**Parameters:**
- `id` - Book MongoDB ID (string)

**Response:** `204 No Content` or `200 OK`

#### Borrow Book
```
POST /books/:id/borrow
Content-Type: application/json
```

**Parameters:**
- `id` - Book MongoDB ID (string)

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439020",
  "borrowDate": "2024-04-07",
  "dueDate": "2024-04-21"
}
```

**Response:** `200 OK`
```json
{
  "message": "Book borrowed successfully",
  "bookId": "507f1f77bcf86cd799439011",
  "studentId": "507f1f77bcf86cd799439020"
}
```

#### Return Book
```
POST /books/:id/return
Content-Type: application/json
```

**Parameters:**
- `id` - Book MongoDB ID (string)

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439020",
  "returnDate": "2024-04-18"
}
```

**Response:** `200 OK`
```json
{
  "message": "Book returned successfully",
  "bookId": "507f1f77bcf86cd799439011",
  "studentId": "507f1f77bcf86cd799439020"
}
```

---

### 2. Authors API

#### Get All Authors
```
GET /authors
```

**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "F. Scott Fitzgerald",
    "biography": "American writer",
    "birthYear": 1896,
    "books": []
  }
]
```

#### Get Author by ID
```
GET /authors/:id
```

**Parameters:**
- `id` - Author MongoDB ID (string)

**Response:** `200 OK`

#### Create Author
```
POST /authors
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "F. Scott Fitzgerald",
  "biography": "American writer of the 20th century",
  "birthYear": 1896
}
```

**Response:** `201 Created`

#### Update Author
```
PUT /authors/:id
Content-Type: application/json
```

**Parameters:**
- `id` - Author MongoDB ID (string)

**Request Body:** (all fields optional)
```json
{
  "name": "F. Scott Fitzgerald",
  "biography": "Updated biography"
}
```

**Response:** `200 OK`

#### Delete Author
```
DELETE /authors/:id
```

**Parameters:**
- `id` - Author MongoDB ID (string)

**Response:** `204 No Content` or `200 OK`

---

### 3. Students API

#### Get All Students
```
GET /students
```

**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "John Doe",
    "email": "john@example.com",
    "studentId": "STU001",
    "borrowedBooks": []
  }
]
```

#### Get Student by ID
```
GET /students/:id
```

**Parameters:**
- `id` - Student MongoDB ID (string)

**Response:** `200 OK`

#### Create Student
```
POST /students
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "studentId": "STU001"
}
```

**Response:** `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "John Doe",
  "email": "john@example.com",
  "studentId": "STU001",
  "borrowedBooks": []
}
```

---

### 4. Librarians API

#### Get All Librarians
```
GET /librarians
```

**Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439030",
    "name": "Jane Smith",
    "email": "jane@library.com",
    "employeeId": "LIB001"
  }
]
```

#### Create Librarian
```
POST /librarians
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@library.com",
  "employeeId": "LIB001"
}
```

**Response:** `201 Created`
```json
{
  "_id": "507f1f77bcf86cd799439030",
  "name": "Jane Smith",
  "email": "jane@library.com",
  "employeeId": "LIB001"
}
```

---

## Postman Collection

### Importing the Collection

1. Open **Postman**
2. Click **Import** → **Paste raw text**
3. Paste the following collection JSON:

```json
{
  "info": {
    "name": "NewAge Libraries API",
    "description": "Complete API collection for library management system",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Books",
      "item": [
        {
          "name": "Get All Books",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/books",
              "host": ["{{BASE_URL}}"],
              "path": ["books"]
            }
          }
        },
        {
          "name": "Get Book by ID",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/books/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["books", ":id"]
            }
          }
        },
        {
          "name": "Get Overdue Books",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/books/overdue",
              "host": ["{{BASE_URL}}"],
              "path": ["books", "overdue"]
            }
          }
        },
        {
          "name": "Create Book",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"title\": \"The Great Gatsby\", \"author\": \"\", \"isbn\": \"9780743273565\", \"publishedYear\": 1925, \"quantity\": 5}"
            },
            "url": {
              "raw": "{{BASE_URL}}/books",
              "host": ["{{BASE_URL}}"],
              "path": ["books"]
            }
          }
        },
        {
          "name": "Update Book",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"title\": \"Updated Title\", \"quantity\": 10}"
            },
            "url": {
              "raw": "{{BASE_URL}}/books/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["books", ":id"]
            }
          }
        },
        {
          "name": "Delete Book",
          "request": {
            "method": "DELETE",
            "url": {
              "raw": "{{BASE_URL}}/books/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["books", ":id"]
            }
          }
        },
        {
          "name": "Borrow Book",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"studentId\": \"\", \"borrowDate\": \"2024-04-07\", \"dueDate\": \"2024-04-21\"}"
            },
            "url": {
              "raw": "{{BASE_URL}}/books/:id/borrow",
              "host": ["{{BASE_URL}}"],
              "path": ["books", ":id", "borrow"]
            }
          }
        },
        {
          "name": "Return Book",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"studentId\": \"\", \"returnDate\": \"2024-04-18\"}"
            },
            "url": {
              "raw": "{{BASE_URL}}/books/:id/return",
              "host": ["{{BASE_URL}}"],
              "path": ["books", ":id", "return"]
            }
          }
        }
      ]
    },
    {
      "name": "Authors",
      "item": [
        {
          "name": "Get All Authors",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/authors",
              "host": ["{{BASE_URL}}"],
              "path": ["authors"]
            }
          }
        },
        {
          "name": "Get Author by ID",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/authors/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["authors", ":id"]
            }
          }
        },
        {
          "name": "Create Author",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"F. Scott Fitzgerald\", \"biography\": \"American writer\", \"birthYear\": 1896}"
            },
            "url": {
              "raw": "{{BASE_URL}}/authors",
              "host": ["{{BASE_URL}}"],
              "path": ["authors"]
            }
          }
        },
        {
          "name": "Update Author",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"F. Scott Fitzgerald\", \"biography\": \"Updated biography\"}"
            },
            "url": {
              "raw": "{{BASE_URL}}/authors/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["authors", ":id"]
            }
          }
        },
        {
          "name": "Delete Author",
          "request": {
            "method": "DELETE",
            "url": {
              "raw": "{{BASE_URL}}/authors/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["authors", ":id"]
            }
          }
        }
      ]
    },
    {
      "name": "Students",
      "item": [
        {
          "name": "Get All Students",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/students",
              "host": ["{{BASE_URL}}"],
              "path": ["students"]
            }
          }
        },
        {
          "name": "Get Student by ID",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/students/:id",
              "host": ["{{BASE_URL}}"],
              "path": ["students", ":id"]
            }
          }
        },
        {
          "name": "Create Student",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"studentId\": \"STU001\"}"
            },
            "url": {
              "raw": "{{BASE_URL}}/students",
              "host": ["{{BASE_URL}}"],
              "path": ["students"]
            }
          }
        }
      ]
    },
    {
      "name": "Librarians",
      "item": [
        {
          "name": "Get All Librarians",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{BASE_URL}}/librarians",
              "host": ["{{BASE_URL}}"],
              "path": ["librarians"]
            }
          }
        },
        {
          "name": "Create Librarian",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"Jane Smith\", \"email\": \"jane@library.com\", \"employeeId\": \"LIB001\"}"
            },
            "url": {
              "raw": "{{BASE_URL}}/librarians",
              "host": ["{{BASE_URL}}"],
              "path": ["librarians"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "BASE_URL",
      "value": "http://localhost:4206",
      "type": "string"
    }
  ]
}
```

### Setting Up Postman Variables

1. In Postman, click **Environments** → **New**
2. Name it: `NewAge Libraries`
3. Add these variables:
   - **BASE_URL**: `http://localhost:4206`
   - **BOOK_ID**: (paste a book ID after creating a book)
   - **AUTHOR_ID**: (paste an author ID after creating an author)
   - **STUDENT_ID**: (paste a student ID after creating a student)

4. Select the environment before making requests

### Quick Test Steps

1. **Start server**: `npm run dev`
2. **Create Author** → Copy the returned `_id`
3. **Create Book** → Paste author ID in the body
4. **Create Student** → Copy the returned `_id`
5. **Borrow Book** → Use book ID and student ID
6. **Return Book** → Use book ID and student ID

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 4206 already in use | Change `PORT` in `.env` file |
| MongoDB connection error | Verify MongoDB is running or check `MONGO_URI` |
| Dependencies not installed | Run `npm install` again |
| Server not reloading on save | Ensure `nodemon` is running with `npm run dev` |

---

## License

ISC

---

## Support

For issues or questions, check your controllers and models implementation in the respective directories.
