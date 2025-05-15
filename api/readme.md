API Endpoints
Base URL: http://127.0.0.1:3000
I ASKED CHATGPT TO SUMMARIZE MY POSTMAN IN ORDER TO GENERATE THIS.

# ADAMS API Documentation

_Base URL_: `{{domain}}` (e.g. `http://127.0.0.1:3000`)

---

## 1. Register

- **Endpoint:** `POST /register`
- **Request Body (JSON):**
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123!"
  }
Usage:

bash
Copy
Edit
curl -X POST "{{domain}}/register" \
     -H "Content-Type: application/json" \
     -d '{
           "email": "user@example.com",
           "password": "securePassword123!"
         }'
2. Login
Endpoint: POST /login

Request Body (JSON):

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "securePassword123!"
}
Usage:

bash
Copy
Edit
curl -X POST "{{domain}}/login" \
     -H "Content-Type: application/json" \
     -d '{
           "email": "user@example.com",
           "password": "securePassword123!"
         }'
3. Scanner Data
3.1 GET Scanner Data
Endpoint: GET /scanner-data

Headers:

Content-Type: application/json

Usage:

bash
Copy
Edit
curl -X GET "{{domain}}/scanner-data" \
     -H "Content-Type: application/json"
3.2 POST Scanner Data
Endpoint: POST /scanner-data

Request Body (JSON):

json
Copy
Edit
{
  "pollution": 45.7,
  "x_coor": -73.935242,
  "y_coor": 40.730610
}
Usage:

bash
Copy
Edit
curl -X POST "{{domain}}/scanner-data" \
     -H "Content-Type: application/json" \
     -d '{
           "pollution": 45.7,
           "x_coor": -73.935242,
           "y_coor": 40.730610
         }'
4. Heatmap
Endpoint: GET /get-heatmap

Headers:

Content-Type: application/json

Usage:

bash
Copy
Edit
curl -X GET "{{domain}}/get-heatmap" \
     -H "Content-Type: application/json"
5. Pollution Exposure
5.1 POST Pollution Exposure
Endpoint: POST /pollution-exposure

Request Body (JSON):

json
Copy
Edit
{
  "x_coor": -73.935242,
  "y_coor": 40.730610,
  "pollution": 38.2
}
Usage:

bash
Copy
Edit
curl -X POST "{{domain}}/pollution-exposure" \
     -H "Content-Type: application/json" \
     -d '{
           "x_coor": -73.935242,
           "y_coor": 40.730610,
           "pollution": 38.2
         }'
5.2 GET Pollution Exposure
Endpoint: GET /pollution-exposure

Usage:

bash
Copy
Edit
curl -X GET "{{domain}}/pollution-exposure"
6. Gemini Explanation
Endpoint: GET /gemini-explanation

Usage:

bash
Copy
Edit
curl -X GET "{{domain}}/gemini-explanation"
7. Mission
7.1 GET Mission
Endpoint: GET /auth/mission

Usage:

bash
Copy
Edit
curl -X GET "{{domain}}/auth/mission"
7.2 POST Mission
Endpoint: POST /auth/mission

Request Body (JSON):

json
Copy
Edit
{
  "mission": "lorem ipsum",
  "points": 500
}
Usage:

bash
Copy
Edit
curl -X POST "{{domain}}/auth/mission" \
     -H "Content-Type: application/json" \
     -d '{
           "mission": "lorem ipsum",
           "points": 500
         }'