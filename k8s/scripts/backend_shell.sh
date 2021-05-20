# open a shell in the backend container

echo "opening backend shell.."

BACKEND_POD=$(kubectl get pods -n app | grep "backendapi" | awk '{print $1}')
kubectl exec $BACKEND_POD -n app -it -- /bin/bash
