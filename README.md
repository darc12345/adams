# API Endpoints Documentation

This document outlines the available API endpoints, their functionalities, request/response structures, and authentication requirements.

---

## Table of Contents
- [Authentication](#authentication)
- [Scanner Data](#scanner-data)
- [Pollution Exposure](#pollution-exposure)
- [Missions](#missions)
- [Other Endpoints](#other-endpoints)
- [Response Status Codes](#response-status-codes)
- [Gemini Integration](#gemini-integration)

---

## Authentication

| Endpoint         | Method | Description              | Request Body                                      | Authentication Required | Notes                                        |
|------------------|--------|--------------------------|--------------------------------------------------|--------------------------|----------------------------------------------|
| `/register`      | POST   | Register a new user      | `{ email: string, password: string }`            | No                       | Returns `201 Created` on success             |
| `/login`         | POST   | Authenticate user        | `{ email: string, password: string }`            | No                       | Sets session cookie. Returns `200 OK`        |
| `/google-signin` | POST   | Google Sign-In auth      | `{ token: string, email: string, uid: string }`  | No                       | Sets session cookie. Returns `201 Created`   |
| `/logout`        | POST   | Log out user             | N/A                                              | Yes                      | Clears session. Returns `200 OK`             |

---

## Scanner Data

| Endpoint         | Method | Description                    | Request Body                                                   | Authentication Required | Notes                                      |
|------------------|--------|--------------------------------|----------------------------------------------------------------|--------------------------|--------------------------------------------|
| `/scanner-data`  | GET    | Get all pollution data         | N/A                                                            | No                       | Returns array of scanner data              |
| `/scanner-data`  | POST   | Submit new scanner data        | `{ pollution: number, x_coor: number, y_coor: number }`        | No (Admin only)          | Requires admin privileges. Returns `201 Created` |

---

## Pollution Exposure

| Endpoint             | Method | Description                        | Parameters / Request Body                                | Authentication Required | Response Example                                  |
|----------------------|--------|------------------------------------|----------------------------------------------------------|--------------------------|---------------------------------------------------|
| `/pollution-exposure`| GET    | Get user’s pollution history       | N/A (uses session ID)                                    | Yes                      | `[{id, user_id, x_coor, y_coor, pollution, timestamp}]` |
| `/get-heatmap`       | GET    | Get pollution heatmap data         | N/A                                                      | No                       | Heatmap data array                               |
| `/gemini-explanation`| GET    | Get AI summary of exposure         | N/A (uses session ID)                                    | Yes                      | `{ message: "Friendly summary text..." }`        |
| `/record-journey`    | POST   | Record journey coordinates         | `{ x_coor: number, y_coor: number }`                     | Yes                      | Returns `201 Created`                            |

---

## Missions

| Endpoint              | Method | Description                      | Request Body                                         | Authentication Required | Notes                                         |
|-----------------------|--------|----------------------------------|------------------------------------------------------|--------------------------|-----------------------------------------------|
| `/mission`            | GET    | Get user’s missions              | N/A (uses session ID)                                | Yes                      | Returns array of mission objects             |
| `/auth/mission`       | POST   | Create new mission (admin)       | `{ mission: string, points: number }`                | Yes (Admin)              | Returns `201 Created`                         |
| `/auth/mission`       | DELETE | Delete mission (admin)           | `{ mission_id: number }`                             | Yes (Admin)              | Returns `200 OK` with mission ID             |
| `/mission/progress`   | POST   | Update user mission progress     | `{ mission_id: number, quantity: number }`           | Yes                      | Returns `201 Created`                         |

---

## Other Endpoints

| Endpoint           | Method | Description                    | Request Body                                       | Notes                              |
|--------------------|--------|--------------------------------|---------------------------------------------------|------------------------------------|
| `/record-journey`  | POST   | Record journey path coordinates| `{ x_coor: number, y_coor: number }`              | Requires authentication           |

---

## Response Status Codes

- **200 OK**: Successful request  
- **201 Created**: Resource created successfully  
- **400 Bad Request**: Missing/invalid parameters or unauthenticated  
- **401 Unauthorized**: Invalid credentials  
- **500 Internal Server Error**: Server-side error  

---

## Authentication

Endpoints marked **Authentication Required** need a valid session cookie (set after login or Google Sign-In). Admin-only endpoints require additional privileges.

---

## Gemini Integration

The `/gemini-explanation` endpoint uses Google's Gemini AI to generate personalized air quality summaries based on the user's pollution exposure history.
