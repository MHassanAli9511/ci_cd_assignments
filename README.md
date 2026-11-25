
# CI/CD Assignment — GitHub Actions

## Project Overview

This repository contains two CI/CD assignments completed using GitHub Actions.

- **Task 1 — Continuous Integration (CI):** Automatically run tests on a Node.js application whenever code is pushed to GitHub.
- **Task 2 — Continuous Delivery (CD):** Automatically build and publish a Flask Docker image to Docker Hub.

The aim was to gain practical experience with GitHub Actions, automated testing, Docker, GitHub Secrets and CI/CD troubleshooting.

## Repository Structure

```text
ci_cd_assignments/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── task_2.yml
│
├── task_1/
│   ├── app.js
│   ├── app.test.js
│   └── package.json
│
├── task_2/
│   ├── flask_app/
│   │   ├── Dockerfile
│   │   ├── My_Flask_app.py
│   │   └── templates/
│   ├── nginx/
│   ├── redis/
│   └── docker-compose.yml
│
└── README.md
```

---

## Task 1 — Continuous Integration

### Objective

Create a basic CI pipeline that automatically runs tests whenever changes are pushed to GitHub.

### Application

I used a simple Node.js application that displays:

```text
Hello, World!
```

![Node.js Application Code](<screenshots/Node.js application code.png>)

The application runs locally on port `3000`.

### Automated Testing

I created an `app.test.js` file containing a unit test that checks whether the application's `greet()` function returns the expected message.

The test uses Node.js's built-in testing tools.

To run the tests locally:

```bash
cd task_1
npm test
```

### GitHub Actions CI Pipeline

I created a workflow called `ci.yml`.

The workflow is configured to:

1. Trigger automatically when code is pushed.
2. Start an Ubuntu runner.
3. Check out the repository code.
4. Set up Node.js.
5. Install the project's dependencies.
6. Execute automated tests using `npm test`.

![CI Workflow Configuration](<screenshots/CI workflow configuration.png>)

GitHub Actions reports whether the tests pass or fail.

### Troubleshooting — ENOENT Error

My initial pipeline failed during the dependency installation step.

![Troubleshooting npm ENOENT Error](<screenshots/Troubleshooting npm ENOENT error.png>)

The error was:

```text
npm error code ENOENT
npm error Could not read package.json
```

**Cause:**

GitHub Actions executed `npm install` from the repository root.

However, my `package.json` file was inside the `task_1` directory.

**Solution:**

I used the `working-directory` setting for the installation and testing steps.

```yaml
working-directory: ./task_1
```

This ensured that the commands were executed in the correct directory.

After committing and pushing the changes, the CI pipeline ran successfully.

### Task 1 Result

**Status: Completed**

![Successful CI Run](<screenshots/Successful CI run.png>)

The GitHub Actions CI workflow now automatically runs my Node.js tests whenever code is pushed to the repository.

---

## Task 2 — Continuous Delivery

### Objective

Create a CD workflow that automatically builds a Docker image and publishes it to Docker Hub.

For this task, I reused an existing Docker project containing:

- A Flask application
- Redis
- Nginx
- Docker Compose

The CD workflow focuses on building and publishing the Flask application's Docker image.

### Docker Publishing Pipeline

I created a GitHub Actions workflow called `task_2.yml`.

![Docker Image Publishing Workflow](<screenshots/Docker image publishing workflow.png>)

The workflow performs the following actions:

1. Triggers when code is pushed to GitHub.
2. Starts an Ubuntu runner.
3. Checks out the repository.
4. Sets up Docker Buildx.
5. Authenticates with Docker Hub.
6. Builds the Flask Docker image.
7. Pushes the image to Docker Hub.

### Docker Hub Authentication

I configured GitHub Actions repository secrets to securely authenticate with Docker Hub.

The workflow references:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

The password secret contains the Docker Hub authentication credential.

This avoids exposing authentication credentials directly in the workflow file.

### Docker Build Context

My Flask application's Dockerfile is located inside:

```text
task_2/flask_app/
```

Therefore, the Docker build workflow needs to use the correct build context:

```yaml
context: ./task_2/flask_app
```

This ensures Docker can locate the Dockerfile and application files.

### Troubleshooting — Dockerfile Not Found

![First Failure Dockerfile Not Found](<screenshots/First failure Dockerfile not found.png>)

My first CD workflow failed with an error similar to:

```text
failed to read dockerfile:
open Dockerfile: no such file or directory
```

**Cause:**

Docker was attempting to locate the Dockerfile in the wrong directory.

**Solution:**

I updated the Docker build configuration to target the Flask application's directory.

### Troubleshooting — Build Context Not Found

My second attempt also failed because Docker could not locate the specified build context.

![Second Failure Build Context Not Found](<screenshots/Second failure build context not found.png>)

I investigated the workflow configuration and repository directory structure.

After correcting the checkout and build-context configuration, GitHub Actions successfully built and pushed the image.

### Published Docker Image

The final Docker image was published to Docker Hub.

**Image:**

```text
mhassanali2/my-image:latest
```

Docker Hub repository:

https://hub.docker.com/r/mhassanali2/my-image

### Task 2 Result

**Status: Completed**

![Successful Docker Image Publishing Workflow](<screenshots/Successful Docker image publishing workflow.png>)

My CD workflow now automatically builds and publishes the Flask Docker image whenever the workflow is triggered by a push.

The image is stored in Docker Hub and can be pulled onto another machine.

**Note:** This workflow publishes the Flask image; it does not automatically deploy the complete Flask, Redis and Nginx application to a running server.

---

## Assignment Results

| Task | Description | Status |
|------|-------------|--------|
| Task 1 | Automated Node.js testing using GitHub Actions | Completed |
| Task 2 | Automated Docker image build and push to Docker Hub | Completed |

Both workflows successfully ran after troubleshooting the initial errors.

---

## What I Learned

Through this assignment, I gained practical experience with:

- Creating GitHub Actions workflows.
- Configuring automatic push triggers.
- Using GitHub-hosted Ubuntu runners.
- Running automated tests in a CI pipeline.
- Configuring working directories.
- Building Docker images automatically.
- Publishing Docker images to Docker Hub.
- Using GitHub Secrets for authentication.
- Troubleshooting failed workflow runs.
- Investigating GitHub Actions execution logs.

One important lesson was understanding how file paths and working directories affect workflows.

For example, my CI pipeline initially failed because npm could not locate `package.json`, while my CD pipeline failed because Docker could not locate the correct build context.

Investigating these errors helped me understand how GitHub Actions runners interact with repository files.

## Conclusion

I successfully created two automated GitHub Actions workflows demonstrating Continuous Integration and Continuous Delivery.

The CI workflow automatically tests a Node.js application, while the CD workflow automatically builds and publishes a Flask Docker image to Docker Hub.

Both tasks helped strengthen my understanding of CI/CD automation and practical DevOps troubleshooting.
