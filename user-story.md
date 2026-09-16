# User Stories - GiftLink

## User Story 1: User Registration
**As a** new user,
**I want to** register an account with my email and password,
**so that** I can list items for giveaway and claim items from others.

**Acceptance Criteria:**
- User can enter email, name, and password
- System validates email format and password strength
- System stores user credentials securely using bcrypt hashing
- System returns a JWT token upon successful registration
- User receives confirmation of successful registration

---

## User Story 2: User Login
**As a** registered user,
**I want to** log in with my credentials,
**so that** I can access my profile and manage my listings.

**Acceptance Criteria:**
- User can enter email and password
- System validates credentials against stored records
- System returns a JWT token upon successful login
- System returns appropriate error messages for invalid credentials
- Token is used for subsequent authenticated requests

---

## User Story 3: Edit User Profile
**As a** logged-in user,
**I want to** edit my profile information (name, email),
**so that** I can keep my account details up to date.

**Acceptance Criteria:**
- User can view current profile information
- User can update name and email fields
- Changes are persisted to the database
- System confirms successful update
- Updated information is reflected across the application

---

## User Story 4: List Items for Giveaway
**As a** logged-in user,
**I want to** create a new listing for an item I want to give away,
**so that** others can see and claim my items.

**Acceptance Criteria:**
- User can enter item title, description, category, condition, and location
- User can upload an image for the item
- Listing is saved to the database with timestamp
- Item appears in the main listings page
- User receives confirmation of successful listing creation

---

## User Story 5: Browse Item Listings
**As a** visitor,
**I want to** browse all available items listed for giveaway,
**so that** I can find items I'm interested in.

**Acceptance Criteria:**
- Main page displays all available items in a grid/list view
- Each item shows title, category, condition, and image thumbnail
- Items are paginated for better performance
- Page loads within acceptable response time
- Items are sorted by most recent first

---

## User Story 6: View Item Details
**As a** visitor,
**I want to** view detailed information about a specific item,
**so that** I can decide if I want to claim it.

**Acceptance Criteria:**
- Detail page shows full item description, images, category, and condition
- Lister's information (name) is displayed
- Item location is shown
- Page URL is shareable
- Back button returns to listings

---

## User Story 7: Search Items
**As a** visitor,
**I want to** search for items by keyword or filter by category,
**so that** I can quickly find items I'm looking for.

**Acceptance Criteria:**
- Search bar is prominently displayed on the main page
- Search filters items by title and description
- Category filter narrows results by item category
- Search results update in real-time or on submit
- Empty search returns all items

---

## User Story 8: Add Comments to Items
**As a** logged-in user,
**I want to** add comments or questions on an item listing,
**so that** I can communicate with the lister.

**Acceptance Criteria:**
- Comment text field is available on item detail page
- Comments are saved with user name and timestamp
- All comments for an item are displayed in chronological order
- Only logged-in users can add comments
- Comments are displayed in real-time

---

## User Story 9: Delete Item Listing
**As a** logged-in user,
**I want to** delete my own item listings,
**so that** I can remove items that are no longer available.

**Acceptance Criteria:**
- Delete button is only visible to the item owner
- System prompts for confirmation before deletion
- Item is removed from the database
- Item no longer appears in listings
- Comments associated with the item are also removed

---

## User Story 10: User Logout
**As a** logged-in user,
**I want to** log out of my account,
**so that** my session is securely terminated.

**Acceptance Criteria:**
- Logout button is accessible from navigation
- JWT token is cleared from client storage
- User is redirected to the home page
- Protected routes require re-authentication after logout
- Session cannot be reused after logout

---

## User Story 11: Docker Containerization
**As a** developer,
**I want to** containerize the application using Docker,
**so that** it can be deployed consistently across environments.

**Acceptance Criteria:**
- Dockerfile is created for the backend application
- docker-compose.yml defines services (backend, MongoDB)
- Environment variables are configurable via .env file
- Application starts successfully in containers
- MongoDB data persists across container restarts

---

## User Story 12: CI/CD Pipeline
**As a** developer,
**I want to** set up a CI/CD pipeline with GitHub Actions,
**so that** code changes are automatically tested and deployed.

**Acceptance Criteria:**
- GitHub Actions workflow is defined
- Pipeline runs on push to main branch
- Pipeline includes lint and test steps
- Pipeline builds the Docker image
- Successful builds are indicated in the repository

---

## User Story 13: Seed Database with Sample Data
**As a** developer,
**I want to** seed the database with sample item data,
**so that** the application has realistic data for testing and demonstration.

**Acceptance Criteria:**
- 16 sample items are created across different categories
- Items include various conditions and locations
- Seed script can be run multiple times without duplicates
- Data includes all required fields per item schema
- Seed output confirms number of documents inserted

---

## User Story 14: Landing Page
**As a** visitor,
**I want to** see an attractive landing page when I first visit the site,
**so that** I understand what GiftLink is and how to get started.

**Acceptance Criteria:**
- Landing page displays project title "GiftLink"
- Brief description or tagline explains the purpose
- "Get Started" button navigates to main listings
- Page is responsive and visually appealing
- Deployment URL is accessible

---

## User Story 15: Protect Routes with Authentication
**As a** developer,
**I want to** protect backend routes with JWT authentication middleware,
**so that** only authenticated users can access protected resources.

**Acceptance Criteria:**
- JWT middleware validates tokens on protected routes
- Unauthenticated requests return 401 status
- Token expiration is handled appropriately
- Public routes (listings, search) remain accessible
- Auth tokens include user ID and expiration

---

## User Story 16: Responsive Frontend Design
**As a** user,
**I want to** use the application on both desktop and mobile devices,
**so that** I can access GiftLink from anywhere.

**Acceptance Criteria:**
- Layout adapts to different screen sizes
- Navigation is accessible on mobile
- Forms are usable on touch devices
- Images scale appropriately
- Text is readable without horizontal scrolling

---

## User Story 17: Error Handling
**As a** user,
**I want to** see meaningful error messages when something goes wrong,
**so that** I understand what happened and what to do next.

**Acceptance Criteria:**
- API errors return appropriate HTTP status codes
- Frontend displays user-friendly error messages
- Network errors are handled gracefully
- Form validation provides specific feedback
- 404 pages are displayed for unknown routes

---

## User Story 18: Technical Debt - Code Quality
**As a** developer,
**I want to** maintain clean, well-organized code,
**so that** the project is maintainable and scalable.

**Acceptance Criteria:**
- Code follows consistent style conventions
- ESLint is configured and passes without errors
- No console.log statements in production code
- Environment variables are used for configuration
- Code is properly modularized
