# Infrastructure as Code (IaC)

This folder defines infrastructure as code for the project using Terraform and CDK.

## AWS CDK

AWS Cloud Development Kit (CDK) is used to generate CloudFormation scripts that are used to provision infrastructure through stacks. A stack is a grouping of resources.

This project uses a CDK Construct library called [`django-cdk`](#) that is published online as a reusable construct. The repo for this reusable construct library can be found here: [https://github.com/briancaffey/cdk-django](https://github.com/briancaffey/cdk-django). `cdk-django` is developed using a tool called `projen`.

The `cdk-django` library is used in this project, and to use this project, we are also using `projen` to manage the code that makes use of `cdk-django`.

### bootstrap account

```
cdk bootstrap aws://123456789012/us-east-1
```

### Create `awscdk-app-ts`

```
cd iac/cdk
npx projen new awscdk-app-ts --no-git
```

Install `cdk-django`:

Instead of running the following:

```
yarn add cdk-django
```

We can add `cdk-django@0.0.0` to the `deps` array in `.projenrc.js` in our new `AwsCdkTypeScriptApp` project, follow by `npx projen` in the `iac/cdk` directory which will install the package locally in `node_modules`.

## Pulumi

Templates

```
Available Templates:
  aiven-go                           A minimal Aiven Go Pulumi program
  alicloud-csharp                    A minimal AliCloud C# Pulumi program
  alicloud-fsharp                    A minimal AliCloud F# Pulumi program
  alicloud-go                        A minimal AliCloud Go Pulumi program
  alicloud-javascript                A minimal AliCloud JavaScript Pulumi program
  alicloud-python                    A minimal AliCloud Python Pulumi program
  alicloud-typescript                A minimal AliCloud TypeScript Pulumi program
  alicloud-visualbasic               A minimal AliCloud VB.NET Pulumi program
  alicloud-yaml                      A minimal AliCloud Pulumi YAML program
  auth0-csharp                       A minimal Auth0 C# Pulumi program
  auth0-go                           A minimal Auth0 Go Pulumi program
  auth0-javascript                   A minimal Auth0 TypeScript Pulumi program
  auth0-python                       A minimal Auth0 Python Pulumi program
  auth0-typescript                   A minimal Auth0 TypeScript Pulumi program
  auth0-yaml                         A minimal Auth0 Pulumi YAML program
  aws-csharp                         A minimal AWS C# Pulumi program
  aws-fsharp                         A minimal AWS F# Pulumi program
  aws-go                             A minimal AWS Go Pulumi program
  aws-java                           A minimal AWS Java Pulumi program
  aws-javascript                     A minimal AWS JavaScript Pulumi program
  aws-native-csharp                  A minimal AWS C# Pulumi program
  aws-native-fsharp                  A minimal AWS F# Pulumi program
  aws-native-go                      A minimal AWS Go Pulumi program
  aws-native-javascript              A minimal AWS JavaScript Pulumi program
  aws-native-python                  A minimal AWS Python Pulumi program
  aws-native-typescript              A minimal AWS TypeScript Pulumi program
  aws-native-visualbasic             A minimal AWS VB.NET Pulumi program
  aws-native-yaml                    A minimal AWS Pulumi YAML program
  aws-python                         A minimal AWS Python Pulumi program
  aws-typescript                     A minimal AWS TypeScript Pulumi program
  aws-visualbasic                    A minimal AWS VB.NET Pulumi program
  aws-yaml                           A minimal AWS Pulumi YAML program
  azure-classic-csharp               A minimal C# Pulumi program with the classic Azure provider
  azure-classic-fsharp               A minimal F# Pulumi program with the classic Azure provider
  azure-classic-go                   A minimal Go Pulumi program with the classic Azure provider
  azure-classic-javascript           A minimal JavaScript Pulumi program with the classic Azure provider
  azure-classic-python               A minimal Python Pulumi program with the classic Azure provider
  azure-classic-typescript           A minimal TypeScript Pulumi program with the classic Azure provider
  azure-classic-visualbasic          A minimal VB.NET Pulumi program with the classic Azure provider
  azure-classic-yaml                 A minimal Pulumi YAML program with the classic Azure provider
  azure-csharp                       A minimal Azure Native C# Pulumi program
  azure-fsharp                       A minimal Azure Native F# Pulumi program
  azure-go                           A minimal Azure Native Go Pulumi program
  azure-java                         A minimal Azure Native Java Pulumi program
  azure-javascript                   A minimal JavaScript Pulumi program with the native Azure provider
  azure-python                       A minimal Azure Native Python Pulumi program
  azure-typescript                   A minimal Azure Native TypeScript Pulumi program
  azure-yaml                         A minimal Azure Native Pulumi YAML program
  azuredevops-python                 A minimal Azure DevOps Python Pulumi program to create an AzureDevOps Project
  civo-go                            A minimal Civo Go Pulumi program
  civo-javascript                    A minimal Civo TypeScript Pulumi program
  civo-python                        A minimal Civo Python Pulumi program
  civo-typescript                    A minimal Civo TypeScript Pulumi program
  civo-yaml                          A minimal Civo Pulumi YAML program
  container-aws-csharp               A C# program to deploy a containerized service on AWS
  container-aws-go                   A Go program to deploy a containerized service on AWS
  container-aws-python               A Python program to deploy a containerized service on AWS
  container-aws-typescript           A TypeScript program to deploy a containerized service on AWS
  container-aws-yaml                 A Pulumi YAML program to deploy a containerized service on AWS
  container-azure-csharp             A C# program to deploy a containerized service on Azure
  container-azure-go                 A Go program to deploy a containerized service on Azure
  container-azure-python             A Python program to deploy a containerized service on Azure
  container-azure-typescript         A TypeScript program to deploy a containerized service on Azure
  container-gcp-csharp               A C# program to deploy a containerized service on Google Cloud
  container-gcp-go                   A Go program to deploy a containerized service on Google Cloud
  container-gcp-python               A Python program to deploy a containerized service on Google Cloud
  container-gcp-typescript           A TypeScript program to deploy a containerized service on Google Cloud
  csharp                             A minimal C# Pulumi program
  digitalocean-go                    A minimal DigitalOcean Go Pulumi program
  digitalocean-javascript            A minimal DigitalOcean JavaScript Pulumi program
  digitalocean-python                A minimal DigitalOcean Python Pulumi program
  digitalocean-typescript            A minimal DigitalOcean TypeScript Pulumi program
  digitalocean-yaml                  A minimal DigitalOcean Pulumi YAML program
  equinix-metal-go                   A minimal Equinix Metal Go Pulumi program
  equinix-metal-javascript           A minimal Equinix Metal JavaScript Pulumi program
  equinix-metal-python               A minimal Equinix Metal Python Pulumi program
  equinix-metal-typescript           A minimal Equinix Metal TypeScript Pulumi program
  equinix-metal-yaml                 A minimal Equinix Metal Pulumi YAML program
  fsharp                             A minimal F# Pulumi program
  gcp-csharp                         A minimal Google Cloud C# Pulumi program
  gcp-fsharp                         A minimal GCP F# Pulumi program
  gcp-go                             A minimal Google Cloud Go Pulumi program
  gcp-java                           A minimal Google Cloud Java Pulumi program
  gcp-javascript                     A minimal Google Cloud JavaScript Pulumi program
  gcp-python                         A minimal Google Cloud Python Pulumi program
  gcp-typescript                     A minimal Google Cloud TypeScript Pulumi program
  gcp-visualbasic                    A minimal GCP VB.NET Pulumi program
  gcp-yaml                           A minimal Google Cloud Pulumi YAML program
  github-csharp                      A minimal GitHub C# Pulumi program
  github-go                          A minimal GitHub Go Pulumi program
  github-javascript                  A minimal GitHub JavaScript Pulumi program.
  github-python                      A minimal GitHub Python Pulumi program
  github-typescript                  A minimal GitHub TypeScript Pulumi program.
  github-yaml                        A minimal GitHub Pulumi YAML program.
  go                                 A minimal Go Pulumi program
  google-native-csharp               A minimal Google Cloud C# Pulumi program
  google-native-go                   A minimal Google Cloud Go Pulumi program
  google-native-python               A minimal Google Cloud Python Pulumi program
  google-native-typescript           A minimal Google Cloud TypeScript Pulumi program
  google-native-yaml                 A minimal Google Cloud Pulumi YAML program
  hello-aws-javascript               A simple AWS serverless JavaScript Pulumi program
  helm-kubernetes-csharp             A C# program to deploy a Helm chart onto a Kubernetes cluster
  helm-kubernetes-go                 A Go program to deploy a Helm chart onto a Kubernetes cluster
  helm-kubernetes-python             A Python program to deploy a Helm chart onto a Kubernetes cluster
  helm-kubernetes-typescript         A TypeScript program to deploy a Helm chart onto a Kubernetes cluster
  helm-kubernetes-yaml               A Pulumi YAML program to deploy a Helm chart onto a Kubernetes cluster
  java                               A minimal Java Pulumi program with Maven builds
  java-gradle                        A minimal Java Pulumi program with Gradle builds
  java-jbang                         A minimal Java Pulumi program with JBang
  javascript                         A minimal JavaScript Pulumi program
  kubernetes-aws-csharp              A C# program to deploy a Kubernetes cluster on AWS
  kubernetes-aws-go                  A Go program to deploy a Kubernetes cluster on AWS
  kubernetes-aws-python              A Python program to deploy a Kubernetes cluster on AWS
  kubernetes-aws-typescript          A TypeScript program to deploy a Kubernetes cluster on AWS
  kubernetes-aws-yaml                A Pulumi YAML program to deploy a Kubernetes cluster on AWS
  kubernetes-azure-csharp            A C# program to deploy a Kubernetes cluster on Azure
  kubernetes-azure-go                A Go program to deploy a Kubernetes cluster on Azure
  kubernetes-azure-python            A Python program to deploy a Kubernetes cluster on Azure
  kubernetes-azure-typescript        A TypeScript program to deploy a Kubernetes cluster on Azure
  kubernetes-azure-yaml              A Pulumi YAML program to deploy a Kubernetes cluster on Azure
  kubernetes-csharp                  A minimal Kubernetes C# Pulumi program
  kubernetes-fsharp                  A minimal Kubernetes F# Pulumi program
  kubernetes-gcp-csharp              A C# program to deploy a Kubernetes cluster on Google Cloud
  kubernetes-gcp-go                  A Go program to deploy a Kubernetes cluster on Google Cloud
  kubernetes-gcp-python              A Python program to deploy a Kubernetes cluster on Google Cloud
  kubernetes-gcp-typescript          A TypeScript program to deploy a Kubernetes cluster on Google Cloud
  kubernetes-gcp-yaml                A YAML program to deploy a Kubernetes cluster on Google Cloud
  kubernetes-go                      A minimal Kubernetes Go Pulumi program
  kubernetes-java                    A minimal Kubernetes Java Pulumi program
  kubernetes-javascript              A minimal Kubernetes JavaScript Pulumi program
  kubernetes-python                  A minimal Kubernetes Python Pulumi program
  kubernetes-typescript              A minimal Kubernetes TypeScript Pulumi program
  kubernetes-yaml                    A minimal Kubernetes Pulumi YAML program
  linode-go                          A minimal Linode Go Pulumi program
  linode-javascript                  A minimal Linode JavaScript Pulumi program
  linode-python                      A minimal Linode Python Pulumi program
  linode-typescript                  A minimal Linode TypeScript Pulumi program
  linode-yaml                        A minimal Linode Pulumi YAML program
  oci-go                             A minimal OCI Go Pulumi program
  oci-java                           A minimal Java Pulumi program with Maven builds
  oci-javascript                     A minimal OCI JavaScript Pulumi program
  oci-python                         A minimal OCI Python Pulumi program
  oci-typescript                     A minimal OCI TypeScript Pulumi program
  oci-yaml
  openstack-go                       A minimal OpenStack Go Pulumi program
  openstack-javascript               A minimal OpenStack JavaScript Pulumi program
  openstack-python                   A minimal OpenStack Python Pulumi program
  openstack-typescript               A minimal OpenStack TypeScript Pulumi program
  openstack-yaml                     A minimal OpenStack Pulumi YAML program
  python                             A minimal Python Pulumi program
  serverless-aws-csharp              A C# program to deploy a serverless application on AWS
  serverless-aws-go                  A Go program to deploy a serverless application on AWS
  serverless-aws-python              A Python program to deploy a serverless application on AWS
  serverless-aws-typescript          A TypeScript program to deploy a serverless application on AWS
  serverless-aws-yaml                A Pulumi YAML program to deploy a serverless application on AWS
  serverless-azure-csharp            A C# program to deploy a serverless application on Azure
  serverless-azure-go                A Go program to deploy a serverless application on Azure
  serverless-azure-python            A Python program to deploy a serverless application on Azure
  serverless-azure-typescript        A TypeScript program to deploy a serverless application on Azure
  serverless-azure-yaml              A Pulumi YAML program to deploy a serverless application on Azure
  serverless-gcp-csharp              A C# program to deploy a serverless application on Google Cloud
  serverless-gcp-go                  A Go program to deploy a serverless application on Google Cloud
  serverless-gcp-python              A Python program to deploy a serverless application on Google Cloud
  serverless-gcp-typescript          A TypeScript program to deploy a serverless application on Google Cloud
  serverless-gcp-yaml                A Pulumi YAML program to deploy a serverless application on Google Cloud
  static-website-aws-csharp          A C# program to deploy a static website on AWS
  static-website-aws-go              A Go program to deploy a static website on AWS
  static-website-aws-python          A Python program to deploy a static website on AWS
  static-website-aws-typescript      A TypeScript program to deploy a static website on AWS
  static-website-aws-yaml            A Pulumi YAML program to deploy a static website on AWS
  static-website-azure-csharp        A C# program to deploy a static website on Azure
  static-website-azure-go            A Go program to deploy a static website on Azure
  static-website-azure-python        A Python program to deploy a static website on Azure
  static-website-azure-typescript    A TypeScript program to deploy a static website on Azure
  static-website-azure-yaml          A Pulumi YAML program to deploy a static website on Azure
  static-website-gcp-csharp          A C# program to deploy a static website on Google Cloud
  static-website-gcp-go              A Go program to deploy a static website on Google Cloud
  static-website-gcp-python          A Python program to deploy a static website on Google Cloud
  static-website-gcp-typescript      A TypeScript program to deploy a static website on Google Cloud
  static-website-gcp-yaml            A Pulumi YAML program to deploy a static website on Google Cloud
  typescript                         A minimal TypeScript Pulumi program
  visualbasic                        A minimal VB.NET Pulumi program
  vm-aws-csharp                      A C# program to deploy a virtual machine on Amazon EC2
  vm-aws-go                          A Go program to deploy a virtual machine on Amazon EC2
  vm-aws-python                      A Python program to deploy a virtual machine on Amazon EC2
  vm-aws-typescript                  A TypeScript program to deploy a virtual machine on Amazon EC2
  vm-aws-yaml                        A Pulumi YAML program to deploy a virtual machine on Amazon EC2
  vm-azure-csharp                    A C# program to deploy a virtual machine on Azure
  vm-azure-go                        A Go program to deploy a virtual machine on Azure
  vm-azure-python                    A Python program to deploy a virtual machine on Azure
  vm-azure-typescript                A TypeScript program to deploy a virtual machine on Azure
  vm-azure-yaml                      A Pulumi YAML program to deploy a virtual machine on Azure
  vm-gcp-csharp                      A C# program to deploy a virtual machine on Google Cloud
  vm-gcp-go                          A Go program to deploy a virtual machine on Google Cloud
  vm-gcp-python                      A Python program to deploy a virtual machine on Google Cloud
  vm-gcp-typescript                  A TypeScript program to deploy a virtual machine on Google Cloud
  vm-gcp-yaml                        A Pulumi YAML program to deploy a virtual machine on Google Cloud
  webapp-kubernetes-csharp           A C# program to deploy a web application onto a Kubernetes cluster
  webapp-kubernetes-go               A Go program to deploy a web application onto a Kubernetes cluster
  webapp-kubernetes-python           A Python program to deploy a web application onto a Kubernetes cluster
  webapp-kubernetes-typescript       A TypeScript program to deploy a web application onto a Kubernetes cluster
  webapp-kubernetes-yaml             A Pulumi YAML program to deploy a web application onto a Kubernetes cluster
  yaml                               A minimal Pulumi YAML program
```

Start with `container-aws-typescript`:

```
cd iac/pulumi
pulumi new container-aws-typescript
```
