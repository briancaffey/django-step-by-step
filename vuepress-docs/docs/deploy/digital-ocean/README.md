# DigitalOcean Deployment Guide

This is a short walkthrough of how to deploy this project on DigitalOcean. There are some manual steps, but everything is automated through GitLab CI as much as possible.

## DigitalOcean Setup

- Create SSH key for user with Digital Ocean and add it to your account
- Create a project
- Add any size Droplet with Docker 19.03.12 machine image, add the SSH key that you created
- Don't add any volumes (we will do that automatically with REX-Ray)
- Ceate a DigitOcean Personal Access Token and store it somewhere, we will use it later

## GitLab Setup

### Protected Tags

Go to `Settings > Repository > Protected Tags` and create a wildcard tag to protect. I use `rc*` for staging environments and `v*` for version. When I create a git tag such as `rc1.2.3`, the GitLab CI pipline will run since I have set the following in `gitlab-ci.yml`:

```yaml
workflow:
  rules:
    - if: "$CI_COMMIT_TAG =~ /^rc/"
      when: always
```

### Environment Variables

Add the following environment variables to the cloned GitLab project's `CI/CD > Variables` section.

Make sure the environment variables are all protected since they contain sensitive information.

- `DJANGO_SUPERUSER_EMAIL`

- `DJANGO_SUPERUSER_PASSWORD`

- `DJANGO_SUPERUSER_USERNAME`

- `DOMAIN_NAME`

I will be using domains from Freenom which are completely free to use, suitable for demonstrations or other types of projects where you don't want to pay for a `.com` or other paid domain.

This is needed in order to create TLS certificates automatically with Traefik, certbot and Let's Encrypy. Traefik will take care of all of this automatically, all you need to do is set the variable which is referenced in the `web` service in `stack.yml` (discussed later on).

- `READ_REGISTRY_TOKEN`

