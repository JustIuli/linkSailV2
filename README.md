![Logo](https://iili.io/JCl395J.md.png)


# V2

LinkSail is a web application for creating and managing shortened links. It provides features such as link creation, analytics tracking, and the ability to view analytics for existing links. 


## Installation

Install with npm

```bash
    cd linkSail
    npm run installBoth
```

Install with yarn

```bash
    cd linkSail
    yarn installBoth
```

This will run npm install / yarn inside both of the folders .



## Routes

Home ("/")

- This page represents the home page of the application. It displays the LinkSail logo, a brief description, and a "Get Started" button that navigates to the link creation page.

Create Link ("/create-link")

- This page is responsible for creating short links. It takes a user-inputted link, validates it, and communicates with the LinkSail API to create a shortened link

Analytics ("/analytics")

- This page allows users to view analytics for a specific link. Users input the link ID, and the component fetches and displays analytics data from the LinkSail API.

Redirect ("/r)

- This page seamlessly redirects users to the original link. Additionally, it provides users with visibility into the destination to which they will be redirected."
    ![Example](https://iili.io/JCGGzHN.md.png)

# How It Works:

### Link Shortening:

 When a new link is submitted via a post request to the endpoint https://linksail-api.adaptable.app/api/c:
- A unique ID is generated using the customAlphabet function from nanoid, ensuring uniqueness.
- The submitted link, along with the generated unique ID, is used to create a new Link object.
- The object is saved to the MongoDB database using Mongoose.
- The server responds with the shortened link containing the unique ID.

### Analytics Retrieval:

When a request is made to retrieve analytics via the endpoint https://linksail-api.adaptable.app/api/a/ValidUniqueId:
- The unique ID from the request parameters is used to query the MongoDB database for the corresponding Link object.
- The server responds with the found link details.

### Analytics Retrieval:

When a user clicks on a shortened link, a POST request is automatically made to the following endpoint: https://linksail-api.adaptable.app/api/l/ValidUniqueId:
- The server processes this request and increments the linkVisits counter for the corresponding link in the MongoDB database. This allows for accurate tracking of the number of visits to the shortened link.

- By making use of this POST request mechanism, LinkSailV2 ensures that link analytics are promptly updated, providing users with real-time information on the popularity and usage of their shortened links.

# Technologies Used:

- MongoDB: A NoSQL database used to store link data.
- Express.js: A web application framework for handling HTTP requests.
- nanoid: A library for generating unique IDs, used for creating shortened link IDs.

This setup allows you to store and retrieve link data efficiently, and the use of nanoid ensures that the generated IDs are unique, crucial for the uniqueness of shortened links. The MongoDB database is used to persistently store link details, and Express.js facilitates handling HTTP requests for link creation and analytics retrieval.
