# How to deploy this project to a Raspberry Pi

This folder contains files that will allow us to deploy this project to a Raspberry Pi:

- [`deploy.sh`](deploy.sh) is a shell script that will deploy the project to a Raspberry Pi.
- [`stack.yaml`](stack.yaml) is a YAML file that describes the deployment stack that will be used to deploy the project.
- [`README.md`](README.md) is this file.


## Generate a Key on you computer

```
ssh-keygen
```

Copy the key to the Rasberry Pi:

```
ssh-copy-id ubuntu@<raspberry pi id>
```