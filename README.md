# react-user-list-task# User and Task Management Dashboard

This is a web application built with React and TypeScript that serves as a client for the JSONPlaceholder API. It allows users to view, edit, and manage a list of users, their posts, and a shared task list with advanced filtering and pagination.



## Features

-   **User Management:**
    -   Fetches and displays a list of 10 users in a collapsible accordion view.
    -   Allows inline editing of user details (username, email, address) with validation.
    -   Submit/Cancel buttons are only enabled when changes are made.
-   **Post Management:**
    -   Navigate to a dedicated page to view all posts by a specific user.
    -   User's details are displayed and are editable on this page as well.
    -   Posts can be edited and deleted.
    -   Post deletion requires confirmation through a modal.
-   **Task Dashboard:**
    -   A separate `/tasks` route displays table with tasks.
    -   Features a clean HTML table with manual pagination (10 items per page).
    -   Filtering by task title, completion status, and owner.
    -   Ability to toggle the completion status of any task, with changes persisting across searches and filters.


## Technology Stack

-   **Frontend:** React with TypeScript
-   **State Management:** Redux Toolkit
-   **Routing:** React Router
-   **UI Library:** Ant Design
-   **HTTP Client:** Axios
-   **Form Management:** Formik & Yup
-   **Testing:** Jest & React Testing Library
-   **Build Tool:** Create React App

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v16 or later recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-user-list-task.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd react-user-list-task
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm start
```


### Running the Tests

To start the tests, run the following command:

```bash
npm run test:watch or npm test
```


> **Note:** The snapshot tests were created by passing a preloaded Redux state to the component using a custom `renderWithProviders` utility. This ensures the component renders with the expected initial state during testing.

