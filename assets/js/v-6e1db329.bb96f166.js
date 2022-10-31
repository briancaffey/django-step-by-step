"use strict";(self.webpackChunkvuepress_docs=self.webpackChunkvuepress_docs||[]).push([[758],{5019:(e,t,n)=>{n.r(t),n.d(t,{data:()=>i});const i={key:"v-6e1db329",path:"/guide/ci-cd/github-actions/",title:"GitHub Actions Guide",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"lint-and-test-python",slug:"lint-and-test-python",children:[]},{level:2,title:"deploy",slug:"deploy",children:[]}],filePathRelative:"guide/ci-cd/github-actions/README.md",git:{updatedTime:1667187242e3,contributors:[]}}},831:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var i=n(6252);const o=(0,i.uE)('<h1 id="github-actions-guide" tabindex="-1"><a class="header-anchor" href="#github-actions-guide" aria-hidden="true">#</a> GitHub Actions Guide</h1><p>GitHub Actions are used to run unit tests and to deploy the application using CDK.</p><p>There are two jobs defined for out GitHub actions:</p><ul><li><code>lint-and-test-python</code></li><li><code>deploy</code></li></ul><h2 id="lint-and-test-python" tabindex="-1"><a class="header-anchor" href="#lint-and-test-python" aria-hidden="true">#</a> <code>lint-and-test-python</code></h2><p>This job checks the code quality of the Django application and runs unit tests using a Postgres database.</p><p>If this job fails, the pipeline will be terminated and will not continue on to the <code>deploy</code> job</p><h2 id="deploy" tabindex="-1"><a class="header-anchor" href="#deploy" aria-hidden="true">#</a> <code>deploy</code></h2>',8),a=(0,i.Uk)("The deploy job uses "),d=(0,i.Wm)("code",null,"ubuntu-latest",-1),l=(0,i.Uk)(". More information on the tools that are included in this environment can be found here: "),s={href:"https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md#tools",target:"_blank",rel:"noopener noreferrer"},u=(0,i.Uk)("https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md#tools"),r=(0,i.Uk)("."),c=(0,i.Wm)("p",null,[(0,i.Uk)("The environment does include docker, so we will not need to install or configure docker separately. The "),(0,i.Wm)("code",null,"cdk deploy"),(0,i.Uk)(" command that this job runs uses docker to build our application's backend docker image and then pushes that image to Elastic Container Registry (ECR).")],-1),h={render:function(e,t){const n=(0,i.up)("OutboundLink");return(0,i.wg)(),(0,i.j4)(i.HY,null,[o,(0,i.Wm)("p",null,[a,d,l,(0,i.Wm)("a",s,[u,(0,i.Wm)(n)]),r]),c],64)}}}}]);