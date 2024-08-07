# Roommates

Roommates is the ultimate household management app that simplifies tracking groceries, meal planning, and chore division. With features like AI-powered meal suggestions, chore reminders, and easy food item tracking, Roommates ensures a well-organized and harmonious living environment for both families and roommates.

![CI/CD](https://github.com/ubc-cpsc455-2024S/project-05_bus/actions/workflows/main.yml/badge.svg)

[Live site](https://roommates-9z8g.onrender.com/)

## Project Description
The Roommates app helps users track groceries and expiring food, meal plan based on groceries, and fairly divide up chores. Anyone looking for an easy, consolidated way to manage their household chores, whether living alone or with roommates/family, can use the Roommates app to get timely notifications on things like groceries running low or expiring, or chores that need to be done. The app stores data related to user profile information, groups, calendar details, and fridge contents. With this data, users will be able to create and manage their household group and individual account, create and interact with events and chores in the calendar (including sending chore reminders to roommates), and add and remove fridge and grocery items. Some additional functionality may include a budgeting section (like splitwise) where users can divide expenses between members of their household, or AI image recognition for fridge items to help with the meal planning expiration tracking.

## Project task requirements
#### Minimum Requirements
- ✅ Account creation and authentication
  - Create user login and signup page (front end)
  - Set up MongoDB connection in back end
  - Set up MongoDB collection for users
  - Enable OAuth in the front end for user verification
- ✅ Users can create a household (group), which other users can join
- ✅ Users can create a list to track food items and expiry dates in their household
  - Food items can be tagged for 'shared' or 'personal' use in this list
- ✅ Users can view a basic calendar implementation and create events (e.g. assigning chores to users)
  - Set up MongoDB collection for chores/events
  - Create front end for calendar + side navbar
  - Add functionality for adding an event/chore
  - Add functionality for assigning a user to a chore
#### Standard Requirements 
- ✅ Users receive notifications for upcoming chores
- ✅ Users receive notifications for expiring food items (food item expiration dates are synced with the calendar)
- ✅ Users can edit their profile and group in settings
  -  Only admins can edit or delete a group
- ✅ Users can ask AI to help with meal planning (e.g. suggest recipes using selected food items)
  - Users can save any recipes generated, see the list of all saved recipes, and remove any saved recipes
#### Stretch Requirements
- ✅ AI image recognition for processing pictures of groceries and receipts to quickly add food items to the list
- ❌ Budgeting functionality (similar to Splitwise)
- ✅ Ability to “nudge” a roommate to complete a chore (similar to Facebook poking)

## Usage of Tech from Units 1-5

### HTML, CSS, JS

In our project, HTML, CSS, and JavaScript played crucial roles in building the core of our application. JavaScript, in particular, was leveraged for dynamic functionalities such as interactive chore reminders and real-time grocery tracking. We adhered to best practices in coding style to ensure clean and maintainable code. JavaScript's features like dynamic typing and asynchronous operations allowed us to create a responsive and interactive user experience.

### React & Redux

We utilized React to build a dynamic and efficient user interface. React's component-based architecture enabled us to develop reusable and modular components, reducing code redundancy and simplifying frontend logic. Redux was employed for centralized state management, which helped in maintaining a consistent and predictable state across the application. By managing state globally, Redux reduced the complexity associated with passing props through multiple layers of components, making the codebase easier to maintain and scale.

### Node & Express

Node.js and Express were instrumental in setting up our application server. Express handled API requests for critical functionalities such as user authentication, calendar events, and chore management. User authentication was managed through API calls to Auth0, which provided a secure and scalable authentication solution. We implemented secure practices by restricting data access based on user roles and ensuring sensitive information was protected.

### MongoDB

MongoDB was chosen for its flexible and scalable data storage capabilities. It stored essential data like user profiles, household groups, and grocery lists. MongoDB's NoSQL nature allowed for dynamic schema design, which was advantageous for handling varying data structures. We used Mongoose to enforce data validation and schema constraints, ensuring data consistency and integrity across the application.

### CI/CD and GitHub Actions

For continuous integration and deployment, we relied on GitHub Actions to automate our build, test, and deployment processes. This setup ensured that every code change was tested and deployed smoothly, reducing manual effort and minimizing errors. By automating these processes, we maintained a reliable deployment pipeline, which facilitated consistent updates and improvements to the application.

The application was deployed to Render, a cloud-based platform that provided scalable hosting and easy deployment. Render's deployment process seamlessly integrated with our CI/CD pipeline, allowing us to push updates and ensure high availability for users with minimal downtime.

## Above and Beyond Functionality

### OAuth

We integrated OAuth through Auth0, which hosts universal login and signup pages, and provides social login options. In our app, we allow users to login with Google, providing flexibility for users who don't want to have to create a new account and store a new password just to use Roommates. It would have been much easier to keep our own signup and login pages and then encrypt passwords using something like bycrypt, but we wanted to go above and beyond in terms of security.

### Generative AI

We used generative AI with the OpenAI API in 2 places: the grocery receipt scanner and meal planner. 
While we have the functionality for users to input every grocery item individually, we wanted to make it easier to add bulk items. When the user makes a grocery trip, they can easily add all the items they just purchased by uploading a photo of the receipt. AI will analyze the items on the receipt and show a preview with the name and any other field it is able to populate. Users are then able to edit any information before adding the items to the grocery table.
We knew that coming up with recipes can be challenging, so we added a feature that utilized the grocery table and AI to create custom recipes. Users can select any item on the grocery table to add to the recipe generator. AI will then take into account the items added and the quantity to generate a recipe with other ingredients that are likely already around the kitchen. 

## Next Steps
Going forward, we'd like to add the budgeting page we originally had as a stretch requirement, where groups can track and split costs for groceries and other items (similar to splitwise). We'd also like to add some functionality to the profile settings page (e.g. changing email/password, deleting an account). In terms of design, we're planning on revamping the landing page so it's a bit more engaging and improving the responsivness of all of the pages. 

## Contributions
- Amy Chen: 4th year BCS student
  - I added OAuth using Auth0 (research, platform set up) for the login/sign up, logout, and protected routes. I also worked on the frontend/backend infrastructure to integrate this external user validation with our existing database, such as adding a profile creation feature, as well as various design mocks.
- Jennifer Wong: 4th year BCS student with a black cat.
  - I built the frontend and backend for the meal planning feature (all CRUD operations + AI processing to generate a recipe based on given ingredients selected by the user). I also connected the database and set up the structure, added the feature to edit the user's name, and designed the landing page.
- Jocelyn Bachmann: 4th year BUCS student.
  - I built the frontend and backend infrastructure for groups (e.g. creating/deleting groups, adding/removing members, adding/removing admins, setting/fetching the current group and its members with custom hooks). I also set up persistence and protected routes, and built the navbar, home page, and settings page.
- Douglas Zhong: 4th Year BCS student, previously completed B.Sc in Microbiology and Immunology.
  - I built the frontend and backend for the calendar page (all CRUD operations), groceries page (CRUD operations + AI image processing for quickly adding groceries), and home page notification system. I also wrote the GitHub Actions workflow and handled deploying our application to Render.

## Site Mockup
<img src ="images/prototype.png">
