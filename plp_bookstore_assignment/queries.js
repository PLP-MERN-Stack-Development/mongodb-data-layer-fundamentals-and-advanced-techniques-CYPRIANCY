const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const books = db.collection("books");

    console.log("\n📚 Find all books in a specific genre (Fiction):");
    console.log(await books.find({ genre: "Fiction" }).toArray());

    console.log("\n📘 Find books published after 2010:");
    console.log(await books.find({ published_year: { $gt: 2010 } }).toArray());

    console.log("\n✍️ Find books by a specific author (James Clear):");
    console.log(await books.find({ author: "James Clear" }).toArray());

    console.log("\n💰 Update the price of a specific book (1984):");
    await books.updateOne({ title: "1984" }, { $set: { price: 25 } });
    console.log(await books.findOne({ title: "1984" }));

    console.log("\n🗑️ Delete a book by title (Educated):");
    await books.deleteOne({ title: "Educated" });
    console.log("Book deleted.");

    console.log("\n✅ Books in stock and published after 2010:");
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    console.log("\n🔍 Projection (title, author, price):");
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1 } }).toArray());

    console.log("\n📊 Sort books by price ascending:");
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log("\n📉 Sort books by price descending:");
    console.log(await books.find().sort({ price: -1 }).toArray());

    console.log("\n📄 Pagination (5 books per page, page 1):");
    console.log(await books.find().limit(5).toArray());

    console.log("\n📈 Average price of books by genre:");
    console.log(await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());

    console.log("\n👩‍💻 Author with the most books:");
    console.log(await books.aggregate([{ $group: { _id: "$author", totalBooks: { $sum: 1 } } }, { $sort: { totalBooks: -1 } }, { $limit: 1 }]).toArray());

    console.log("\n🕰️ Books grouped by publication decade:");
    console.log(await books.aggregate([{ $group: { _id: { decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } }, count: { $sum: 1 } } }, { $sort: { "_id.decade": 1 } }]).toArray());

    console.log("\n⚡ Creating index on title:");
    await books.createIndex({ title: 1 });

    console.log("\n⚡ Creating compound index on author and published_year:");
    await books.createIndex({ author: 1, published_year: -1 });

    console.log("\n🧠 Explain performance improvement:");
    const explain = await books.find({ title: "1984" }).explain("executionStats");
    console.log(JSON.stringify(explain.executionStats, null, 2));

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();
