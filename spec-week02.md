# CSE 341 - Week 02 Project Specification

## Version 1 - Book API Updates

### Feature 1: Update Books Collection and Complete Book CRUD Operations

**Description:**

Update the existing Books API to include a relationship with authors and implement complete CRUD operations. Each book must reference an existing author.

**Book Data Structure:**

- `id`: String, required, unique custom ID.
- `authorId`: String, required, references an existing author's ID.
- `title`: String, required.
- `publicationDate`: String, required, formatted as YYYY-MM-DD.

**API Routes:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Create a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

**Validation Rules:**

- All required fields must be provided.
- Book IDs must be unique.
- The authorId must reference an existing author.
- The book ID in the URL must match the book being updated.
- Invalid or missing data must return an appropriate error response.

**Expected Status Codes:**

- 200: Successful GET or PUT request.
- 201: Book successfully created.
- 204: Book successfully deleted.
- 400: Invalid or missing request data, duplicate ID, or nonexistent author reference.
- 404: Book not found.
- 500: Unexpected server error.

---

## Version 2 - Authors API

### Feature 2: Create Authors Collection and Complete Author CRUD Operations

**Description:**

Create a new Authors collection in MongoDB and implement complete CRUD operations to manage authors.

**Author Data Structure:**

- `id`: String, required, unique custom ID.
- `name`: String, required.
- `birthYear`: Integer, required.

**API Routes:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/authors` | Retrieve all authors |
| GET | `/authors/:id` | Retrieve an author by ID |
| POST | `/authors` | Create a new author |
| PUT | `/authors/:id` | Update an existing author |
| DELETE | `/authors/:id` | Delete an author |

**Validation Rules:**

- All required fields must be provided.
- Author IDs must be unique.
- The birthYear must be an integer.
- An author cannot be deleted while books reference that author through authorId.
- Invalid or missing data must return an appropriate error response.

**Expected Status Codes:**

- 200: Successful GET or PUT request.
- 201: Author successfully created.
- 204: Author successfully deleted.
- 400: Invalid or missing request data or duplicate ID.
- 404: Author not found.
- 409: Author cannot be deleted because books still reference that author.
- 500: Unexpected server error.

---

## General Requirements

- Use MongoDB to store books and authors.
- Maintain the relationship between books and authors using authorId.
- Implement proper request validation and error handling.
- Document all API endpoints using Swagger.
- Test all endpoints locally and on the deployed Render application.
- Avoid exposing internal server errors to API users.