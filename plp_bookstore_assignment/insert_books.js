const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const books = db.collection("books");

    const sampleBooks = [
      { title: "The Pragmatic Programmer", author: "Andrew Hunt", genre: "Technology", published_year: 1999, price: 45.5, in_stock: true, pages: 352, publisher: "Addison-Wesley" },
      { title: "Clean Code", author: "Robert C. Martin", genre: "Technology", published_year: 2008, price: 50, in_stock: true, pages: 464, publisher: "Prentice Hall" },
      { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 25, in_stock: true, pages: 320, publisher: "Penguin Random House" },
      { title: "1984", author: "George Orwell", genre: "Fiction", published_year: 1949, price: 20, in_stock: false, pages: 328, publisher: "Secker & Warburg" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 30, in_stock: true, pages: 281, publisher: "J.B. Lippincott & Co." },
      { title: "The Alchemist", author: "Paulo Coelho", genre: "Adventure", published_year: 1988, price: 18, in_stock: true, pages: 208, publisher: "HarperOne" },
      { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", published_year: 2011, price: 35, in_stock: true, pages: 498, publisher: "Harper" },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, price: 22, in_stock: false, pages: 180, publisher: "Charles Scribner's Sons" },
      { title: "Deep Work", author: "Cal Newport", genre: "Self-help", published_year: 2016, price: 27, in_stock: true, pages: 304, publisher: "Grand Central Publishing" },
      { title: "Educated", author: "Tara Westover", genre: "Memoir", published_year: 2018, price: 28, in_stock: true, pages: 334, publisher: "Random House" }
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted successfully!`);
  } catch (error) {
    console.error("Error inserting books:", error);
  } finally {
    await client.close();
  }
}

run();
