# MinifyURL

MinifyURL is a fast and simple backend service that lets you shorten long web addresses (URLs) into easy-to-share short links. It's perfect for sharing links on social media, in emails, or anywhere you want a cleaner, more manageable URL.

## 🚀 Project Overview
MinifyURL is designed to make sharing links easier. Instead of sending a long, complicated web address, you can use MinifyURL to create a short, memorable link that redirects to the original address.

## ✨ Features
- Shorten any long URL into a simple, short link
- Redirect users from the short link to the original URL
- Easy-to-use API for developers
- Built with speed and reliability in mind

## 🛠️ How It Works
1. **You provide a long URL** (like https://www.example.com/very/long/link).
2. **MinifyURL generates a short code** (like https://minify.url/abc123).
3. **Share the short link** with anyone!
4. **When someone visits the short link**, they are instantly redirected to the original URL.

## 🛠️ Technical Highlights

- **Hashing Algorithm:** Uses [farmhash](https://github.com/google/farmhash) to generate a unique hash from the original URL and creator ID, then encodes it with [base62](https://github.com/andrew/base62.js) for short, URL-friendly codes.
- **Database:** Stores all URL data in **MongoDB** using the Mongoose ODM for schema validation and easy data access.

## 📦 Getting Started

### For Developers
1. **Clone the repository:**
   ```bash
   git clone https://github.com/tsvillain/minifyurl.git
   cd minifyurl
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `sample.env` to `.env` and fill in the required values.
4. **Build and start the server:**
   ```bash
   npm run build
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

### For Non-Technical Users
- Ask your developer or IT team to set up MinifyURL for you.
- Once running, you can use the provided API or a simple web interface (if available) to shorten your links.

## 📚 API Documentation

### 1. Create a Short URL
**Endpoint:** `POST /api/url`

**Request Body:**
```json
{
  "url": "https://www.example.com/very/long/link",
  "creator_id": "user123",
  "expire_in": 30
}
```
- `url`: The original long URL to shorten
- `creator_id`: Unique identifier for the user creating the short URL
- `expire_in`: Number of days until the short URL expires

**Response:**
```json
{
  "status": "success",
  "message": "Short Url created successfully",
  "data": {
    "id": "...",
    "original_url": "https://www.example.com/very/long/link",
    "code": "abc123",
    "expired_at": "2024-07-31T12:00:00.000Z",
    "visit_count": 0,
    "creator_id": "user123",
    "created_at": "2024-07-01T12:00:00.000Z",
    "updated_at": "2024-07-01T12:00:00.000Z",
    "url_prefix": "http://localhost:3000",
    "full_url": "http://localhost:3000/abc123"
  }
}
```

### 2. Get All URLs by Creator
**Endpoint:** `GET /api/urls`

**Request Body:**
```json
{
  "creator_id": "user123"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "List of all urls created by the creator",
  "data": [
    {
      "id": "...",
      "original_url": "https://www.example.com/very/long/link",
      "code": "abc123",
      "expired_at": "2024-07-31T12:00:00.000Z",
      "visit_count": 0,
      "creator_id": "user123",
      "created_at": "2024-07-01T12:00:00.000Z",
      "updated_at": "2024-07-01T12:00:00.000Z",
      "url_prefix": "http://localhost:3000",
      "full_url": "http://localhost:3000/abc123"
    }
  ]
}
```

### 3. Redirect to Original URL
**Endpoint:** `GET /:code`

- Visit the short URL (e.g., `http://localhost:3000/abc123`) in your browser.
- If the code is valid and not expired, you will be redirected to the original URL.
- If the code is invalid or expired, an error message is returned.

## 🧰 Technologies Used
- Node.js
- Express.js
- TypeScript
- MongoDB (or your preferred database)

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## 📄 License
This project is licensed under the MIT License.

## 📬 Contact
Created by [Tekeshwar Singh](mailto:tekeshwarsingh2000@gmail.com). For questions or support, open an issue on [GitHub](https://github.com/tsvillain/minifyurl/issues). 