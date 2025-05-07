# App

## GET /

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

# User

## POST /user/signup
**Create a new user**

Create a new user with email and password.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com",
    "password": "password"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## POST /user/signup-org
**Create a new user**

Create a new user with org details.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com",
    "password": "password",
    "orgName": "My Organization",
    "orgDomain": "alxafrica.com"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## GET /user/email-exists/{email}
**Check if email exists**

Check if email exists in the database.

### Parameters
- **Try it out**:
  - **Name**: email
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## POST /user/verify-user
**Verify user account**

Verify user account with email and verification code.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "email": "john@gmail.com",
    "isVerified": true
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## POST /user/signup/employee
**Create a new hub manager**

Create a new hub manager with email and password.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## GET /user
**Get all users**

Get all users with email and password.

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## GET /user/{id}
**Get a user**

Get a user details with email.

### Parameters
- **Try it out**:
  - **Name**: id
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## POST /user/forgot-password/{email}
**Forgot password**

Forgot password request.

### Parameters
- **Try it out**:
  - **Name**: email
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 201
- **Description**: No links

## POST /user/reset-password
**Reset user password**

Reset the password for a user using a reset token.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "password": "newpassword123",
    "resetToken": "hashedToken123"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## PATCH /user/change-password
**Change user password**

Allows a user to change their password by providing the old and new passwords.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "oldPassword": "myOldPassword",
    "newPassword": "myNewPassword"
  }
  ```

### Responses
- **Code**: 200
- **Description**: No links

# Auth

## POST /auth
**Login User**

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "email": "johndoe@gmail.com",
    "password": "password"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## POST /auth/refresh
**Refresh Access token**

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "refreshToken": "string"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

# Invitation

## POST /invitation/create
**Create an invitation for a user to join an organization**

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "expires": true,
    "expiration": 30
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## GET /invitation
**Get all invitations for the organization**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## POST /invitation/accept/{invitationId}
**Accept an invitation to join an organization**

### Parameters
- **Try it out**:
  - **Name**: invitationId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 201
- **Description**: No links

## PATCH /invitation/{invitationId}
**Disable an invitation**

### Parameters
- **Try it out**:
  - **Name**: invitationId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

# Organization

## GET /organization
**Get all organizations**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## GET /organization/users/{id}
**Get all users in an organization**

### Parameters
- **Try it out**:
  - **Name**: id
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## POST /organization/create
**Create new organization**

Create a new organization with name and domain.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "name": "Organization Name",
    "domain": "example.com"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## POST /organization/member/create
**Add new member to organization**

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "organizationId": "csdskek2323ksd",
    "userId": "wjesksdo23j"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## PATCH /organization/update
**Update organization**

Update organization details.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "id": "cm98fwkdk0000a6kqj0woqo9d",
    "name": "Organization Name",
    "domain": "example.com",
    "brandColor": "#FFFFFF",
    "contactEmail@oragnization.com": "string",
    "shortVenueName": "ALXNIGERIA",
    "contactTelephone": "+2341234567890",
    "streetAddress": "123 Street Name",
    "city": "Lagos",
    "zipPostalCode": "123456",
    "website": "www.example.com",
    "businessNumber": "1234567890",
    "changeSubdomain": "example"
  }
  ```

### Responses
- **Code**: 200
- **Description**: No links

## PATCH /organization/update-settings
**Update organization setting**

Update organization setting details.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "organizationId": "csdskek2323ksd",
    "timeZone": "Africa/Lagos",
    "firstDayOfWeek": "Monday",
    "notifyUserEmails": true,
    "notifyVenueEmails": true,
    "cancelChangeUpToHours": 24
  }
  ```

### Responses
- **Code**: 200
- **Description**: No links

## PATCH /organization/member/update
**Update organization member**

Update organization member details.

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "organizationId": "csdskek2323ksd",
    "userId": "wjesksdo23j",
    "isActive": true
  }
  ```

### Responses
- **Code**: 200
- **Description**: No links

## GET /organization/myorg
**Get my organization**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## GET /organization/member/myorg
**Get my organization**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

# Workspace

## GET /workspace
**Get all workspaces**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## GET /workspace/search
**Search workspaces by location**

### Parameters
- **Try it out**:
  - **Name**: location
  - **Description**: 
    - **Type**: string
    - **Location**: (query)

### Responses
- **Code**: 200
- **Description**: No links

## GET /workspace/advance-search
**Advanced search for workspaces**

### Parameters
- **Try it out**:
  - **Name**: state
  - **Description**: 
    - **Type**: string
    - **Location**: (query)
    - **Example**: Lagos or any
  - **Name**: lga
  - **Description**: 
    - **Type**: string
    - **Location**: (query)
    - **Example**: Ikeja or any
  - **Name**: maxPrice
  - **Description**: 
    - **Type**: number
    - **Location**: (query)
    - **Example**: 5000
  - **Name**: minCapacity
  - **Description**: 
    - **Type**: number
    - **Location**: (query)
    - **Example**: 10
  - **Name**: maxCapacity
  - **Description**: 
    - **Type**: number
    - **Location**: (query)
    - **Example**: 100

### Responses
- **Code**: 200
- **Description**: No links

