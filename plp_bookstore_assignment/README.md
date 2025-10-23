# 📚 PLP Bookstore – MongoDB Assignment

## Overview
This project demonstrates MongoDB fundamentals using the MongoDB Node.js driver and MongoDB Atlas.

## Features
- CRUD Operations
- Advanced Queries (Projection, Sorting, Pagination)
- Aggregation Pipelines
- Indexing and Performance Analysis

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm init -y
   npm install mongodb dotenv
   ```
3. Create a `.env` file with your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=plp_bookstore
   ```
4. Insert books:
   ```bash
   node insert_books.js
   ```
5. Run all queries:
   ```bash
   node queries.js
   ```

## Screenshot
Include a screenshot of your MongoDB Atlas or Compass showing the `books` collection and sample data.
