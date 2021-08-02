"use strict";(self.webpackChunkvuepress_docs=self.webpackChunkvuepress_docs||[]).push([[296],{5235:(e,n,s)=>{s.r(n),s.d(n,{data:()=>a});const a={key:"v-2f04e461",path:"/deploy/aws/",title:"Django CDK Construct Library",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Features",slug:"features",children:[]},{level:2,title:"Using the constructs",slug:"using-the-constructs",children:[{level:3,title:"EKS",slug:"eks",children:[]},{level:3,title:"ECS",slug:"ecs",children:[]}]},{level:2,title:"Key differences between ECS and EKS constructs",slug:"key-differences-between-ecs-and-eks-constructs",children:[{level:3,title:"Container orchestration",slug:"container-orchestration",children:[]},{level:3,title:"Load Balancer",slug:"load-balancer",children:[]},{level:3,title:"Compute",slug:"compute",children:[]}]},{level:2,title:"projen",slug:"projen",children:[]},{level:2,title:"Development",slug:"development",children:[]},{level:2,title:"Current Development Efforts",slug:"current-development-efforts",children:[]}],filePathRelative:"deploy/aws/README.md",git:{updatedTime:1627862655e3,contributors:[{name:"Brian Caffey",email:"briancaffey2010@gmail.com",commits:1}]}}},17:(e,n,s)=>{s.r(n),s.d(n,{default:()=>se});var a=s(6252);const t=(0,a.uE)('<h1 id="django-cdk-construct-library" tabindex="-1"><a class="header-anchor" href="#django-cdk-construct-library" aria-hidden="true">#</a> Django CDK Construct Library</h1><p>This is a CDK construct library for deploying Django applications on AWS.</p><p>High-level constructs are available for deploying applications with the following AWS compute services:</p><ul><li>ECS (near complete)</li><li>EKS (in progress)</li><li>Lambda (planned)</li><li>S3 bucket and IAM user* (complete)</li></ul><p>To use one of the constructs you need to provide:</p><ul><li>A path to the root of your Django project</li><li>The location of the <code>Dockerfile</code> used to build your application&#39;s image (for EKS and ECS) relative to your Django project&#39;s root directory</li><li>The commands used to start the process that run your application: <ul><li>web server process (required)</li><li>celery (optional)</li><li>celery beat (optional)</li></ul></li><li>Options for how to run the application and which additional services your application requires</li></ul><ul><li>If you are hosting your application outside of AWS, there is also a construct that can be used for provisioning a new S3 bucket along with an IAM user with the necessary permissions to access it. This can be used for hosting static files as well as media files.*</li></ul>',7),o=(0,a.Uk)("This project uses the AWS CDK and is written in TypeScript, so the options for each construct are defined by TypeScript Interfaces. See "),r={href:"/API.md",target:"_blank",rel:"noopener noreferrer"},i=(0,a.Uk)("API.md"),c=(0,a.Uk)(" for automatically-generated documentation on the interfaces for each construct."),p=(0,a.uE)('<p>The construct library is published both to <code>npm</code> and <code>PyPI</code>, so you can use it in CDK projects that are written in TypeScript or Python.</p><h2 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features</h2><p>The constructs provides everything you will need for your backend including:</p><ul><li>VPC (Subnets, Security Groups, AZs, NAT Gateway)</li><li>Load Balancer</li><li>ACM Certificates (for TLS)</li><li>Route53 Records</li><li>RDS (postgres)</li><li>ElastiCache (redis)</li></ul><h2 id="using-the-constructs" tabindex="-1"><a class="header-anchor" href="#using-the-constructs" aria-hidden="true">#</a> Using the constructs</h2><p>This repository includes sample CDK applications that use the libraries.</p><h3 id="eks" tabindex="-1"><a class="header-anchor" href="#eks" aria-hidden="true">#</a> EKS</h3><p>Overview of the EKS construct:</p><p><img src="/diagrams/django-cdk.png" alt="png"></p><p>1 - Resource in this diagram are defined by a CDK construct library called <code>django-eks</code> which is written in TypeScript and published to PyPi and npmjs.org. The project is managed by projen.</p><p>2 - The project uses jsii to transpile Typescript to Python, and the project is published to both PyPI and npm.</p><p>3 - The library is imported in a CDK application that is written in either TypeScript or Python.</p><p>4 - The CDK application is synthesized into CloudFormation templates which are used to build a CloudFormation stack that will contain all of the resources defined in the contstruct.</p><p>5 - An ECR registry is created when running <code>cdk bootstrap</code>, and it is used to store docker images that the application builds and later uses.</p><p>6 - An S3 bucket is also created by the <code>cdk bootstrap</code> command. This bucket is used for storing assets needed by CDK.</p><p>7 - The VPC is a the skeleton of the application. The CDK construct used for creating the VPC in our application sets up several resources including subnets, NAT gateways, internet gateway, route tables, etc.</p><p>8 - The Route53 record points to the Application Load Balancer (ALB) that routes traffic to our application. The record is created indirectly by CDK; external-dns creates the A Record resource based on annotations on the ALB.</p><p>9 - The Internet Gateway attached to our VPC</p><p>10 - The Application Load Balancer that is created by the AWS Load Balancer Controller</p><p>11 - EKS, the container orchestration layer in our application. AWS manages the control plane</p><p>12 - OpenIDConnect Provider used for handling permissions between pods and other AWS resources</p><p>13 - This is a node in the default node group of the EKS cluster</p><p>14 - The app namespace is where our application&#39;s Kubernetes resources will be deployed</p><p>15 - The Ingress that Routes traffic to the service for the Django application</p><p>16 - The service for the Django application</p><p>17 - The deployment/pods for the Django application. These pods have a service account that will give it access to other AWS resources through IRSA</p><p>18 - The deployment/pods for the celery workers in the Django application</p><p>19 - The IAM role and service account that are attached to the pods in our application. The service account is annotated with the IAM role&#39;s ARN (IRSA).</p><p>20 - external-dns is installed in our cluster to a dedicated namespace called external-dns. It is responsible for creating the Route53 record that points to the ALB. In future version of AWS Load Balancer Controller, external-dns may not be necessary.</p><p>21 - AWS Load Balancer Controller is installed into the kube-system namespace. This controller is responsible for provisioning an AWS Load Balancer when an Ingress object is deployed to the EKS cluster.</p><p>22 - RDS Postgres Instance that is placed in an isolated subnet. The security group for the default node group has access to the security group where the RDS instance is placed in an isolated subnet.</p><p>23 - Secrets Manager is used to provide the database password. The pods that run the Django application have access to the database secret in Secrets Manager, and they request it via a library that wraps boto3 calls and also caches secrets to reduce calls to secrets manager.</p><p>24 - ElastiCache Redis instance handles application caching and serves as the message broker for celery.</p><p>25 - Since the application runs in private subnets, outbound traffic is sent through NAT Gateways (Network Adress Translation) in public subnets that can be routed back to the public internet.</p><p>26 - An S3 bucket that our application can use for storing media assets.</p><p>Here&#39;s an example from <code>src/integ.django-eks.ts</code>:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&#39;@aws-cdk/core&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> DjangoEks <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./index&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> env <span class="token operator">=</span> <span class="token punctuation">{</span>\n  region<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">AWS_DEFAULT_REGION</span> <span class="token operator">||</span> <span class="token string">&#39;us-east-1&#39;</span><span class="token punctuation">,</span>\n  account<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">AWS_ACCOUNT_ID</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">cdk</span><span class="token punctuation">.</span><span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">cdk</span><span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> <span class="token string">&#39;DjangoEks&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> env <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> construct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DjangoEks</span><span class="token punctuation">(</span>stack<span class="token punctuation">,</span> <span class="token string">&#39;Cdk-Sample-Lib&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  imageDirectory<span class="token operator">:</span> <span class="token string">&#39;./test/django-step-by-step/backend&#39;</span><span class="token punctuation">,</span>\n  webCommand<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token string">&#39;./scripts/start_prod.sh&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token doc-comment comment">/**\n * Add tagging for this construct and all child constructs\n */</span>\ncdk<span class="token punctuation">.</span>Tags<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>construct<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&#39;stack&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;MyStack&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>This sample application (and others defined in the <code>integ.*.ts</code> files in this repo) can be easily deployed for testing purposes with targets defined in the <code>Makefile</code>. To deploy the above application, you can run:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>npm run build\nmake deploy-eks\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Destroy the application with:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>make destroy-eks\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',41),l=(0,a.Uk)("This assumes that you have credentials configured in your AWS CLI with sufficient permissions and that you have "),u={href:"https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html",target:"_blank",rel:"noopener noreferrer"},d=(0,a.Uk)("bootstrapped your AWS account"),h=(0,a.Uk)(". You will also need to have docker CLI configured in order for CDK to build images and push them to ECR."),k=(0,a.uE)('<h3 id="ecs" tabindex="-1"><a class="header-anchor" href="#ecs" aria-hidden="true">#</a> ECS</h3><p><img src="/diagrams/django-ecs.png" alt="png"></p><p>The ECS construct uses the <code>ApplicationLoadBalancedFargateService</code> construct from <code>@aws-cdk/aws-ecs-patterns</code>. This is a powerful abstraction that handles a lot of the networking requirements for the construct.</p><h2 id="key-differences-between-ecs-and-eks-constructs" tabindex="-1"><a class="header-anchor" href="#key-differences-between-ecs-and-eks-constructs" aria-hidden="true">#</a> Key differences between ECS and EKS constructs</h2><p>The ECS and EKS constructs aim to do the same thing: deploy containerized applications to AWS.</p><h3 id="container-orchestration" tabindex="-1"><a class="header-anchor" href="#container-orchestration" aria-hidden="true">#</a> Container orchestration</h3>',6),m=(0,a.Uk)("The ECS constructs uses Amazon's proprietary, closed-source container orchestration tool called ECS. The EKS construct uses an "),b={href:"https://github.com/aws/eks-distro",target:"_blank",rel:"noopener noreferrer"},g=(0,a.Uk)("open source distribution of Kubernetes"),f=(0,a.Uk)(" called Amazon EKS Distro (EKS-D)."),y=(0,a.Wm)("h3",{id:"load-balancer",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#load-balancer","aria-hidden":"true"},"#"),(0,a.Uk)(" Load Balancer")],-1),w=(0,a.Wm)("p",null,"Another important difference from an infrastructure and Infrastructure as Code (IaC) perspective is the use of Application Load Balancers (ALBs).",-1),v=(0,a.Wm)("blockquote",null,[(0,a.Wm)("p",null,"The load balancer distributes incoming application traffic across multiple targets, such as EC2 instances, in multiple Availability Zones.")],-1),S=(0,a.Wm)("p",null,[(0,a.Uk)("The ECS and EKS constructs go about provisioning ALBs differently. In the ECS construct, the "),(0,a.Wm)("code",null,"ApplicationLoadBalancedFargateService"),(0,a.Uk)(" in the CDK code results in CloudFormation code that requests an application load balancer.")],-1),W=(0,a.Uk)("The EKS construct does not directly request an ALB. Instead, it installs the "),C={href:"https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html",target:"_blank",rel:"noopener noreferrer"},A=(0,a.Uk)("AWS Load Balancer Controller"),T=(0,a.Uk)(", "),j={href:"https://github.com/kubernetes-sigs/aws-load-balancer-controller",target:"_blank",rel:"noopener noreferrer"},E=(0,a.Uk)("an open source project"),D=(0,a.Uk)(", using a Helm chart. This controller satisfies Kubernetes Ingress resources by provisioning Application Load Balancers. The contruct defines a Kubernetes Ingress object which, when deployed to the EKS cluster, causes the AWS Load Balancer Controller to provision an ALB. You can read more about Kubernetes Controllers "),K={href:"https://kubernetes.io/docs/concepts/architecture/controller/#direct-control",target:"_blank",rel:"noopener noreferrer"},U=(0,a.Uk)("here"),L=(0,a.Uk)("."),I=(0,a.Uk)("The Ingress object defined in the construct uses "),x={href:"https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/",target:"_blank",rel:"noopener noreferrer"},B=(0,a.Uk)("annotations"),R=(0,a.Uk)(" that the controller processes when provisioning the ALB. A list of all supported annotations can be found "),P={href:"https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/#annotations",target:"_blank",rel:"noopener noreferrer"},_=(0,a.Uk)("here on the AWS Load Balancer Controller website"),F=(0,a.Wm)("h3",{id:"compute",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#compute","aria-hidden":"true"},"#"),(0,a.Uk)(" Compute")],-1),M=(0,a.Wm)("p",null,"One other important difference between the two constructs is the type of compute used to run the container workloads. The ECS construct uses Fargate, a serverless computer offering from AWS. The EKS construct uses EC2 instances for the worker nodes of the EKS cluster. It is possible to use Fargate with EKS, but AWS currently recommends not using Fargate for sensitive workloads on EKS.",-1),q=(0,a.Wm)("h2",{id:"projen",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#projen","aria-hidden":"true"},"#"),(0,a.Uk)(" projen")],-1),z=(0,a.Uk)("This project uses "),G={href:"https://github.com/projen/projen",target:"_blank",rel:"noopener noreferrer"},N=(0,a.Uk)("projen"),O=(0,a.Uk)("."),H=(0,a.Wm)("blockquote",null,[(0,a.Wm)("p",null,"projen synthesizes project configuration files such as package.json, tsconfig.json, .gitignore, GitHub Workflows, eslint, jest, etc from a well-typed definition written in JavaScript.")],-1),V=(0,a.Wm)("h2",{id:"development",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#development","aria-hidden":"true"},"#"),(0,a.Uk)(" Development")],-1),Y=(0,a.Wm)("p",null,[(0,a.Uk)("For development of this library, a sample Django application is included as a git submodule in "),(0,a.Wm)("code",null,"test/django-step-by-step"),(0,a.Uk)(". This Django project is used when deploying the application, and can be replaced with your own project for testing purposes.")],-1),Z=(0,a.Wm)("h2",{id:"current-development-efforts",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#current-development-efforts","aria-hidden":"true"},"#"),(0,a.Uk)(" Current Development Efforts")],-1),J=(0,a.Wm)("p",null,"This project is under active development. Here are some of the things that I'm curently working on:",-1),Q=(0,a.Uk)("[ ] Go over this Kubernetes checklist: "),X={href:"https://www.weave.works/blog/production-ready-checklist-kubernetes",target:"_blank",rel:"noopener noreferrer"},$=(0,a.Uk)("https://www.weave.works/blog/production-ready-checklist-kubernetes"),ee=(0,a.Wm)("li",null,"[ ] Add snapshot tests and refactor the application",-1),ne=(0,a.Wm)("li",null,"[ ] Add unit tests",-1),se={render:function(e,n){const s=(0,a.up)("OutboundLink");return(0,a.wg)(),(0,a.j4)(a.HY,null,[t,(0,a.Wm)("p",null,[o,(0,a.Wm)("a",r,[i,(0,a.Wm)(s)]),c]),p,(0,a.Wm)("p",null,[l,(0,a.Wm)("a",u,[d,(0,a.Wm)(s)]),h]),k,(0,a.Wm)("p",null,[m,(0,a.Wm)("a",b,[g,(0,a.Wm)(s)]),f]),y,w,v,S,(0,a.Wm)("p",null,[W,(0,a.Wm)("a",C,[A,(0,a.Wm)(s)]),T,(0,a.Wm)("a",j,[E,(0,a.Wm)(s)]),D,(0,a.Wm)("a",K,[U,(0,a.Wm)(s)]),L]),(0,a.Wm)("p",null,[I,(0,a.Wm)("a",x,[B,(0,a.Wm)(s)]),R,(0,a.Wm)("a",P,[_,(0,a.Wm)(s)])]),F,M,q,(0,a.Wm)("p",null,[z,(0,a.Wm)("a",G,[N,(0,a.Wm)(s)]),O]),H,V,Y,Z,J,(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[Q,(0,a.Wm)("a",X,[$,(0,a.Wm)(s)])]),ee,ne])],64)}}}}]);