## POST /workspace/create
**Create a new workspace**

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "description": "Workspace Description",
    "address": "16, Street Name, City, Country",
    "totalFloors": 1,
    "openingTime": "2023-10-01T00:00:00Z",
    "closingTime": "2023-10-01T00:00:00Z",
    "seatingCapacity": 50,
    "amenities": [
      "projector",
      "whiteboard"
    ],
    "isPaidBooking": false,
    "pricePerBooking": 3000,
    "stateId": "acas12udsdsdsd",
    "lgaId": "acas12udsdsdsd",
    "name": "Workspace Name"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## GET /workspace/all-org-workpaces
**Get all workspaces for ORG_ADMIN**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## POST /workspace/bulk-create-seats/{workspaceId}
**Bulk create seats for a workspace**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "seatingCapacity": 50,
    "windowSeats": 20,
    "wallSideSeats": 30,
    "centerSeats": 10
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## GET /workspace/{workspaceId}
**Get workspace by ID**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## PATCH /workspace/{workspaceId}
**Update workspace by ID**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "description": "Workspace Description",
    "address": "16, Street Name, City, Country",
    "totalFloors": 1,
    "openingTime": "2023-10-01T00:00:00Z",
    "closingTime": "2023-10-01T00:00:00Z",
    "seatingCapacity": 50,
    "amenities": [
      "projector",
      "whiteboard"
    ],
    "isPaidBooking": false,
    "pricePerBooking": 3000,
    "stateId": "acas12udsdsdsd",
    "lgaId": "acas12udsdsdsd",
    "name": "Workspace Name",
    "status": "ACTIVE"
  }
  ```

### Responses
- **Code**: 200
- **Description**: No links

## GET /workspace/{workspaceId}/seats
**Get all seats for a workspace**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## POST /workspace/{workspaceId}/seats
**Create a new seat for a workspace**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "position": {
      "x": 1,
      "y": 2
    },
    "status": "ACTIVE",
    "floor": 1,
    "seatType": "WALL_SIDE"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## PATCH /workspace/seats/{seatId}
**Update a seat by ID**

### Parameters
- **Try it out**:
  - **Name**: seatId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "position": {
      "x": 1,
      "y": 2
    },
    "status": "ACTIVE",
    "floor": 1
  }
  ```

### Responses
- **Code**: 200
- **Description**: No links

## POST /workspace/{workspaceId}/floor-plan
**Upload floor plan for a workspace**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Request body
- **Content-Type**: multipart/form-data
- **Fields**:
  - **name**: 
    - **Type**: string
    - **Example**: ALX Costain 5th floor
  - **floor**: 
    - **Type**: number
    - **Description**: The floor number of this floor plan
  - **image**: 
    - **Type**: string($binary)

### Responses
- **Code**: 201
- **Description**: No links

## GET /workspace/{workspaceId}/floor-plans
**Get all floor plans for a workspace**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

# Location

## GET /location
**Get all States**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## GET /location/id/{id}
**Get a State by id**

### Parameters
- **Try it out**:
  - **Name**: id
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## GET /location/lgas/{id}
**Get LGS by the State Id**

Get all LGAs in a state.

### Parameters
- **Try it out**:
  - **Name**: id
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## GET /location/lga/{id}
**Get LGA by id**

### Parameters
- **Try it out**:
  - **Name**: id
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

# Booking

## GET /booking/availability
**Check available seats for a workspace and time range**

### Parameters
- **Try it out**:
  - **Name**: workspaceId
  - **Description**: 
    - **Type**: string
    - **Location**: (query)
    - **Example**: cm9kfnsvh0001vt14eebcwutt
  - **Name**: startTime
  - **Description**: 
    - **Type**: string
    - **Location**: (query)
    - **Example**: 2025-05-01T10:00:00Z
  - **Name**: endTime
  - **Description**: 
    - **Type**: string
    - **Location**: (query)
    - **Example**: 2025-05-01T12:00:00Z

### Responses
- **Code**: 200
- **Description**: No links

## POST /booking
**Create a new booking**

### Parameters
- **Try it out**: No parameters

### Request body
- **Content-Type**: application/json
- **Example Value**:
  ```json
  {
    "workspaceId": "cm9kfnsvh0001vt14eebcwutt",
    "seatId": "cm9kfnsvh0001vt14eebcwutt",
    "startTime": "2025-05-01T10:00:00Z",
    "endTime": "2025-05-01T12:00:00Z"
  }
  ```

### Responses
- **Code**: 201
- **Description**: No links

## POST /booking/confirm/{bookingId}
**Confirm a booking - temporary will change to paystack webhook later**

### Parameters
- **Try it out**:
  - **Name**: bookingId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 201
- **Description**: No links

## GET /booking/user
**Get all bookings for the logged-in user**

### Parameters
- **Try it out**: No parameters

### Responses
- **Code**: 200
- **Description**: No links

## GET /booking/{bookingId}
**Get booking details by ID**

### Parameters
- **Try it out**:
  - **Name**: bookingId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## GET /booking/user/{userId}
**Get all bookings for a specific user - for Org admin, global admin and hub managers**

### Parameters
- **Try it out**:
  - **Name**: userId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## PATCH /booking/cancel/{bookingId}
**Cancel a booking**

### Parameters
- **Try it out**:
  - **Name**: bookingId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## PATCH /booking/check-in/{bookingId}
**Check in a booking**

### Parameters
- **Try it out**:
  - **Name**: bookingId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links

## PATCH /booking/check-out/{bookingId}
**Check out a booking**

### Parameters
- **Try it out**:
  - **Name**: bookingId
  - **Description**: 
    - **Type**: string
    - **Location**: (path)

### Responses
- **Code**: 200
- **Description**: No links
