"use strict";(self.webpackChunkvuepress_docs=self.webpackChunkvuepress_docs||[]).push([[719],{2360:(e,n,a)=>{a.r(n),a.d(n,{data:()=>t});const t={key:"v-41943a95",path:"/deploy/aws/overview/",title:"How to deploy μblog on AWS",lang:"en-US",frontmatter:{prev:"/deploy/digital-ocean"},excerpt:"",headers:[{level:2,title:"About django-cdk",slug:"about-django-cdk",children:[]},{level:2,title:"django-cdk constructs",slug:"django-cdk-constructs",children:[]},{level:2,title:"About CDK constructs",slug:"about-cdk-constructs",children:[]},{level:2,title:"Features of the DjangoVue, DjangoEcs and StaticSite constructs",slug:"features-of-the-djangovue-djangoecs-and-staticsite-constructs",children:[{level:3,title:"DjangoVue resources",slug:"djangovue-resources",children:[]},{level:3,title:"Configuring Django and Vue to use the same domain and subdomain",slug:"configuring-django-and-vue-to-use-the-same-domain-and-subdomain",children:[]},{level:3,title:"Automatic commands",slug:"automatic-commands",children:[]},{level:3,title:"ECS Exec",slug:"ecs-exec",children:[]}]},{level:2,title:"django-cdk documentation",slug:"django-cdk-documentation",children:[]},{level:2,title:"Using the constructs",slug:"using-the-constructs",children:[{level:3,title:"DjangoEks",slug:"djangoeks",children:[]},{level:3,title:"ECS",slug:"ecs",children:[]}]},{level:2,title:"Key differences between ECS and EKS constructs",slug:"key-differences-between-ecs-and-eks-constructs",children:[{level:3,title:"Container orchestration",slug:"container-orchestration",children:[]},{level:3,title:"Load Balancer",slug:"load-balancer",children:[]},{level:3,title:"Compute",slug:"compute",children:[]}]},{level:2,title:"projen",slug:"projen",children:[]},{level:2,title:"Development",slug:"development",children:[]},{level:2,title:"Current Development Efforts",slug:"current-development-efforts",children:[]},{level:2,title:"GitHub Discussions",slug:"github-discussions",children:[]}],filePathRelative:"deploy/aws/overview/README.md",git:{updatedTime:1662167528e3,contributors:[]}}},6354:(e,n,a)=>{a.r(n),a.d(n,{default:()=>cn});var t=a(6252);const o=(0,t.Wm)("h1",{id:"how-to-deploy-μblog-on-aws",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#how-to-deploy-μblog-on-aws","aria-hidden":"true"},"#"),(0,t.Uk)(" How to deploy μblog on AWS")],-1),s=(0,t.Wm)("p",null,"This page will describe how to deploy μblog on AWS using an Infrastructure as Code (IAC) tool called AWS CloudDevelopment Kit (CDK).",-1),r={class:"table-of-contents"},c=(0,t.Uk)("About django-cdk"),i=(0,t.Uk)("django-cdk constructs"),l=(0,t.Uk)("About CDK constructs"),u=(0,t.Uk)("Features of the DjangoVue, DjangoEcs and StaticSite constructs"),d=(0,t.Uk)("DjangoVue resources"),p=(0,t.Uk)("Configuring Django and Vue to use the same domain and subdomain"),h=(0,t.Uk)("Automatic commands"),m=(0,t.Uk)("ECS Exec"),g=(0,t.Uk)("django-cdk documentation"),k=(0,t.Uk)("Using the constructs"),f=(0,t.Uk)("DjangoEks"),b=(0,t.Uk)("ECS"),W=(0,t.Uk)("Key differences between ECS and EKS constructs"),w=(0,t.Uk)("Container orchestration"),y=(0,t.Uk)("Load Balancer"),j=(0,t.Uk)("Compute"),v=(0,t.Uk)("projen"),S=(0,t.Uk)("Development"),C=(0,t.Uk)("Current Development Efforts"),D=(0,t.Uk)("GitHub Discussions"),A={id:"about-django-cdk",tabindex:"-1"},U=(0,t.Wm)("a",{class:"header-anchor",href:"#about-django-cdk","aria-hidden":"true"},"#",-1),E=(0,t.Uk)(" About "),T={href:"https://github.com/briancaffey/django-cdk",target:"_blank",rel:"noopener noreferrer"},K=(0,t.Wm)("code",null,"django-cdk",-1),x=(0,t.Wm)("p",null,[(0,t.Wm)("code",null,"django-cdk"),(0,t.Uk)(" is a library for that includes constructs for deploying Django applications on AWS, focusing on containerization and serverless. "),(0,t.Wm)("code",null,"django-cdk"),(0,t.Uk)(" code lives on GitHub, and the package can be used with CDK in both Python and JavaScript/TypeScript CDK applications. Here are links for "),(0,t.Wm)("code",null,"django-cdk"),(0,t.Uk)(":")],-1),_={href:"https://github.com/briancaffey/django-cdk",target:"_blank",rel:"noopener noreferrer"},L=(0,t.Uk)("https://github.com/briancaffey/django-cdk"),I=(0,t.Uk)(" - GitHub"),q={href:"https://www.npmjs.com/package/django-cdk",target:"_blank",rel:"noopener noreferrer"},B=(0,t.Uk)("https://www.npmjs.com/package/django-cdk"),P=(0,t.Uk)(" - NPM"),F={href:"https://pypi.org/project/django-cdk/",target:"_blank",rel:"noopener noreferrer"},V=(0,t.Uk)("https://pypi.org/project/django-cdk/"),R=(0,t.Uk)(" - PyPI"),H=(0,t.uE)('<h2 id="django-cdk-constructs" tabindex="-1"><a class="header-anchor" href="#django-cdk-constructs" aria-hidden="true">#</a> <code>django-cdk</code> constructs</h2><ul><li><code>DjangoEcs</code></li><li><code>DjangoEks</code> (almost complete)</li><li><code>StaticSite</code> (Vue, React, etc.)</li><li><code>DjangoVue</code> (combines the <code>Django ECS</code> and <code>Static Site</code> constructs, the easiest way to deploy all components of μblog)</li><li><code>DockerEc2</code> (complete)</li><li><code>S3BucketResources</code> S3 bucket and IAM user (useful if you are hosting your Django application outside of AWS, such as on DigitalOcean)</li></ul><h2 id="about-cdk-constructs" tabindex="-1"><a class="header-anchor" href="#about-cdk-constructs" aria-hidden="true">#</a> About CDK constructs</h2><p>Here are some important points that will give some important context around CDK and IaC on AWS:</p><ul><li>CDK is an AWS tool that allows you to write Infrastructure as Code</li><li>CDK generates CloudFormation (JSON/YAML that defines AWS resources at a low level)</li><li>CDK contains different levels of constructs that can be used to generate CloudFormation: <ul><li>L1 (Level 1) CDK constructs are a 1:1 mapping from CDK to CloudFormation resources. They are prefixed with <code>Cfn</code> (e.g. <code>s3.CfnBucket</code>)</li><li>L2 CDK constructs are abstractions that generate several related CloudFormation resources that help support a single AWS resource or a group of related resource. For example, the L2 CDK construct for creating a VPC generates CloudFormation for a VPC, a subnet, and a NAT Gateway, routing tables and other related resources.</li><li>L3 CDK constructs generate groups of resources. For example, the L3 CDK construct for creating a load-balanced web services generates CloudFormation for an ECS service, a load balancer and related target groups.</li></ul></li></ul><p>The resources in <code>django-cdk</code> can be thought of as <code>L4</code> constructs. A single construct will contain all of the resources needed to create an application that has a number of different resources.</p><h2 id="features-of-the-djangovue-djangoecs-and-staticsite-constructs" tabindex="-1"><a class="header-anchor" href="#features-of-the-djangovue-djangoecs-and-staticsite-constructs" aria-hidden="true">#</a> Features of the <code>DjangoVue</code>, <code>DjangoEcs</code> and <code>StaticSite</code> constructs</h2><p><code>DjangoVue</code> is the highest-level construct in the library. It combines two other constructs in the library: <code>DjangoEcs</code> and <code>StaticSite</code>.</p><h3 id="djangovue-resources" tabindex="-1"><a class="header-anchor" href="#djangovue-resources" aria-hidden="true">#</a> <code>DjangoVue</code> resources</h3><p><code>DjangoVue</code> deploys the following resources:</p><ul><li>VPC (Subnets, Security Groups, AZs, NAT Gateway)</li><li>Application Load Balancer</li><li>ECS cluster, services and tasks for the Django API server and celery workers</li><li>Postgres databases</li><li>Static site for a Single Page Application deployed with CloudFront and S3</li><li>Route 53 DNS records</li><li>Certificate Manager certificates</li><li>IAM roles and policies</li><li>Outputs that provide commands for allowing an AWS admin to access an interactive shell running in a serverless container</li><li>Optional automatic commands (useful if you want to run Django migrations or collect static on each deploy)</li></ul><h3 id="configuring-django-and-vue-to-use-the-same-domain-and-subdomain" tabindex="-1"><a class="header-anchor" href="#configuring-django-and-vue-to-use-the-same-domain-and-subdomain" aria-hidden="true">#</a> Configuring Django and Vue to use the same domain and subdomain</h3><p>The <code>DjangoVue</code> construct deploys a CloudFront distribution that includes three different origins:</p><ul><li>Static Site Bucket (serves Vue SPA assets)</li><li>Application Load Balancer DNS Name</li><li>Django assets S3 Bucket (static and media files for the Django application)</li></ul><p>This allows for Django and Vue to use the same domain and subdomain. Assuming that you have a Route 53 domain called <code>domain.com</code>, CloudFront will route requests as follows:</p><ul><li><code>app.domain.com/{api,admin,graphql}/</code> requests will be routed to the load balancer</li><li><code>app.domain.com/{static,media}/</code> requests will be routed to the assets bucket</li><li>all other requests to <code>app.domain.com</code> will be routed to the static site bucket (Vue SPA)</li></ul><p>One important implication of this relates to authentication: we can set an <code>HttpOnly</code> cookie on the Vue client that comes from a request to the Django API. <strong>This would not be possible if the Vue client is served on <code>app.domain.com</code> and the Django API is served on <code>api.domain.com</code>.</strong></p><h3 id="automatic-commands" tabindex="-1"><a class="header-anchor" href="#automatic-commands" aria-hidden="true">#</a> Automatic commands</h3><p>The CDK allows you to define Custom Resources that can either:</p><ul><li>run an AWS JavaScript SDK command</li><li>run a Lambda function that does something</li></ul><p>The <code>DjangoEcs</code> construct optionally defines custom resources that can run ECS tasks for running Django management commands that you might want run on each deployment such as:</p><ul><li><code>python manage.py migrate --no-input</code></li><li><code>python manage.py collectstatic --no-input</code></li></ul><h3 id="ecs-exec" tabindex="-1"><a class="header-anchor" href="#ecs-exec" aria-hidden="true">#</a> ECS Exec</h3><p>ECS Exec is a new feature of ECS that allows you to open a shell in a container running on ECS Fargate.</p><p>Here are some helpful links for more information about ECS Exec:</p>',25),G={href:"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html",target:"_blank",rel:"noopener noreferrer"},M=(0,t.Uk)("AWS Developer Guide"),N={href:"https://github.com/pahud/ecs-exec-cdk-demo",target:"_blank",rel:"noopener noreferrer"},O=(0,t.Uk)("ecs-exec-cdk-demo repo from pahud"),z=(0,t.Wm)("h2",{id:"django-cdk-documentation",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#django-cdk-documentation","aria-hidden":"true"},"#"),(0,t.Uk)(),(0,t.Wm)("code",null,"django-cdk"),(0,t.Uk)(" documentation")],-1),Y=(0,t.Uk)("Documentation for "),J=(0,t.Wm)("code",null,"django-cdk",-1),Z=(0,t.Uk)(" is generated automatically from the source code. The most up-to-date documentation for using "),$=(0,t.Wm)("code",null,"django-cdk",-1),Q=(0,t.Uk)(" constructs can be found here: "),X={href:"https://github.com/briancaffey/django-cdk/blob/main/API.md",target:"_blank",rel:"noopener noreferrer"},ee=(0,t.Uk)("https://github.com/briancaffey/django-cdk/blob/main/API.md"),ne=(0,t.uE)('<p>To use one of the constructs you need to provide:</p><ul><li>A path to the root of your Django project</li><li>The location of the <code>Dockerfile</code> used to build your application&#39;s image (for EKS and ECS) relative to your Django project&#39;s root directory</li><li>The commands used to start the process that run your application: <ul><li>web server process (required)</li><li>celery (optional)</li><li>celery beat (optional)</li></ul></li><li>Options for how to run the application and which additional services your application requires</li></ul><p>If you are hosting your application outside of AWS, there is also a construct that can be used for provisioning a new S3 bucket along with an IAM user with the necessary permissions to access it. This can be used for hosting static files as well as media files.</p><h2 id="using-the-constructs" tabindex="-1"><a class="header-anchor" href="#using-the-constructs" aria-hidden="true">#</a> Using the constructs</h2><p>This repository includes sample CDK applications that use the libraries.</p><h3 id="djangoeks" tabindex="-1"><a class="header-anchor" href="#djangoeks" aria-hidden="true">#</a> DjangoEks</h3><p>Overview of the EKS construct:</p>',7),ae=(0,t.uE)('<p>1 - Resource in this diagram are defined by a CDK construct library called <code>django-eks</code> which is written in TypeScript and published to PyPi and npmjs.org. The project is managed by projen.</p><p>2 - The project uses jsii to transpile Typescript to Python, and the project is published to both PyPI and npm.</p><p>3 - The library is imported in a CDK application that is written in either TypeScript or Python.</p><p>4 - The CDK application is synthesized into CloudFormation templates which are used to build a CloudFormation stack that will contain all of the resources defined in the contstruct.</p><p>5 - An ECR registry is created when running <code>cdk bootstrap</code>, and it is used to store docker images that the application builds and later uses.</p><p>6 - An S3 bucket is also created by the <code>cdk bootstrap</code> command. This bucket is used for storing assets needed by CDK.</p><p>7 - The VPC is a the skeleton of the application. The CDK construct used for creating the VPC in our application sets up several resources including subnets, NAT gateways, internet gateway, route tables, etc.</p><p>8 - The Route53 record points to the Application Load Balancer (ALB) that routes traffic to our application. The record is created indirectly by CDK; external-dns creates the A Record resource based on annotations on the ALB.</p><p>9 - The Internet Gateway attached to our VPC</p><p>10 - The Application Load Balancer that is created by the AWS Load Balancer Controller</p><p>11 - EKS, the container orchestration layer in our application. AWS manages the control plane</p><p>12 - OpenIDConnect Provider used for handling permissions between pods and other AWS resources</p><p>13 - This is a node in the default node group of the EKS cluster</p><p>14 - The app namespace is where our application&#39;s Kubernetes resources will be deployed</p><p>15 - The Ingress that Routes traffic to the service for the Django application</p><p>16 - The service for the Django application</p><p>17 - The deployment/pods for the Django application. These pods have a service account that will give it access to other AWS resources through IRSA</p><p>18 - The deployment/pods for the celery workers in the Django application</p><p>19 - The IAM role and service account that are attached to the pods in our application. The service account is annotated with the IAM role&#39;s ARN (IRSA).</p><p>20 - external-dns is installed in our cluster to a dedicated namespace called external-dns. It is responsible for creating the Route53 record that points to the ALB. In future version of AWS Load Balancer Controller, external-dns may not be necessary.</p><p>21 - AWS Load Balancer Controller is installed into the kube-system namespace. This controller is responsible for provisioning an AWS Load Balancer when an Ingress object is deployed to the EKS cluster.</p><p>22 - RDS Postgres Instance that is placed in an isolated subnet. The security group for the default node group has access to the security group where the RDS instance is placed in an isolated subnet.</p><p>23 - Secrets Manager is used to provide the database password. The pods that run the Django application have access to the database secret in Secrets Manager, and they request it via a library that wraps boto3 calls and also caches secrets to reduce calls to secrets manager.</p><p>24 - ElastiCache Redis instance handles application caching and serves as the message broker for celery.</p><p>25 - Since the application runs in private subnets, outbound traffic is sent through NAT Gateways (Network Adress Translation) in public subnets that can be routed back to the public internet.</p><p>26 - An S3 bucket that our application can use for storing media assets.</p><p>Here&#39;s an example from <code>src/integ.django-eks.ts</code>:</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;@aws-cdk/core&quot;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> DjangoEks <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./index&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> env <span class="token operator">=</span> <span class="token punctuation">{</span>\n  region<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">AWS_DEFAULT_REGION</span> <span class="token operator">||</span> <span class="token string">&quot;us-east-1&quot;</span><span class="token punctuation">,</span>\n  account<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">AWS_ACCOUNT_ID</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">cdk</span><span class="token punctuation">.</span><span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">cdk</span><span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> <span class="token string">&quot;DjangoEks&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> env <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> construct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DjangoEks</span><span class="token punctuation">(</span>stack<span class="token punctuation">,</span> <span class="token string">&quot;Cdk-Sample-Lib&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  imageDirectory<span class="token operator">:</span> <span class="token string">&quot;./test/django-step-by-step/backend&quot;</span><span class="token punctuation">,</span>\n  webCommand<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./scripts/start_prod.sh&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token doc-comment comment">/**\n * Add tagging for this construct and all child constructs\n */</span>\ncdk<span class="token punctuation">.</span>Tags<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>construct<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;stack&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MyStack&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>This sample application (and others defined in the <code>integ.*.ts</code> files in this repo) can be easily deployed for testing purposes with targets defined in the <code>Makefile</code>. To deploy the above application, you can run:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>npm run build\nmake deploy-eks\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Destroy the application with:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>make destroy-eks\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',32),te=(0,t.Uk)("This assumes that you have credentials configured in your AWS CLI with sufficient permissions and that you have "),oe={href:"https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html",target:"_blank",rel:"noopener noreferrer"},se=(0,t.Uk)("bootstrapped your AWS account"),re=(0,t.Uk)(". You will also need to have docker CLI configured in order for CDK to build images and push them to ECR."),ce=(0,t.Wm)("h3",{id:"ecs",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#ecs","aria-hidden":"true"},"#"),(0,t.Uk)(" ECS")],-1),ie=(0,t.Wm)("p",null,[(0,t.Uk)("The ECS construct uses the "),(0,t.Wm)("code",null,"ApplicationLoadBalancedFargateService"),(0,t.Uk)(" construct from "),(0,t.Wm)("code",null,"@aws-cdk/aws-ecs-patterns"),(0,t.Uk)(". This is a powerful abstraction that handles a lot of the networking requirements for the construct.")],-1),le=(0,t.Wm)("h2",{id:"key-differences-between-ecs-and-eks-constructs",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#key-differences-between-ecs-and-eks-constructs","aria-hidden":"true"},"#"),(0,t.Uk)(" Key differences between ECS and EKS constructs")],-1),ue=(0,t.Wm)("p",null,"The ECS and EKS constructs aim to do the same thing: deploy containerized applications to AWS.",-1),de=(0,t.Wm)("h3",{id:"container-orchestration",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#container-orchestration","aria-hidden":"true"},"#"),(0,t.Uk)(" Container orchestration")],-1),pe=(0,t.Uk)("The ECS constructs uses Amazon's proprietary, closed-source container orchestration tool called ECS. The EKS construct uses an "),he={href:"https://github.com/aws/eks-distro",target:"_blank",rel:"noopener noreferrer"},me=(0,t.Uk)("open source distribution of Kubernetes"),ge=(0,t.Uk)(" called Amazon EKS Distro (EKS-D)."),ke=(0,t.Wm)("h3",{id:"load-balancer",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#load-balancer","aria-hidden":"true"},"#"),(0,t.Uk)(" Load Balancer")],-1),fe=(0,t.Wm)("p",null,"Another important difference from an infrastructure and Infrastructure as Code (IaC) perspective is the use of Application Load Balancers (ALBs).",-1),be=(0,t.Wm)("blockquote",null,[(0,t.Wm)("p",null,"The load balancer distributes incoming application traffic across multiple targets, such as EC2 instances, in multiple Availability Zones.")],-1),We=(0,t.Wm)("p",null,[(0,t.Uk)("The ECS and EKS constructs go about provisioning ALBs differently. In the ECS construct, the "),(0,t.Wm)("code",null,"ApplicationLoadBalancedFargateService"),(0,t.Uk)(" in the CDK code results in CloudFormation code that requests an application load balancer.")],-1),we=(0,t.Uk)("The EKS construct does not directly request an ALB. Instead, it installs the "),ye={href:"https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html",target:"_blank",rel:"noopener noreferrer"},je=(0,t.Uk)("AWS Load Balancer Controller"),ve=(0,t.Uk)(", "),Se={href:"https://github.com/kubernetes-sigs/aws-load-balancer-controller",target:"_blank",rel:"noopener noreferrer"},Ce=(0,t.Uk)("an open source project"),De=(0,t.Uk)(", using a Helm chart. This controller satisfies Kubernetes Ingress resources by provisioning Application Load Balancers. The contruct defines a Kubernetes Ingress object which, when deployed to the EKS cluster, causes the AWS Load Balancer Controller to provision an ALB. You can read more about Kubernetes Controllers "),Ae={href:"https://kubernetes.io/docs/concepts/architecture/controller/#direct-control",target:"_blank",rel:"noopener noreferrer"},Ue=(0,t.Uk)("here"),Ee=(0,t.Uk)("."),Te=(0,t.Uk)("The Ingress object defined in the construct uses "),Ke={href:"https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/",target:"_blank",rel:"noopener noreferrer"},xe=(0,t.Uk)("annotations"),_e=(0,t.Uk)(" that the controller processes when provisioning the ALB. A list of all supported annotations can be found "),Le={href:"https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/#annotations",target:"_blank",rel:"noopener noreferrer"},Ie=(0,t.Uk)("here on the AWS Load Balancer Controller website"),qe=(0,t.Wm)("h3",{id:"compute",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#compute","aria-hidden":"true"},"#"),(0,t.Uk)(" Compute")],-1),Be=(0,t.Wm)("p",null,"One other important difference between the two constructs is the type of compute used to run the container workloads. The ECS construct uses Fargate, a serverless computer offering from AWS. The EKS construct uses EC2 instances for the worker nodes of the EKS cluster. It is possible to use Fargate with EKS, but AWS currently recommends not using Fargate for sensitive workloads on EKS.",-1),Pe=(0,t.Wm)("h2",{id:"projen",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#projen","aria-hidden":"true"},"#"),(0,t.Uk)(" projen")],-1),Fe=(0,t.Uk)("This project uses "),Ve={href:"https://github.com/projen/projen",target:"_blank",rel:"noopener noreferrer"},Re=(0,t.Uk)("projen"),He=(0,t.Uk)("."),Ge=(0,t.uE)('<blockquote><p>projen synthesizes project configuration files such as package.json, tsconfig.json, .gitignore, GitHub Workflows, eslint, jest, etc from a well-typed definition written in JavaScript.</p></blockquote><h2 id="development" tabindex="-1"><a class="header-anchor" href="#development" aria-hidden="true">#</a> Development</h2><p>For development of this library, a sample Django application is included as a git submodule in <code>test/django-step-by-step</code>. This Django project is used when deploying the application, and can be replaced with your own project for testing purposes. See the <code>Makefile</code> in the <code>django-cdk</code> repository for some commonly used</p><h2 id="current-development-efforts" tabindex="-1"><a class="header-anchor" href="#current-development-efforts" aria-hidden="true">#</a> Current Development Efforts</h2><p>This project is under active development. Here are some issues that need to be addressed:</p>',5),Me=(0,t.Wm)("li",null,"Media file uploads are currently broken, this needs to be fixed",-1),Ne=(0,t.Uk)("Go over this Kubernetes checklist: "),Oe={href:"https://www.weave.works/blog/production-ready-checklist-kubernetes",target:"_blank",rel:"noopener noreferrer"},ze=(0,t.Uk)("https://www.weave.works/blog/production-ready-checklist-kubernetes"),Ye=(0,t.Wm)("li",null,"Add snapshot tests and refactor the application",-1),Je=(0,t.Wm)("li",null,"Add unit tests",-1),Ze=(0,t.Wm)("li",null,[(0,t.Uk)("Add autoscaling rules to "),(0,t.Wm)("code",null,"DjangoEcs"),(0,t.Uk)(" for horizontal scaling and do load-testing")],-1),$e=(0,t.Wm)("h2",{id:"github-discussions",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#github-discussions","aria-hidden":"true"},"#"),(0,t.Uk)(" GitHub Discussions")],-1),Qe=(0,t.Uk)("If you have any questions about the "),Xe=(0,t.Wm)("code",null,"django-cdk",-1),en=(0,t.Uk)(" construct library, please start a Discussion on the GitHub repo: "),nn={href:"https://github.com/briancaffey/django-cdk/discussions",target:"_blank",rel:"noopener noreferrer"},an=(0,t.Uk)("https://github.com/briancaffey/django-cdk/discussions"),tn=(0,t.Uk)("."),on=(0,t.Uk)("You can also open an issue: "),sn={href:"https://github.com/briancaffey/django-cdk/issues/new",target:"_blank",rel:"noopener noreferrer"},rn=(0,t.Uk)("https://github.com/briancaffey/django-cdk/issues/new"),cn={render:function(e,n){const a=(0,t.up)("RouterLink"),cn=(0,t.up)("OutboundLink");return(0,t.wg)(),(0,t.j4)(t.HY,null,[o,s,(0,t.Wm)("nav",r,[(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#about-django-cdk"},{default:(0,t.w5)((()=>[c])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#django-cdk-constructs"},{default:(0,t.w5)((()=>[i])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#about-cdk-constructs"},{default:(0,t.w5)((()=>[l])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#features-of-the-djangovue-djangoecs-and-staticsite-constructs"},{default:(0,t.w5)((()=>[u])),_:1}),(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#djangovue-resources"},{default:(0,t.w5)((()=>[d])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#configuring-django-and-vue-to-use-the-same-domain-and-subdomain"},{default:(0,t.w5)((()=>[p])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#automatic-commands"},{default:(0,t.w5)((()=>[h])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#ecs-exec"},{default:(0,t.w5)((()=>[m])),_:1})])])]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#django-cdk-documentation"},{default:(0,t.w5)((()=>[g])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#using-the-constructs"},{default:(0,t.w5)((()=>[k])),_:1}),(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#djangoeks"},{default:(0,t.w5)((()=>[f])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#ecs"},{default:(0,t.w5)((()=>[b])),_:1})])])]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#key-differences-between-ecs-and-eks-constructs"},{default:(0,t.w5)((()=>[W])),_:1}),(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#container-orchestration"},{default:(0,t.w5)((()=>[w])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#load-balancer"},{default:(0,t.w5)((()=>[y])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#compute"},{default:(0,t.w5)((()=>[j])),_:1})])])]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#projen"},{default:(0,t.w5)((()=>[v])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#development"},{default:(0,t.w5)((()=>[S])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#current-development-efforts"},{default:(0,t.w5)((()=>[C])),_:1})]),(0,t.Wm)("li",null,[(0,t.Wm)(a,{to:"#github-discussions"},{default:(0,t.w5)((()=>[D])),_:1})])])]),(0,t.Wm)("h2",A,[U,E,(0,t.Wm)("a",T,[K,(0,t.Wm)(cn)])]),x,(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)("a",_,[L,(0,t.Wm)(cn)]),I]),(0,t.Wm)("li",null,[(0,t.Wm)("a",q,[B,(0,t.Wm)(cn)]),P]),(0,t.Wm)("li",null,[(0,t.Wm)("a",F,[V,(0,t.Wm)(cn)]),R])]),H,(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)("a",G,[M,(0,t.Wm)(cn)])]),(0,t.Wm)("li",null,[(0,t.Wm)("a",N,[O,(0,t.Wm)(cn)])])]),z,(0,t.Wm)("p",null,[Y,J,Z,$,Q,(0,t.Wm)("a",X,[ee,(0,t.Wm)(cn)])]),ne,(0,t.Wm)("img",{src:e.$withBase("/diagrams/django-cdk.png"),alt:"django cdk ecs"},null,8,["src"]),ae,(0,t.Wm)("p",null,[te,(0,t.Wm)("a",oe,[se,(0,t.Wm)(cn)]),re]),ce,(0,t.Wm)("img",{src:e.$withBase("/diagrams/django-ecs.png"),alt:"docker-compose"},null,8,["src"]),ie,le,ue,de,(0,t.Wm)("p",null,[pe,(0,t.Wm)("a",he,[me,(0,t.Wm)(cn)]),ge]),ke,fe,be,We,(0,t.Wm)("p",null,[we,(0,t.Wm)("a",ye,[je,(0,t.Wm)(cn)]),ve,(0,t.Wm)("a",Se,[Ce,(0,t.Wm)(cn)]),De,(0,t.Wm)("a",Ae,[Ue,(0,t.Wm)(cn)]),Ee]),(0,t.Wm)("p",null,[Te,(0,t.Wm)("a",Ke,[xe,(0,t.Wm)(cn)]),_e,(0,t.Wm)("a",Le,[Ie,(0,t.Wm)(cn)])]),qe,Be,Pe,(0,t.Wm)("p",null,[Fe,(0,t.Wm)("a",Ve,[Re,(0,t.Wm)(cn)]),He]),Ge,(0,t.Wm)("ul",null,[Me,(0,t.Wm)("li",null,[Ne,(0,t.Wm)("a",Oe,[ze,(0,t.Wm)(cn)])]),Ye,Je,Ze]),$e,(0,t.Wm)("p",null,[Qe,Xe,en,(0,t.Wm)("a",nn,[an,(0,t.Wm)(cn)]),tn]),(0,t.Wm)("p",null,[on,(0,t.Wm)("a",sn,[rn,(0,t.Wm)(cn)])])],64)}}}}]);