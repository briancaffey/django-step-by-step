"use strict";(self.webpackChunkvuepress_docs=self.webpackChunkvuepress_docs||[]).push([[221],{4084:(e,t,o)=>{o.r(t),o.d(t,{data:()=>n});const n={key:"v-7d3c93ff",path:"/topics/jwt-authentication/",title:"Authentication",lang:"en-US",frontmatter:{next:"/topics/vuepress",prev:"/topics/jwt-authentication"},excerpt:"",headers:[{level:2,title:"Different ways to do authentication",slug:"different-ways-to-do-authentication",children:[{level:3,title:"Built-in session authentication",slug:"built-in-session-authentication",children:[]},{level:3,title:"Using JSON Web Tokens (JWT) in localStorage",slug:"using-json-web-tokens-jwt-in-localstorage",children:[]},{level:3,title:"Use JSON Web Tokens stored in memory/HttpOnly cookies",slug:"use-json-web-tokens-stored-in-memory-httponly-cookies",children:[]},{level:3,title:"Token Authentication from Django REST Framework",slug:"token-authentication-from-django-rest-framework",children:[]}]},{level:2,title:"Diagram of JWT authentication with HttpOnly cookies",slug:"diagram-of-jwt-authentication-with-httponly-cookies",children:[]}],filePathRelative:"topics/jwt-authentication/README.md",git:{updatedTime:1662167528e3,contributors:[]}}},4348:(e,t,o)=>{o.r(t),o.d(t,{default:()=>R});var n=o(6252);const i=(0,n.Wm)("h1",{id:"authentication",tabindex:"-1"},[(0,n.Wm)("a",{class:"header-anchor",href:"#authentication","aria-hidden":"true"},"#"),(0,n.Uk)(" Authentication")],-1),a=(0,n.Wm)("p",null,"Authentication is an important part of any application. With a Django project that uses a decoupled frontend application such as μblog, authentication can be done in several different ways with different trade-offs.",-1),s={class:"table-of-contents"},r=(0,n.Uk)("Different ways to do authentication"),l=(0,n.Uk)("Built-in session authentication"),c=(0,n.Uk)("Using JSON Web Tokens (JWT) in localStorage"),u=(0,n.Uk)("Use JSON Web Tokens stored in memory/HttpOnly cookies"),h=(0,n.Uk)("Token Authentication from Django REST Framework"),d=(0,n.Uk)("Diagram of JWT authentication with HttpOnly cookies"),m=(0,n.uE)('<h2 id="different-ways-to-do-authentication" tabindex="-1"><a class="header-anchor" href="#different-ways-to-do-authentication" aria-hidden="true">#</a> Different ways to do authentication</h2><p>Here are some ways that you can implement authentication:</p><ul><li>Use Django&#39;s built-in session authentication</li><li>Use JSON Web Tokens (JWT) stored in localStorage</li><li>Use JSON Web Tokens stored in memory/HttpOnly cookies</li><li>Use Token Authentication from Django REST Framework</li><li>Using third-party packages</li></ul><h3 id="built-in-session-authentication" tabindex="-1"><a class="header-anchor" href="#built-in-session-authentication" aria-hidden="true">#</a> Built-in session authentication</h3><p>Using Django session authentication is what the Django REST Framework documentation recommends for user authentication. Some important points:</p><ul><li>You don&#39;t need to use any Django template views in order to use this method of authentication.</li><li>This method of authentication requires no additional packages to be installed in our application</li><li>Using session auth is secure and easy to implement</li><li>Using session authentication is not stateless and each request must make a database query to check if the user is authenticated</li><li>Logging users out is straightforward</li><li>The <code>sessionid</code> cookie is set as an <code>HttpOnly</code> cookie</li><li>The backend and frontend must use the same domain and subdomain</li></ul><h3 id="using-json-web-tokens-jwt-in-localstorage" tabindex="-1"><a class="header-anchor" href="#using-json-web-tokens-jwt-in-localstorage" aria-hidden="true">#</a> Using JSON Web Tokens (JWT) in localStorage</h3><p>This method of authentication is very flexible and easy to implement and seems to be used very widely. However, there are some important concerns that need to be considered. Here are the import points regarding JSON Web Token authentication:</p>',8),k=(0,n.uE)("<li>Storing authentication data is <code>localStorage</code> is not a best practice</li><li>You can easily authenticate requests where the backend and frontend are on different hosts. Some examples of <code>backend</code> / <code>frontend</code> configurations that you can use with JWT authentication include: <ul><li><code>api.mydomain.com</code> / <code>app.mydomain.com</code></li><li><code>localhost:8000</code> / <code>localhost:8080</code></li></ul></li>",2),f=(0,n.Uk)("Using JWT authentication typically involves using a third-party package such as "),g={href:"https://github.com/jazzband/djangorestframework-simplejwt",target:"_blank",rel:"noopener noreferrer"},p=(0,n.Wm)("code",null,"djangorestframework-simplejwt",-1),w=(0,n.uE)("<li>If malicious JavaScript can run on the client, then an attacker could steal the JWT <code>access</code> token and start making authenticated requests.</li><li>If someone steals the tokens from your device (for example if someone copied the <code>access</code> and <code>refresh</code> from the browser&#39;s <code>localStorage</code> when you are not at your device), then an attacker could use the stolen tokens to make authenticated requests, even if you log out. Logging only deletes the <code>access</code> and <code>refresh</code> tokens from your browser&#39;s <code>localStorage</code>.</li>",2),W=(0,n.Wm)("h3",{id:"use-json-web-tokens-stored-in-memory-httponly-cookies",tabindex:"-1"},[(0,n.Wm)("a",{class:"header-anchor",href:"#use-json-web-tokens-stored-in-memory-httponly-cookies","aria-hidden":"true"},"#"),(0,n.Uk)(" Use JSON Web Tokens stored in memory/HttpOnly cookies")],-1),y=(0,n.Wm)("p",null,"This methods of authentication combines some of the features of JWT and session authentication.",-1),b=(0,n.Uk)("It takes some ideas and code from "),j={href:"https://github.com/jazzband/djangorestframework-simplejwt/issues/71",target:"_blank",rel:"noopener noreferrer"},U=(0,n.Uk)("this GitHub issue"),T=(0,n.Uk)("It generally follows the advice from "),v={href:"https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/",target:"_blank",rel:"noopener noreferrer"},S=(0,n.Uk)("this article"),J=(0,n.Wm)("li",null,[(0,n.Uk)("It stores the "),(0,n.Wm)("code",null,"access"),(0,n.Uk)(" token in memory on the client")],-1),O=(0,n.Wm)("li",null,[(0,n.Uk)("It sets the "),(0,n.Wm)("code",null,"refresh"),(0,n.Uk)(" token in an HttpOnly cookie on the client")],-1),D=(0,n.Wm)("li",null,[(0,n.Uk)("Logout can be done by deleting the "),(0,n.Wm)("code",null,"refresh"),(0,n.Uk)(" token")],-1),H=(0,n.Wm)("h3",{id:"token-authentication-from-django-rest-framework",tabindex:"-1"},[(0,n.Wm)("a",{class:"header-anchor",href:"#token-authentication-from-django-rest-framework","aria-hidden":"true"},"#"),(0,n.Uk)(" Token Authentication from Django REST Framework")],-1),x=(0,n.Uk)("Token Authentication from the Django REST Framework is pretty straightforward. You can allow users to request an API token that they can use to authenticate requests. See "),_={href:"https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication",target:"_blank",rel:"noopener noreferrer"},E=(0,n.Uk)("https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication"),A=(0,n.Uk)(" for more information."),q=(0,n.Wm)("h2",{id:"diagram-of-jwt-authentication-with-httponly-cookies",tabindex:"-1"},[(0,n.Wm)("a",{class:"header-anchor",href:"#diagram-of-jwt-authentication-with-httponly-cookies","aria-hidden":"true"},"#"),(0,n.Uk)(" Diagram of JWT authentication with HttpOnly cookies")],-1),N=(0,n.Wm)("p",null,"Here is an overview of what the JWT authentication process looks like when using HttpOnly cookies:",-1),R={render:function(e,t){const o=(0,n.up)("RouterLink"),R=(0,n.up)("OutboundLink");return(0,n.wg)(),(0,n.j4)(n.HY,null,[i,a,(0,n.Wm)("nav",s,[(0,n.Wm)("ul",null,[(0,n.Wm)("li",null,[(0,n.Wm)(o,{to:"#different-ways-to-do-authentication"},{default:(0,n.w5)((()=>[r])),_:1}),(0,n.Wm)("ul",null,[(0,n.Wm)("li",null,[(0,n.Wm)(o,{to:"#built-in-session-authentication"},{default:(0,n.w5)((()=>[l])),_:1})]),(0,n.Wm)("li",null,[(0,n.Wm)(o,{to:"#using-json-web-tokens-jwt-in-localstorage"},{default:(0,n.w5)((()=>[c])),_:1})]),(0,n.Wm)("li",null,[(0,n.Wm)(o,{to:"#use-json-web-tokens-stored-in-memory-httponly-cookies"},{default:(0,n.w5)((()=>[u])),_:1})]),(0,n.Wm)("li",null,[(0,n.Wm)(o,{to:"#token-authentication-from-django-rest-framework"},{default:(0,n.w5)((()=>[h])),_:1})])])]),(0,n.Wm)("li",null,[(0,n.Wm)(o,{to:"#diagram-of-jwt-authentication-with-httponly-cookies"},{default:(0,n.w5)((()=>[d])),_:1})])])]),m,(0,n.Wm)("ul",null,[k,(0,n.Wm)("li",null,[f,(0,n.Wm)("a",g,[p,(0,n.Wm)(R)])]),w]),W,y,(0,n.Wm)("ul",null,[(0,n.Wm)("li",null,[b,(0,n.Wm)("a",j,[U,(0,n.Wm)(R)])]),(0,n.Wm)("li",null,[T,(0,n.Wm)("a",v,[S,(0,n.Wm)(R)])]),J,O,D]),H,(0,n.Wm)("p",null,[x,(0,n.Wm)("a",_,[E,(0,n.Wm)(R)]),A]),q,N,(0,n.Wm)("img",{src:e.$withBase("/diagrams/jwt-authentication.png"),alt:"jwt authentication"},null,8,["src"])],64)}}}}]);