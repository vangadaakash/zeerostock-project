# Zeerostock Inventory Search & Management

This repository contains the solution for the Zeerostock Full Stack Developer Assessment. It combines both **Part A (Search-Focused)** and **Part B (Database-Focused)** into a cohesive, production-ready application.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React (for icons)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)

## Features
- **Supplier & Inventory Management**: Create suppliers and add inventory items with validation (quantity >= 0, price > 0).
- **Advanced Search API**: Case-insensitive search by product name, category dropdown filtering, and minimum/maximum price bounds.
- **Reporting / Grouped Query**: Aggregates total inventory value (`quantity * price`) grouped by supplier, sorted in descending order.
- **Modern UI**: A responsive, glassmorphism-styled React interface featuring real-time filtering, empty states, and error handling.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas connection string (or a local MongoDB instance)

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   # .env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   ```
4. Start the server (it uses nodemon for development):
   ```bash
   npm run dev
   ```
   *(If you haven't added the "dev" script, you can run `node server.js`)*

### 2. Frontend Setup
1. Open a **new** terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser, typically at `http://localhost:5173`.

---

## 🏗️ Architecture & Database Logic

### Database Schema (MongoDB / NoSQL)
We chose a NoSQL approach using **MongoDB** (via Mongoose) over SQL:
- **Suppliers Collection**: `name`, `city`
- **Inventory Collection**: `supplier_id` (ObjectId reference to Supplier), `productName`, `category`, `quantity`, `price`

**Why NoSQL?**
MongoDB was chosen to accommodate flexibility and rapid development while meeting the deployment requirement. Mongoose provides excellent schema validation to enforce the required rules (`quantity >= 0`, `price > 0`) natively, and MongoDB's aggregation framework easily powers the complex grouped query requirement.

### Search Logic Explanation (Part A)
The `/search` endpoint retrieves filters (`q`, `category`, `minPrice`, `maxPrice`) from the query string and dynamically constructs a MongoDB query object:
- `q`: Handled using MongoDB regex (`$regex: q, $options: 'i'`) for efficient, case-insensitive partial string matching.
- `category`: Matches exactly if provided (ignoring "All").
- `minPrice` & `maxPrice`: Added to a `$gte` and `$lte` range query map to filter `price`.

**Performance Improvement for Large Datasets:**
For search logic on massive datasets, regex queries can cause performance bottlenecks as they scan the entire text.
> **Improvement**: I would implement a **Text Index** on the `productName` field (`db.inventory.createIndex( { productName: "text" } )`) and use the `$text` operator for dramatically faster full-text searches.

### Aggregation Query (Part B)
The grouped query (`GET /inventory`) utilizes the MongoDB `$lookup` pipeline to join `Inventory` with `Suppliers`, unwinds the array, groups it by Supplier ID, and calculates the total inventory value using `$multiply` and `$sum`. 

**Database Optimization Suggestion:**
> **Optimization**: Add an index on `supplier_id` in the Inventory collection. Since relational queries (like `$lookup` or population) search the inventory collection based on the supplier reference, indexing `supplier_id` turns collection scans into rapid index scans.

---

## 📸 Screenshots
*(Add screenshots of your locally running UI and Postman API tests here before submitting)*