Create a GitLab Personal Access [https://gitlab.com/-/profile/personal_access_tokens](https://gitlab.com/-/profile/personal_access_tokens) and add it to this variable.

- `SSH_PRIVATE_KEY`

Add the private SSH key from the SSH key pair created earlier

- `DROPLET_IP`

- `POSTGRES_PASSWORD`

- `SECRET_KEY`

- `DEBUG`: set this to the value `0`


## DNS Setup

Create an A Record that points to the Droplet IP.

If you registered `mysite.ga` and your Droplet IP is `123.456.789.10`, make sure that you can see the Droplet IP address when you run `dig mysite.ga` from your terminal. It should contain the following lines:

```
;; ANSWER SECTION:
mysite.ga.		3600	IN	A	123.456.789.10
```

## Docker Swarm Setup

SSH into the Droplet:

```
ssh -i ~/.ssh/your-key root@123.456.789.10
```

### Install REX-Ray Plugin

Using the DigitalOcean personal access token you create earlier (NOT the GitLab personal access token), run the following command:

```
docker plugin install rexray/dobs DOBS_TOKEN=your-token-123abc DOBS_REGION=nyc1 LINUX_VOLUME_FILEMODE=0775
```

Replacing `your-token-123abc` with the actual token value.

Confirm that you would like to install by pressing `y`.

Verify that the plugin has been installed by running:

```
docker plugin lsID                  NAME                 DESCRIPTION                               ENABLED
2acafbb251e4        rexray/dobs:latest   REX-Ray for Digital Ocean Block Storage   true
```

**Note: volume names must be unique across your DigitalOcean account**


### Initialize Docker Swarm

```
docker swarm init --advertise-addr 123.456.789.10
```

If you are going to use only one node for your swarm cluster, you can ignore the output of this command for now.

### Add traefik network

```
docker network create --driver=overlay traefik-public
```

## Deployment

At this point, everything should be ready to go for the initial deployment.

### Trigger a deployment

Simply create a git tag and push it to the GitLab repository:

```
git tag rc0.0.1
git push origin rc0.0.1
```

Alternatively, you can annotate the tag by using the `-a` flag:

```
git tag -a rc0.0.1
```

If you protected all tags starting with `rc` using an `rc*` wildcard for protected tags as mentioned above, only you (or whever you selected) will be able to push tags starting with `rc` that will trigger a deployment.

When you push this tag, the GitLab CI jobs defined in `.gitlab-ci.yml` will run:

- `build-backend`
- `build-nginx`
- `docker-stack-deploy`

The first two jobs build images, tag them with the current short git commit SHA-1 checksum and then push them to your private GitLab registry. You don't need to set up this registry, they are available by default for every GitLab project, and the environment variable `CI_REGISTRY_IMAGE` is automatically set in each GitLab CI job.

The last job, `docker-stack-deploy`, deploys a docker swarm stack to the swarm cluster that you set up earlier. This is done securly over SSH. The `.add-ssh-key` job template is included in the `docker-stack-deploy` which gives the CI job SSH access to the swarm cluster manager.

### Verify the deployment manually

Here are a few commands you can use to verify the deployment:

Check running services:

```
docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE                                                              PORTS
u509qaymojjx        my-stack_backend    replicated          1/1                 registry.gitlab.com/briancaffey/sec-filings-app/backend:1a659c95
myqiorvtif9p        my-stack_celery     replicated          1/1                 registry.gitlab.com/briancaffey/sec-filings-app/backend:1a659c95
uy77yz7ctpxe        my-stack_postgres   replicated          1/1                 postgres:latest
l3j0bbyfq5vu        my-stack_redis      replicated          1/1                 redis:alpine
bixr5yj152pd        my-stack_traefik    replicated          1/1                 traefik:v2.3.4                                                     *:80->80/tcp, *:443->443/tcp
uq58zduqaesj        my-stack_web        replicated          1/1                 registry.gitlab.com/briancaffey/sec-filings-app/nginx:1a659c95
```

Check volumes:

```
docker volume ls
rexray/dobs:latest   osdbackendassets
rexray/dobs:latest   osdletsencrypt
rexray/dobs:latest   osdpgdata
rexray/dobs:latest   osdredisdata
```

Check that the certificate was created successfully:

```
docker exec -it $(docker ps -q -f name="traefik") cat /letsencrypt/acme.json
{
  "letsencryptresolver": {
    "Account": {
      "Email": "your@email.com",
      "Registration": {
        "body": {
          "status": "valid",
          "contact": [
            "mailto:your@email.com"
          ]
        },
        "uri": "https://acme-v02.api.letsencrypt.org/acme/acct/104180270"
      },
      "PrivateKey": "MIIJKQ.......
```

If a service is not starting, you can get more information by running:

```
docker service ps --no-trunc u509qaymojjx
```

Where `u509qaymojjx` is the id of the service obtained from `docker service ls`.

### Run manual GitLab CI jobs

There are still a few things that must be done manually when we first release:

- run `./manage.py collectstatc` to move static folders into our the volume that is shared between nginx, the Django webserver and celery
- run `./manage.py migrate` to apply the database migration files in order to create the database tables specified in your project's migration files
- run `./manage.py createsuperuser` to create an administrative user that we can use to access the Django admin.

The `.gitlab-ci.yml` file defines three additional jobs that are set to only run manually, which is whenever you press the "Play" button on a pipeline job. Once you push a tag and the first two stages (`build` and `deploy`) complete, you will be able to run these manual commands. However, you should verify that the `backend` service has been created and that it is running. You will see the logs from these jobs in the GitLab CI job logs, so if anything goes wrong it should be easy to figure out what may be causing a job failure.

Any time you add static files or add something to `INSTALLED_APPS` that includes static files (like Django REST Framework), you will need to trigger the `collectstatic` manaul job again.

Also, when you add new migration files, you will need to run the `migrate` manual job as well.

## Removing the stack

If you wish to tear everything down, the easiest way is to delete the Droplet and then manually delete the volumes. If you run `docker stack rm my-stack`, note that the volumes will persist.

## Cleaning up resources

One other thing to be aware of is older tags in your GitLab CI repository will not be automatically removed. You may want to periodically remove these, or use the GitLab API to do so. The assets created for the frontend will persist on GitLab for 30 days by default. You don't need these files once they are built into the docker image, so you can change the settings for these artififacts if you wish to do so.
