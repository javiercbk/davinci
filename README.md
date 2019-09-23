# Davinci

Davinci is an antropometry software.

## Running davinci in a development environment

Go to the root of the project and execute

```bash
docker-compose build
docker-compose up
```

That will expose the web application in port 5000 and port 9229 will be available for a remote debugger to be attached.

## Running davinci tests

In the command line type: `npm test`. The `launch.json` file contains the proper configuration to run the test from **vscode** as well.

## Running davinci in a production

If you want to deploy this application in a server it is recommended to create a production docker-compose file that overrides the default environment, you can name it `docker-compose.prod.yml`. That file **SHOULD NOT** be pushed in the repository and **MUST** be kept secret.

In this case you can start the server like this:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Testing local kubernetes

Follow [these steps](https://container-solutions.com/using-google-container-registry-with-kubernetes/) to allow google container access.

Create a k8s/davinci.yaml with the proper env vars and then

```bash
kubectl delete deployments --all
kubectl delete services --all
kubectl create -f k8s/davinci.yaml
# use proper nginx pod name
kubectl port-forward nginx-855b7f6c7f-mc7z8 8844:80
```

