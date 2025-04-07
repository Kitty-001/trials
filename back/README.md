# Overview

This project implements a backend system for managing contacts and messages, as per the Exabloom Backend Technical Test. [cite: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] It uses PostgreSQL for the database and Express for the backend framework. [cite: 2, 3]

## Table of Contents

- [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [System Requirements](#system-requirements)
  - [Setup Instructions](#setup-instructions)
  - [Database Schema](#database-schema)
    - [`contacts`](#contacts)
    - [`messages`](#messages)
  - [Key Design Decisions](#key-design-decisions)
  - [Assumptions](#assumptions)
  - [API Endpoints](#api-endpoints)
  - [Performance Optimizations](#performance-optimizations)

## System Requirements

* Node.js (version 14 or later)
* PostgreSQL

## Setup Instructions

1.  Install PostgreSQL and create a database (e.g., `exabloom_db`).
2.  Clone this repository. * In your Command Prompt or Terminal, type this command and press Enter (replace "the\_url\_you\_copied" with the actual URL):
    ```bash
    git clone https://github.com/Kitty-001/trials.git
    ```
3.  Create a `.env` file in the `back` directory and add your PostgreSQL connection details:

    ```
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_NAME=your_db_name  # e.g., exabloom_db
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    ```

    * Replace the placeholders with your actual database credentials.
    * **Example:**
        ```
        DB_USER=postgres
        DB_HOST=localhost
        DB_NAME=exabloom_db
        DB_PASSWORD=mysecretpassword
        DB_PORT=5432
        ```

4.  Install the project dependencies. In the terminal, type the command and Enter:

    ```bash
    cd back
    npm install
    ```

5.  Run the database migration script to create the tables. In the terminal:

    ```bash
    npm run db:migrate
    ```

6.  Run the seed script to populate the database with dummy data. In the terminal:

    ```bash
    npm run db:seed
    ```

7.  Start the server:

    ```bash
    npm start
    ```
    * If everything is working, you should see a message that says something like "Server running..."

**You're Done!**

## Database Schema

### `contacts`

| Column       | Type             | Description                               |
| :----------- | :--------------- | :---------------------------------------- |
| `id`         | `SERIAL PRIMARY KEY` | Unique identifier for the contact         |
| `phone_number` | `VARCHAR(255)`   | Contact's phone number                    |
| `created_at`   | `TIMESTAMP WITH TIME ZONE` | Timestamp when the contact was created |
| `updated_at`   | `TIMESTAMP WITH TIME ZONE` | Timestamp when the contact was last updated |

### `messages`

| Column     | Type             | Description                                  |
| :--------- | :--------------- | :------------------------------------------- |
| `id`       | `SERIAL PRIMARY KEY` | Unique identifier for the message            |
| `contact_id` | `INTEGER REFERENCES contacts(id) ON DELETE CASCADE` | Foreign key referencing the `contacts` table |
| `content`  | `TEXT`           | Content of the message                       |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | Timestamp when the message was created   |

**Relationship:**

The `messages` table has a foreign key column, `contact_id`, which references the `id` column of the `contacts` table. This creates a one-to-many relationship: one contact can have many messages, but each message belongs to only one contact. The `ON DELETE CASCADE` clause ensures that if a contact is deleted, all associated messages are also deleted.

## Key Design Decisions

* **Database Choice:** PostgreSQL was chosen as required by the test. [cite: 2]
* **Backend Framework:** Express was used for the backend, as required. [cite: 3]
* **Data Seeding:** The `seed.js` script generates 100,000 dummy contacts and 5 million messages. It incorporates data from `message_content.csv` to ensure realistic message content. [cite: 5, 6, 7] A distribution skew was introduced in the seeding process to simulate realistic message patterns, with a subset of users being more active than others. [cite: 9, 10]
* **Query Optimization:** Indexes were added to the `messages` table (`contact_id`, `created_at`, `content`) to improve query performance. [cite: 13, 14]
* **Pagination:** The API endpoints for retrieving conversations implement pagination to handle large datasets efficiently. [cite: 11] It allows retrieval of subsequent sets of 50 conversations.

## Assumptions

* Phone numbers are assumed to be unique.
* The `message_content.csv` file is assumed to be in the root directory.
* Error handling is implemented to log errors and return 500 status codes for server errors.

## API Endpoints

* **`GET /conversations/recent`**: Retrieves the 50 most recent conversations, paginated.
    * Query parameters:
        * `page` (optional, default: 1): The page number to retrieve.
* **`GET /conversations/search`**: Searches for conversations based on message content or contact phone number.
    * Query parameters:
        * `searchValue` (required): The search string.
        * `page` (optional, default: 1): The page number to retrieve.

## Performance Optimizations

* **Indexes:** Indexes on `messages.contact_id`, `messages.created_at`, and `messages.content` significantly speed up query execution.
* **Efficient Queries:** The SQL queries are designed to minimize the amount of data processed, especially when retrieving recent conversations.
* **Pagination:** Pagination prevents overwhelming the server and client with large result sets.