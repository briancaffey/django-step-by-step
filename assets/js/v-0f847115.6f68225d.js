"use strict";(self.webpackChunkvuepress_docs=self.webpackChunkvuepress_docs||[]).push([[833],{1036:(e,a,t)=>{t.r(a),t.d(a,{data:()=>n});const n={key:"v-0f847115",path:"/deploy/digital-ocean/",title:"DigitalOcean Deployment Guide",lang:"en-US",frontmatter:{next:"/deploy/aws"},excerpt:"",headers:[{level:2,title:"DigitalOcean Setup",slug:"digitalocean-setup",children:[]},{level:2,title:"GitLab Setup",slug:"gitlab-setup",children:[{level:3,title:"Protected Tags",slug:"protected-tags",children:[]},{level:3,title:"Environment Variables",slug:"environment-variables",children:[]}]},{level:2,title:"DNS Setup",slug:"dns-setup",children:[]},{level:2,title:"Docker Swarm Setup",slug:"docker-swarm-setup",children:[{level:3,title:"Install REX-Ray Plugin",slug:"install-rex-ray-plugin",children:[]},{level:3,title:"Initialize Docker Swarm",slug:"initialize-docker-swarm",children:[]},{level:3,title:"Add traefik network",slug:"add-traefik-network",children:[]}]},{level:2,title:"Deployment",slug:"deployment",children:[{level:3,title:"Trigger a deployment",slug:"trigger-a-deployment",children:[]},{level:3,title:"Verify the deployment manually",slug:"verify-the-deployment-manually",children:[]},{level:3,title:"Run manual GitLab CI jobs",slug:"run-manual-gitlab-ci-jobs",children:[]}]},{level:2,title:"Removing the stack",slug:"removing-the-stack",children:[]},{level:2,title:"Cleaning up resources",slug:"cleaning-up-resources",children:[]}],filePathRelative:"deploy/digital-ocean/README.md",git:{updatedTime:1662167528e3,contributors:[]}}},9028:(e,a,t)=>{t.r(a),t.d(a,{default:()=>d});var n=t(6252);const s=(0,n.uE)('<h1 id="digitalocean-deployment-guide" tabindex="-1"><a class="header-anchor" href="#digitalocean-deployment-guide" aria-hidden="true">#</a> DigitalOcean Deployment Guide</h1><p>This is a short walkthrough of how to deploy this project on DigitalOcean. There are some manual steps, but everything is automated through GitLab CI as much as possible.</p><h2 id="digitalocean-setup" tabindex="-1"><a class="header-anchor" href="#digitalocean-setup" aria-hidden="true">#</a> DigitalOcean Setup</h2><ul><li>Create SSH key for user with Digital Ocean and add it to your account</li><li>Create a project</li><li>Add any size Droplet with Docker 19.03.12 machine image, add the SSH key that you created</li><li>Don&#39;t add any volumes (we will do that automatically with REX-Ray)</li><li>Ceate a DigitOcean Personal Access Token and store it somewhere, we will use it later</li></ul><h2 id="gitlab-setup" tabindex="-1"><a class="header-anchor" href="#gitlab-setup" aria-hidden="true">#</a> GitLab Setup</h2><h3 id="protected-tags" tabindex="-1"><a class="header-anchor" href="#protected-tags" aria-hidden="true">#</a> Protected Tags</h3><p>Go to <code>Settings &gt; Repository &gt; Protected Tags</code> and create a wildcard tag to protect. I use <code>rc*</code> for staging environments and <code>v*</code> for version. When I create a git tag such as <code>rc1.2.3</code>, the GitLab CI pipline will run since I have set the following in <code>gitlab-ci.yml</code>:</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">workflow</span><span class="token punctuation">:</span>\n  <span class="token key atrule">rules</span><span class="token punctuation">:</span>\n    <span class="token punctuation">-</span> <span class="token key atrule">if</span><span class="token punctuation">:</span> <span class="token string">&quot;$CI_COMMIT_TAG =~ /^rc/&quot;</span>\n      <span class="token key atrule">when</span><span class="token punctuation">:</span> always\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="environment-variables" tabindex="-1"><a class="header-anchor" href="#environment-variables" aria-hidden="true">#</a> Environment Variables</h3><p>Add the following environment variables to the cloned GitLab project&#39;s <code>CI/CD &gt; Variables</code> section.</p><p>Make sure the environment variables are all protected since they contain sensitive information.</p><ul><li><p><code>DJANGO_SUPERUSER_EMAIL</code></p></li><li><p><code>DJANGO_SUPERUSER_PASSWORD</code></p></li><li><p><code>DJANGO_SUPERUSER_USERNAME</code></p></li><li><p><code>DOMAIN_NAME</code></p></li></ul><p>I will be using domains from Freenom which are completely free to use, suitable for demonstrations or other types of projects where you don&#39;t want to pay for a <code>.com</code> or other paid domain.</p><p>This is needed in order to create TLS certificates automatically with Traefik, certbot and Let&#39;s Encrypy. Traefik will take care of all of this automatically, all you need to do is set the variable which is referenced in the <code>web</code> service in <code>stack.yml</code> (discussed later on).</p><ul><li><code>READ_REGISTRY_TOKEN</code></li></ul>',15),i=(0,n.Uk)("Create a GitLab Personal Access "),l={href:"https://gitlab.com/-/profile/personal_access_tokens",target:"_blank",rel:"noopener noreferrer"},r=(0,n.Uk)("https://gitlab.com/-/profile/personal_access_tokens"),o=(0,n.Uk)(" and add it to this variable."),c=(0,n.uE)('<ul><li><code>SSH_PRIVATE_KEY</code></li></ul><p>Add the private SSH key from the SSH key pair created earlier</p><ul><li><p><code>DROPLET_IP</code></p></li><li><p><code>POSTGRES_PASSWORD</code></p></li><li><p><code>SECRET_KEY</code></p></li><li><p><code>DEBUG</code>: set this to the value <code>0</code></p></li></ul><h2 id="dns-setup" tabindex="-1"><a class="header-anchor" href="#dns-setup" aria-hidden="true">#</a> DNS Setup</h2><p>Create an A Record that points to the Droplet IP.</p><p>If you registered <code>mysite.ga</code> and your Droplet IP is <code>123.456.789.10</code>, make sure that you can see the Droplet IP address when you run <code>dig mysite.ga</code> from your terminal. It should contain the following lines:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>;; ANSWER SECTION:\nmysite.ga.\t\t3600\tIN\tA\t123.456.789.10\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="docker-swarm-setup" tabindex="-1"><a class="header-anchor" href="#docker-swarm-setup" aria-hidden="true">#</a> Docker Swarm Setup</h2><p>SSH into the Droplet:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ssh -i ~/.ssh/your-key root@123.456.789.10\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="install-rex-ray-plugin" tabindex="-1"><a class="header-anchor" href="#install-rex-ray-plugin" aria-hidden="true">#</a> Install REX-Ray Plugin</h3><p>Using the DigitalOcean personal access token you create earlier (NOT the GitLab personal access token), run the following command:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker plugin install rexray/dobs DOBS_TOKEN=your-token-123abc DOBS_REGION=nyc1 LINUX_VOLUME_FILEMODE=0775\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Replacing <code>your-token-123abc</code> with the actual token value.</p><p>Confirm that you would like to install by pressing <code>y</code>.</p><p>Verify that the plugin has been installed by running:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker plugin lsID                  NAME                 DESCRIPTION                               ENABLED\n2acafbb251e4        rexray/dobs:latest   REX-Ray for Digital Ocean Block Storage   true\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>Note: volume names must be unique across your DigitalOcean account</strong></p><h3 id="initialize-docker-swarm" tabindex="-1"><a class="header-anchor" href="#initialize-docker-swarm" aria-hidden="true">#</a> Initialize Docker Swarm</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker swarm init --advertise-addr 123.456.789.10\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>If you are going to use only one node for your swarm cluster, you can ignore the output of this command for now.</p><h3 id="add-traefik-network" tabindex="-1"><a class="header-anchor" href="#add-traefik-network" aria-hidden="true">#</a> Add traefik network</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker network create --driver=overlay traefik-public\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h2><p>At this point, everything should be ready to go for the initial deployment.</p><h3 id="trigger-a-deployment" tabindex="-1"><a class="header-anchor" href="#trigger-a-deployment" aria-hidden="true">#</a> Trigger a deployment</h3><p>Simply create a git tag and push it to the GitLab repository:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git tag rc0.0.1\ngit push origin rc0.0.1\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Alternatively, you can annotate the tag by using the <code>-a</code> flag:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git tag -a rc0.0.1\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>If you protected all tags starting with <code>rc</code> using an <code>rc*</code> wildcard for protected tags as mentioned above, only you (or whever you selected) will be able to push tags starting with <code>rc</code> that will trigger a deployment.</p><p>When you push this tag, the GitLab CI jobs defined in <code>.gitlab-ci.yml</code> will run:</p><ul><li><code>build-backend</code></li><li><code>build-nginx</code></li><li><code>docker-stack-deploy</code></li></ul><p>The first two jobs build images, tag them with the current short git commit SHA-1 checksum and then push them to your private GitLab registry. You don&#39;t need to set up this registry, they are available by default for every GitLab project, and the environment variable <code>CI_REGISTRY_IMAGE</code> is automatically set in each GitLab CI job.</p><p>The last job, <code>docker-stack-deploy</code>, deploys a docker swarm stack to the swarm cluster that you set up earlier. This is done securly over SSH. The <code>.add-ssh-key</code> job template is included in the <code>docker-stack-deploy</code> which gives the CI job SSH access to the swarm cluster manager.</p><h3 id="verify-the-deployment-manually" tabindex="-1"><a class="header-anchor" href="#verify-the-deployment-manually" aria-hidden="true">#</a> Verify the deployment manually</h3><p>Here are a few commands you can use to verify the deployment:</p><p>Check running services:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker service ls\nID                  NAME                MODE                REPLICAS            IMAGE                                                              PORTS\nu509qaymojjx        my-stack_backend    replicated          1/1                 registry.gitlab.com/briancaffey/sec-filings-app/backend:1a659c95\nmyqiorvtif9p        my-stack_celery     replicated          1/1                 registry.gitlab.com/briancaffey/sec-filings-app/backend:1a659c95\nuy77yz7ctpxe        my-stack_postgres   replicated          1/1                 postgres:latest\nl3j0bbyfq5vu        my-stack_redis      replicated          1/1                 redis:alpine\nbixr5yj152pd        my-stack_traefik    replicated          1/1                 traefik:v2.3.4                                                     *:80-&gt;80/tcp, *:443-&gt;443/tcp\nuq58zduqaesj        my-stack_web        replicated          1/1                 registry.gitlab.com/briancaffey/sec-filings-app/nginx:1a659c95\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Check volumes:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker volume ls\nrexray/dobs:latest   osdbackendassets\nrexray/dobs:latest   osdletsencrypt\nrexray/dobs:latest   osdpgdata\nrexray/dobs:latest   osdredisdata\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Check that the certificate was created successfully:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker exec -it $(docker ps -q -f name=&quot;traefik&quot;) cat /letsencrypt/acme.json\n{\n  &quot;letsencryptresolver&quot;: {\n    &quot;Account&quot;: {\n      &quot;Email&quot;: &quot;your@email.com&quot;,\n      &quot;Registration&quot;: {\n        &quot;body&quot;: {\n          &quot;status&quot;: &quot;valid&quot;,\n          &quot;contact&quot;: [\n            &quot;mailto:your@email.com&quot;\n          ]\n        },\n        &quot;uri&quot;: &quot;https://acme-v02.api.letsencrypt.org/acme/acct/104180270&quot;\n      },\n      &quot;PrivateKey&quot;: &quot;MIIJKQ.......\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>If a service is not starting, you can get more information by running:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker service ps --no-trunc u509qaymojjx\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Where <code>u509qaymojjx</code> is the id of the service obtained from <code>docker service ls</code>.</p><h3 id="run-manual-gitlab-ci-jobs" tabindex="-1"><a class="header-anchor" href="#run-manual-gitlab-ci-jobs" aria-hidden="true">#</a> Run manual GitLab CI jobs</h3><p>There are still a few things that must be done manually when we first release:</p><ul><li>run <code>./manage.py collectstatc</code> to move static folders into our the volume that is shared between nginx, the Django webserver and celery</li><li>run <code>./manage.py migrate</code> to apply the database migration files in order to create the database tables specified in your project&#39;s migration files</li><li>run <code>./manage.py createsuperuser</code> to create an administrative user that we can use to access the Django admin.</li></ul><p>The <code>.gitlab-ci.yml</code> file defines three additional jobs that are set to only run manually, which is whenever you press the &quot;Play&quot; button on a pipeline job. Once you push a tag and the first two stages (<code>build</code> and <code>deploy</code>) complete, you will be able to run these manual commands. However, you should verify that the <code>backend</code> service has been created and that it is running. You will see the logs from these jobs in the GitLab CI job logs, so if anything goes wrong it should be easy to figure out what may be causing a job failure.</p><p>Any time you add static files or add something to <code>INSTALLED_APPS</code> that includes static files (like Django REST Framework), you will need to trigger the <code>collectstatic</code> manaul job again.</p><p>Also, when you add new migration files, you will need to run the <code>migrate</code> manual job as well.</p><h2 id="removing-the-stack" tabindex="-1"><a class="header-anchor" href="#removing-the-stack" aria-hidden="true">#</a> Removing the stack</h2><p>If you wish to tear everything down, the easiest way is to delete the Droplet and then manually delete the volumes. If you run <code>docker stack rm my-stack</code>, note that the volumes will persist.</p><h2 id="cleaning-up-resources" tabindex="-1"><a class="header-anchor" href="#cleaning-up-resources" aria-hidden="true">#</a> Cleaning up resources</h2><p>One other thing to be aware of is older tags in your GitLab CI repository will not be automatically removed. You may want to periodically remove these, or use the GitLab API to do so. The assets created for the frontend will persist on GitLab for 30 days by default. You don&#39;t need these files once they are built into the docker image, so you can change the settings for these artififacts if you wish to do so.</p>',56),d={render:function(e,a){const t=(0,n.up)("OutboundLink");return(0,n.wg)(),(0,n.j4)(n.HY,null,[s,(0,n.Wm)("p",null,[i,(0,n.Wm)("a",l,[r,(0,n.Wm)(t)]),o]),c],64)}}}}]);