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
  - Enable OAuth in the back end for user verification
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

## Usage of Tech from Units 1-5 - TODO
"Usage of tech includes best practices. Code is clean and clear. Description of usage explains in-depth how the technology has made the app better. Possibly a mention of how it compares to other similar tech. Documentation demonstrates a solid understanding of the tech learned throughout the term, and its purpose in creating a production-level full-stack web application."

## Above and Beyond Functionality - TODO
"Please give a clear description and in-depth explanation of how you went above and beyond the requirements of the course. This will help us awards marks for rubric item #4."

## Next Steps
Going forward, we'd like to add the budgeting page we originally had as a stretch requirement, where groups can track and split costs for groceries and other items (similar to splitwise). We'd also like to add some functionality to the profile settings page (e.g. changing name/email, deleting an account). In terms of design, we're planning on revamping the landing page so it's a bit more engaging and improving the responsivness of all of the pages. 

## Contributions
- Amy Chen: 4th year BCS student
  - Highlight areas where each team member contributed significantly. [2-3 sentences per team member]
- Jennifer Wong: 4th year BCS student with a black cat.
  - Highlight areas where each team member contributed significantly. [2-3 sentences per team member]
- Jocelyn Bachmann: 4th year BUCS student.
  - Highlight areas where each team member contributed significantly. [2-3 sentences per team member]
- Douglas Zhong: 4th Year BCS student, previously completed B.Sc in Microbiology and Immunology.
  - Highlight areas where each team member contributed significantly. [2-3 sentences per team member]

## Site Mockup
<img src ="images/prototype.png">
