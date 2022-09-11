"use strict";(self.webpackChunkvuepress_docs=self.webpackChunkvuepress_docs||[]).push([[302],{6653:(e,a,r)=>{r.r(a),r.d(a,{data:()=>t});const t={key:"v-c5aaa2fe",path:"/deploy/raspi/",title:"Deploying to a Raspberry Pi",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Building the Raspberry Pi image",slug:"building-the-raspberry-pi-image",children:[]},{level:2,title:"Build data locally on a Raspberry Pi",slug:"build-data-locally-on-a-raspberry-pi",children:[{level:3,title:"Initialize swarm cluster",slug:"initialize-swarm-cluster",children:[]},{level:3,title:"Ensure that you have SSH access to the Raspberry Pi",slug:"ensure-that-you-have-ssh-access-to-the-raspberry-pi",children:[]},{level:3,title:"Set the DOCKER_HOST environment variable",slug:"set-the-docker-host-environment-variable",children:[]},{level:3,title:"Run a docker registry on the Raspberry Pi",slug:"run-a-docker-registry-on-the-raspberry-pi",children:[]}]},{level:2,title:"Check logs from services that fail to start their containers",slug:"check-logs-from-services-that-fail-to-start-their-containers",children:[]},{level:2,title:"build_containers",slug:"build-containers",children:[]},{level:2,title:"Manual actions",slug:"manual-actions",children:[]}],filePathRelative:"deploy/raspi/README.md",git:{updatedTime:1662865251e3,contributors:[]}}},5778:(e,a,r)=>{r.r(a),r.d(a,{default:()=>f});var t=r(6252);const s=(0,t.Wm)("h1",{id:"deploying-to-a-raspberry-pi",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#deploying-to-a-raspberry-pi","aria-hidden":"true"},"#"),(0,t.Uk)(" Deploying to a Raspberry Pi")],-1),n=(0,t.Wm)("p",null,"This is a guide to building and running the application on a Raspberry Pi. With docker and docker swarm. This build environment will be similar to what is used with the DigitalOcean deployment.",-1),i=(0,t.Wm)("h2",{id:"building-the-raspberry-pi-image",tabindex:"-1"},[(0,t.Wm)("a",{class:"header-anchor",href:"#building-the-raspberry-pi-image","aria-hidden":"true"},"#"),(0,t.Uk)(" Building the Raspberry Pi image")],-1),o=(0,t.Uk)("I use "),l={href:"https://www.balena.io/etcher/",target:"_blank",rel:"noopener noreferrer"},c=(0,t.Uk)("https://www.balena.io/etcher/"),d=(0,t.Uk)(" to build the 64-bit "),h=(0,t.Wm)("strong",null,[(0,t.Wm)("code",null,"Ubuntu Server 20.04.1 LTS")],-1),u=(0,t.Uk)(" image (available "),p={href:"https://ubuntu.com/download/raspberry-pi",target:"_blank",rel:"noopener noreferrer"},b=(0,t.Uk)("here"),m=(0,t.Uk)(")."),g=(0,t.uE)('<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ubuntu@ubuntu:~$ uname -a\nLinux ubuntu 5.4.0-1021-raspi #24-Ubuntu SMP PREEMPT Mon Oct 5 09:59:23 UTC 2020 aarch64 aarch64 aarch64 GNU/Linux\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="build-data-locally-on-a-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#build-data-locally-on-a-raspberry-pi" aria-hidden="true">#</a> Build data locally on a Raspberry Pi</h2><p>Assuming that the Raspberry Pi on your local network has address <code>192.168.1.2</code>, we need to do the following in order to use it as a single-node swarm cluster:</p><h3 id="initialize-swarm-cluster" tabindex="-1"><a class="header-anchor" href="#initialize-swarm-cluster" aria-hidden="true">#</a> Initialize swarm cluster</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker swarm init\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>We will be using a single-node swarm cluster for this example, so don&#39;t worry about the output of this command. The commands displayed in the above command&#39;s output are used for networking mutliple devices into a single swarm cluster.</p><h3 id="ensure-that-you-have-ssh-access-to-the-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#ensure-that-you-have-ssh-access-to-the-raspberry-pi" aria-hidden="true">#</a> Ensure that you have SSH access to the Raspberry Pi</h3><p>Disable password authentication in the Raspberry Pi&#39;s <code>/etc/ssh/ssh_config</code> by ensuring that the following line not commented out:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>    PasswordAuthentication no\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Add your</p><h3 id="set-the-docker-host-environment-variable" tabindex="-1"><a class="header-anchor" href="#set-the-docker-host-environment-variable" aria-hidden="true">#</a> Set the <code>DOCKER_HOST</code> environment variable</h3><p>Set the <code>DOCKER_HOST</code> environment variable to <code>ssh://root@192.168.1.2</code>.</p><h3 id="run-a-docker-registry-on-the-raspberry-pi" tabindex="-1"><a class="header-anchor" href="#run-a-docker-registry-on-the-raspberry-pi" aria-hidden="true">#</a> Run a docker registry on the Raspberry Pi</h3>',13),y={href:"https://docs.docker.com/registry/deploying/",target:"_blank",rel:"noopener noreferrer"},v=(0,t.Uk)("https://docs.docker.com/registry/deploying/"),k=(0,t.uE)('<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 5000:5000 --restart=always --name registry registry:2\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Why do this? You can think about this as a local version of Docker Hub that runs on your Raspberry Pi.</p><p>You will build docker images using code on your local machine, but with the <code>DOCKER_HOST</code> set to <code>ssh://root@192.168.1.2</code>, the <strong>docker images will be created on the Raspberry Pi</strong>, <em>not on your development machine</em>.</p><p>Here&#39;s what the commands to build the docker images look like:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker build -t docker build -t <span class="token variable">$CI_REGISTRY_IMAGE</span>/backend:<span class="token variable">$CI_COMMIT_SHORT_SHA</span> -f backend/docker/Dockerfile.prod ./backend/\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Also, when we deploy the docker swarm stack using <code>docker stack deploy</code>, we will use the following environment variables to tell the Raspberry Pi docker daemon to use the images built in that registry. This way we don&#39;t have to worry about getting source code onto the Raspberry Pi. Instead, we just make sure that the docker image &quot;artifacts&quot; are sent to the Raspbery Pi.</p><p>Set the following environment variables:</p><ul><li><code>CI_REGISTRY_IMAGE</code>: <code>localhost:5000</code> &lt;-- localhost here refers to the docker registry running on the Raspberry Pi</li><li><code>CI_COMMIT_SHORT_SHA</code>: <code>v1</code> &lt;-- this can be anything that you want to use, but it should change when the images are updated</li></ul><h2 id="check-logs-from-services-that-fail-to-start-their-containers" tabindex="-1"><a class="header-anchor" href="#check-logs-from-services-that-fail-to-start-their-containers" aria-hidden="true">#</a> Check logs from services that fail to start their containers</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker service ps --no-trunc {serviceName}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="build-containers" tabindex="-1"><a class="header-anchor" href="#build-containers" aria-hidden="true">#</a> <code>build_containers</code></h2><p>This script automats most of the process of building containers and deploying the swarm stack.</p><p>It checks to see if <code>DOCKER_HOST</code> is set. This should be set with:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export DOCKER_HOST=ssh://ubuntu@192.168.1.2\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>The current commit short hash is used to tag the frontend and backend containers.</p><p>The <code>raspi.yml</code> swarm stack file references a <code>.env</code> file for</p><p>Where ubuntu is the main user on the Raspberry Pi and <code>192.168.1.2</code> is the IP address of the Raspberry Pi.</p><h2 id="manual-actions" tabindex="-1"><a class="header-anchor" href="#manual-actions" aria-hidden="true">#</a> Manual actions</h2><p>Once the stack is deployed, the following must be run:</p><ul><li>migrate</li><li>createsuperuser</li><li>collectstatic</li></ul><p>These commands can be called with the following:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker exec $(docker ps -q -f name=&quot;backend&quot;) python3 manage.py migrate --no-input\ndocker exec $(docker ps -q -f name=&quot;backend&quot;) python3 manage.py collectstatic --no-input\ndocker exec $(docker ps -q -f name=&quot;backend&quot;) python3 manage.py createsuperuser --no-input\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>These commands run Django management commands in the running backend container. This is similar to how things currently work in <code>.gitlab-ci.yml</code>&#39;s <code>management</code> stage jobs.</p>',23),f={render:function(e,a){const r=(0,t.up)("OutboundLink");return(0,t.wg)(),(0,t.j4)(t.HY,null,[s,n,i,(0,t.Wm)("p",null,[o,(0,t.Wm)("a",l,[c,(0,t.Wm)(r)]),d,h,u,(0,t.Wm)("a",p,[b,(0,t.Wm)(r)]),m]),g,(0,t.Wm)("ul",null,[(0,t.Wm)("li",null,[(0,t.Wm)("a",y,[v,(0,t.Wm)(r)])])]),k],64)}}}}]);