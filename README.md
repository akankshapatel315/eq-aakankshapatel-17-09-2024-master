**#Run the project **

Front end: npm i, npm run dev

Back end: npm i, add secretKey as GITHUB_TOKEN as git not allowed to push env which contains secret token  and npm run dev or qa or pros


# GitHub Repository Viewer - Take-Home Assignment - Aakanksha Patel

## Overview

Your task is to create a web application that interacts with GitHub's public APIs to fetch and display information about public repositories and their commits. This project will assess your skills in Node.js, TypeScript, API integration, and frontend development.

## Requirements

### Backend (Node.js & TypeScript)

1. Create a RESTful API using Node.js and Express.js (or a similar framework) with TypeScript.
2. Implement the following endpoints:
   - `GET /api/repositories/:username`: Fetch the latest 10 public repositories for a given GitHub username.
   - `GET /api/commits/:owner/:repo`: Fetch the latest 10 commits for a specified repository.
3. Use environment variables for configuration (e.g., GitHub API tokens, if needed).
4. Implement error handling and appropriate HTTP status codes.
5. Write unit tests for your API endpoints using a testing framework of your choice (e.g., Jest, Mocha).

### Frontend (TypeScript & Framework of Choice)

1. Create a simple, responsive UI using a framework of your choice (e.g., React, Vue, Angular). We recommend using a UI library like Material-UI, Ant Design, or Tailwind CSS for faster development.
2. Implement a search input where users can enter a GitHub username.
3. Display the latest 10 public repositories for the entered username.
4. When a repository is clicked, show the latest 10 commits for that repository.
5. Implement proper error handling and loading states.

## GitHub API Details

For this assignment, you'll be working with the following GitHub API endpoints:

1. List user repositories:
   - Endpoint: `GET https://api.github.com/users/{username}/repos`
   - Documentation: [List repositories for a user](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
   - Parameters:
     - `sort`: string (Optional) - Can be one of `created`, `updated`, `pushed`, `full_name`
     - `direction`: string (Optional) - Can be one of `asc` or `desc`
     - `per_page`: integer (Optional) - Results per page (max 100, default 30)
   - Example request: `https://api.github.com/users/octocat/repos?sort=updated&direction=desc&per_page=10`

2. List commits:
   - Endpoint: `GET https://api.github.com/repos/{owner}/{repo}/commits`
   - Documentation: [List commits](https://docs.github.com/en/rest/commits/commits#list-commits)
   - Parameters:
     - `sha`: string (Optional) - SHA or branch to start listing commits from
     - `per_page`: integer (Optional) - Results per page (max 100, default 30)
   - Example request: `https://api.github.com/repos/octocat/Hello-World/commits?per_page=10`

Note: GitHub API has rate limiting. For unauthenticated requests, the rate limit allows for up to 60 requests per hour. For API requests using Authentication, you can make up to 5,000 requests per hour. You should implement appropriate error handling for rate limit errors.

## Evaluation Criteria

Your submission will be evaluated based on the following criteria:

1. **Code Quality**: Clean, well-organized, and properly documented code.
2. **Architecture**: Proper separation of concerns and a well-structured project.
3. **TypeScript Usage**: Effective use of TypeScript features and type safety.
4. **API Design**: RESTful API design and proper use of HTTP methods and status codes.
5. **Error Handling**: Robust error handling on both frontend and backend.
6. **Testing**: Comprehensive unit tests for the backend API.
7. **UI/UX**: A clean, intuitive, and responsive user interface.
8. **Git Usage**: Clear, descriptive commit messages and a logical commit history.

## Best Practices

Please adhere to the following best practices:

1. Use meaningful variable and function names.
2. Follow the SOLID principles in your code design.
3. Implement proper logging for backend operations.
4. Use async/await for handling asynchronous operations.
5. Implement rate limiting to avoid hitting GitHub API limits.
6. Use TypeScript interfaces or types for defining data structures.
7. Implement proper error boundaries in the frontend.
8. Use environment variables for sensitive information.
9. Include a `.gitignore` file to exclude unnecessary files from the repository.
10. Provide clear instructions in the README on how to set up and run the project.

## Submission Guidelines

1. Create a new public GitHub repository for this project.
2. Commit your code regularly with clear, descriptive commit messages.
3. Include a README.md file with:
   - Project overview
   - Setup instructions
   - API documentation
   - Any assumptions or design decisions you made
4. Ensure all tests pass before submitting.
5. Send us the link to your GitHub repository when you're done.

## Bonus Points (Optional)

- Implement pagination for repositories and commits.
- Add GitHub authentication to increase API rate limits.
- Implement caching to reduce API calls.
- Add end-to-end tests using a framework like Cypress.
- Dockerize the application for easy setup and deployment.

Good luck! We're excited to see your implementation.
