# check minikube workflow dependencies

echo "check minikube workflow dependencies"

command minikube > /dev/null

MINIKUBE=$?

if [ $MINIKUBE != 0 ]; then

    echo "minikube is not installed"
    exit 1

    else

    echo "minikube is installed"
    
fi
