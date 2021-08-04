# MINIKUBE

# Setup minikube on M1 Macs

First, follow along with this article: https://mirairo.net/minikube-on-m1/

Download the darmin-arm64 version of minikube:

```
https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64
```

```
chmod +x minikube-darwin-arm64
mv minikube-darwin-arm64 minikube
sudo mv minikube /usr/local/bin/
```

## Addons

```
minikube addons enable registry
╭──────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│    Registry addon with docker driver uses port 62625 please use that instead of default port 5000    │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📘  For more information see: https://minikube.sigs.k8s.io/docs/drivers/docker
    ▪ Using image registry:2.7.1
    ▪ Using image gcr.io/google_containers/kube-registry-proxy:0.4
🔎  Verifying registry addon...
🌟  The 'registry' addon is enabled
```

## How to get images from your machine to the minikube cluster

https://minikube.sigs.k8s.io/docs/handbook/pushing/#7-loading-directly-to-in-cluster-container-runtime

## Open the dashboard

```
minikube dashboard
```
