cURL Command:
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"

Output:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWFhY2NiNjExMjk4NjUyNzBiNDRkZTYiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3ODk1Nzg0MzEsImV4cCI6MTc4OTY2NDgzMX0.l9ltmF2HMKgYBBi0n2zNu2zLcXTQpv50M0RuLq-l97I",
  "user": {
    "id": "6aaaccb61129865270b44de6",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
