# Zef Scientific APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## Profile
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API

## jobRegisterRouter
- POST /send/job_register
- GET /review/job_register

## jobRegisterRouter
- POST /send/expense_register/:userId
- GET /review/expense_register/:userId

## Leave Request Router
- POST /send/leave_request/:userId
- GET /review/leave_request/:userId

## Part Request Router

- POST /send/Part_return/:userId
- POST /send/ Part_request/:userId
- GET /review/ Part_request/:userId
- GET /review/ Part_return/:userId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles on the basis of your position .

Status: ignored, interested, accepeted, rejected