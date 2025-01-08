# Microservices Orchestration with Argo Workflows

This project demonstrates orchestrating two microservices using Argo Workflows in a Kubernetes environment. The workflow is designed to execute the microservices sequentially, ensuring proper dependencies and status checks.

## Features

- **Microservices**:
  - `microservice-a`: Simulates a task with a dynamic runtime.
  - `microservice-b`: Executes after `microservice-a` completes successfully.
- **Argo Workflow**:
  - Implements a Directed Acyclic Graph (DAG) for orchestration.
  - Includes robust polling logic to check the status of each microservice.

## Project Structure

```plaintext
project-root/
├── microservice-a/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── microservice-a.js
│   └── node_modules/
├── microservice-b/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── microservice-b.js
│   └── node_modules/
├── k8s/
│   ├── executor-rolebinding.yaml
│   ├── executor-role.yaml
│   ├── microservice-a.yaml
│   ├── microservice-b.yaml
├── workflows/
│   └── dag-microservices.yaml
└── README.md
```
## Prerequisites

- **Docker**: To containerize and build the microservices.
- **Kubernetes**: To deploy the microservices and Argo Workflow.
- **Argo Workflows**: Installed in your Kubernetes cluster.

### Install Argo Workflows
```bash
kubectl create namespace argo
kubectl apply -n argo -f https://raw.githubusercontent.com/argoproj/argo-workflows/stable/manifests/install.yaml
```

## Setup

### 1. Build and Push Docker Images

#### Microservice A
```bash
cd microservice-a
docker build -t microservice-a:latest .
```

#### Microservice B
```bash
cd microservice-b
docker build -t microservice-b:latest .
```

#### Push Images to Docker Hub (Optional)
Replace `<username>` with your Docker Hub username:
```bash
docker tag microservice-a:latest <username>/microservice-a:latest
docker push <username>/microservice-a:latest

docker tag microservice-b:latest <username>/microservice-b:latest
docker push <username>/microservice-b:latest
```

### 2. Deploy Microservices to Kubernetes

Create Kubernetes manifests for the microservices:
- `microservice-a`
- `microservice-b`

Deploy them:
```bash
kubectl apply -f microservice-a.yaml
kubectl apply -f microservice-b.yaml
```

### 3. Deploy the Argo Workflow

Submit the workflow:
```bash
argo submit workflows/dag-microservices.yaml --watch
```

## How It Works

1. **Microservice A**:
   - Starts execution and simulates a dynamic runtime.
   - Provides a `/status` endpoint to check completion.
2. **Microservice B**:
   - Waits for `microservice-a` to complete.
   - Executes only after receiving a "completed" status.

### Workflow Execution Flow

1. Task `microservice-a` runs first.
2. Task `microservice-b` starts only if `microservice-a` completes successfully.

## File Descriptions

- **`microservice-a/`**: Code and Docker configuration for Microservice A.
- **`microservice-b/`**: Code and Docker configuration for Microservice B.
- **`workflows/dag-microservices.yaml`**: Argo Workflow configuration file.

## Requirements

- Docker 20.10+
- Kubernetes 1.21+
- Argo Workflows 3.4+

## Contributing

Feel free to fork this repository and contribute improvements! Open a pull request for discussion.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
