# G-List
An application for users to create custom grocery lists based on the stores where they shop.  They can search for stores in their area or enter a custom store.  The user can also share lists with friends and family that they connect with.

* [View Application](https://g-list-cb.herokuapp.com/)
* [Front End Repository](https://github.com/CB721/grocery-list-front)
* [Back End Repository](https://github.com/CB721/grocery-list-back)

## Key Features
#### Create lists and set priority levels for each item
![Create Lists](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/create-list-mobile.gif?raw=true)
#### Add stores based on the user's location
![Add Stores](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/add-store-mobile.gif?raw=true)
#### Filter their list by store
![Filter by store](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/filter-by-store-mobile.gif?raw=true)
#### View previous lists and add items from it to their current list
![Previous lists](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/previous-list-mobile.gif?raw=true)
#### Mark list items as complete
![Update items](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/update-item-mobile.gif?raw=true)
#### Create custom lists for repeatedly purchased items (create recipes)
![Recipes](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/recipes-mobile.gif?raw=true)
#### Connect with other users
![Connect](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/send-receive-request-mobile.gif?raw=true)
#### Share lists with connections
![Share](https://github.com/CB721/grocery-list-front/blob/master/src/assets/images/walkthrough_gifs/send-receive-list-mobile.gif?raw=true)

## User Stores
1) "As a user, I want to create grocery lists and specify where I'll buy and how urgently I need each item."
2) "As a user, I want to filter by store when I go shopping"
3) "As a user, I want to connect with friends and family members to send and receive grocery lists"

### Future Improvements
* Implement swipe feature for mobile
    * Swipe right on a item to mark it complete, swipe left to delete it
    * Swipe across tabs for viewing stores, viewing lists and creating lists
* Create autocomplete feature for list items - query the db for similarly spelled items, create a list for foods to populate as well
* Add parallax effect to home page

### Technologies Used
#### Front End
    1) HTML/CSS
    2) JavaScript/ES6
    3) React
    4) Node
    5) Express
    6) Moment
    7) SASS
    8) React Beautiful DND
    9) React Reveal
    10) React Textfit
    11) Shards React
    12) Validator
    13) Axios
#### Back End
    1) Express
    2) Axios
    3) Bcrypt
    4) CORS
    5) Mongoose
    6) MySQL
    7) Nodemailer
    8) Moment
    9) Validator
    10) Node

## Author
* Clint Brodar

### License
Copyright © 2020 Clint Brodar All Rights Reserved