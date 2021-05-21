# synthesizing manfiests

echo "Synthesizing manifests"

export TAG=$(git rev-parse --short HEAD);

cd k8s/cdk8s && cdk8s synth --k8s/cdk8s