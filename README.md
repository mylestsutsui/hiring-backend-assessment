# Backend Assessment - Myles Tsutsui

## Assumptions Made

- All data being sent from the frontend in the request body and params is being sent how the backend expects to receive data and there is no need for checking that data matches.
- None of the cars are owned by users.
- When a get request is made for all cars in the database or a single car, send all information about the car/s.
- Users who want to get/edit/delete via a query param will have the id of the car.
## Starting the server

To start up the backend server, perform the following:

1. Bring up the MySQL database

    ```bash
    # In the project root directory
    docker compose up
    # Exposes database on port 3306
    ```

2. Bring up express server in development mode

    ```bash
    # In a separate terminal session
    npm run dev
    # Exposes express app on port 8889
    ```

## Making Requests to the API
### POST
- To post a new car listing, send a POST request to the endpoint http://localhost:8889/cars and format the request body as follows:
  ```bash
  {
    vin: <string: car vin>
    licensePlateNum: <string: license plate number>
    registrationNum: <string: registration number>
    registrationState: <string: full state name>
    registrationExp: <string: following the format MM/DD/YYYY>
    registrationName: <string: First and Last name on car registration>
    carValue: <number(int): car value>
    currentMileage: <number(int): car mileage>
    description: <string: brief description of the car>
    color: <string: color of car>
  }
  ```

### GET
- To get all cars and their info in the database send a GET request to the endpoint http://localhost:8889/cars.

- To get information about a single car send a GET request with a **query param** to the endpoint http://localhost:8889/cars/**query param**. The query param will be the id(primary key) of the car in the database.

### DELETE
- To delete a car from the database send a DELETE request with a **query param**, being the id of the car in the database, to the endpoint http://localhost:8889/cars/**query param**.

### PATCH
- To edit information about a car send a PATCH request with a **query param**, id of the car, to the endpooint http://localhost:8889/cars/**query param** with the request body formatted as follows:
```bash
{
    vin: <string: car vin>
    licensePlateNum: <string: license plate number>
    registrationNum: <string: registration number>
    registrationState: <string: full state name>
    registrationExp: <string: following the format MM/DD/YYYY>
    registrationName: <string: First and Last name on car registration>
    carValue: <number(int): car value>
    currentMileage: <number(int): car mileage>
    description: <string: brief description of the car>
    color: <string: color of car>
  }
  ```
  **Note:** You do not need to include all of the information, only the data that is being updated.

## Reasoning

### Database

- Decided to use a single table for this assessment since most of the car information is unique to that car/vin. This would mean that data about cars mostly shares a one-to-one relationship and therefore doesn't require multiple tables. Other tables can be created using the car id as a foreign key and connecting that car to many "renters" and connecting a single "owner" to multiple cars.

### Backend Logic

- Used a single endpoint to handle any requests being made since we only have a single table to query that handles all CRUD functionality.
- Can easily create multiple endpoints in the future for querying a renters table or an owner table.
- Added middleware functionality to populate the request body with the year, make, and model that was retrieved after making an API call to decode the vin that was provided.
- Can also add middleware to ensure data types are matching if we aren't assuming that correct information is being passed from the frontend.