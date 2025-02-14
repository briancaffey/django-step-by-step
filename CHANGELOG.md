# Changelog

## [0.9.3](https://github.com/briancaffey/django-step-by-step/compare/v0.9.2...v0.9.3) (2025-02-14)


### Bug Fixes

* **storage:** remove default_acl setting on static file storage ([9a18786](https://github.com/briancaffey/django-step-by-step/commit/9a187867243442060f1e73c6b89f97f29ea1e3ac))

## [0.9.2](https://github.com/briancaffey/django-step-by-step/compare/v0.9.1...v0.9.2) (2025-02-14)


### Bug Fixes

* **docker:** add curl to python slim ([873167f](https://github.com/briancaffey/django-step-by-step/commit/873167fcdbee38852f9d2aab6c1c766603ec6db0))

## [0.9.1](https://github.com/briancaffey/django-step-by-step/compare/v0.9.0...v0.9.1) (2025-02-14)


### Bug Fixes

* **cdk:** bump cdk-django version for dependency fix ([c6df6e4](https://github.com/briancaffey/django-step-by-step/commit/c6df6e442cc3043512e10120c29b14150fd2d14e))
* **cdk:** bump cdk-django version for dependency fix to 1.8.1 ([e9d28dc](https://github.com/briancaffey/django-step-by-step/commit/e9d28dc625afe115056daddea0ff241a17f1bfd3))
* **chat:** fix issue with chat when using openai api key ([980fe62](https://github.com/briancaffey/django-step-by-step/commit/980fe62c957687eed65641be2b1124fe88ccddc8))
* **gha:** upgrade python version to 3.13.2 in github action ci script ([f830acb](https://github.com/briancaffey/django-step-by-step/commit/f830acbdb40eed2fe2dd899a9607992364299595))
* **lint:** format code with black ([acda08f](https://github.com/briancaffey/django-step-by-step/commit/acda08f6c7fc8fff4c913fb8005cc84a89526aa2))
* **pytest:** fix pytest config filterwarnings section ([aadf5f3](https://github.com/briancaffey/django-step-by-step/commit/aadf5f3994d9766caea3d92ccbb88523414d846b))

## [0.8.1](https://github.com/briancaffey/django-step-by-step/compare/v0.8.0...v0.8.1) (2025-02-09)


### Bug Fixes

* **email:** fix to email for celery task confirmation email ([19aa9a5](https://github.com/briancaffey/django-step-by-step/commit/19aa9a53640bba54d64b919c4c1b34cdac4729d4))

## [0.8.0](https://github.com/briancaffey/django-step-by-step/compare/v0.7.3...v0.8.0) (2025-02-05)


### Features

* **compose:** setup docker compose config for ec2 ([5e10e89](https://github.com/briancaffey/django-step-by-step/commit/5e10e89a32f45256aa654aa3ea3b7bfaa82eb3b2))
* **compose:** setup docker compose config for ec2 ([ace0fb7](https://github.com/briancaffey/django-step-by-step/commit/ace0fb7b57567c7b49f954198dc65178e588c5e1))
* **compose:** setup docker compose config for ec2 ([9e463dd](https://github.com/briancaffey/django-step-by-step/commit/9e463ddff049e24943c7571853a502079a48cc98))
* **compose:** setup docker compose config for ec2 typo ([56d9760](https://github.com/briancaffey/django-step-by-step/commit/56d97604eeef0d7fa3f8b7defc4c9bc6acf29550))
* **compose:** setup docker compose config for ec2 typo ([04fb4de](https://github.com/briancaffey/django-step-by-step/commit/04fb4debe8a81a802ea1beee2c9958cde8d9bd90))
* **docker-compose:** add a docker compose config that can run on ec2 ([1e82118](https://github.com/briancaffey/django-step-by-step/commit/1e82118a0197cf3202ed52605e090fb8c4b5ac8c))
* **docker-compose:** add a docker compose config that can run on ec2 ([020fe08](https://github.com/briancaffey/django-step-by-step/commit/020fe0817ce18ba879f88606d227532bb858124b))
* **docker-compose:** add a docker compose config that can run on ec2 ([58867f5](https://github.com/briancaffey/django-step-by-step/commit/58867f539dde252b958a421cbab56b57f562fd55))
* **email:** updated email settings to support ses ([bec6224](https://github.com/briancaffey/django-step-by-step/commit/bec6224d4cc82f204f84ca4e373bcd31d9117753))
* **terraform:** update terraform code to support new module structure ([5a824f5](https://github.com/briancaffey/django-step-by-step/commit/5a824f5ce4fb9e4f21bc70ba6d10550b37919452))


### Bug Fixes

* **ec2:** chmod for entrypoint.sh ([3e05e83](https://github.com/briancaffey/django-step-by-step/commit/3e05e83f8601b6e4c976b8caca925d029e7573e1))
* **ec2:** fix docker compose volumes for ec2 init compose ([070afe2](https://github.com/briancaffey/django-step-by-step/commit/070afe2f50ef0d81d60e27c63835e3f8dc2ea304))
* **ec2:** fix docker compose volumes for ec2 init compose ([2a16172](https://github.com/briancaffey/django-step-by-step/commit/2a16172327aa34aebcf579b9461c5121d50aaa75))
* **nginx:** fix docker compose nginx config ([6156b10](https://github.com/briancaffey/django-step-by-step/commit/6156b10cf6a7244751d350f384c1aea49da140e4))
* **nginx:** fix docker compose nginx config ([d7a1eb1](https://github.com/briancaffey/django-step-by-step/commit/d7a1eb1ce032ee8c7c23570d98459f4fe7d6ec6c))
* **nginx:** fix docker compose nginx config ([85fd12e](https://github.com/briancaffey/django-step-by-step/commit/85fd12e45117b3b0eb5183dc0f0248507112b079))
* **nginx:** fix docker compose nginx config typo ([4d2844c](https://github.com/briancaffey/django-step-by-step/commit/4d2844cc0d5573f56574e0e2e12ac980d1a20efe))
* **nginx:** fix nginx configs in docker compose for ec2 ([5e84d50](https://github.com/briancaffey/django-step-by-step/commit/5e84d5098696d26e1d62d2162bc619f44e05c441))
* **nginx:** fix nginx configs in docker compose for ec2 ([099723c](https://github.com/briancaffey/django-step-by-step/commit/099723c34f3e496b96ac17d7ca87d15d159088d3))

## [0.7.3](https://github.com/briancaffey/django-step-by-step/compare/v0.7.2...v0.7.3) (2025-02-02)


### Bug Fixes

* **email:** fix email settings in base settings ([7bd0978](https://github.com/briancaffey/django-step-by-step/commit/7bd0978f77c626b0c814d0dcb7f01810a872d9f2))

## [0.7.2](https://github.com/briancaffey/django-step-by-step/compare/v0.7.1...v0.7.2) (2025-01-31)


### Bug Fixes

* **nvidia:** add nvidia tf var to terraform actions workflow ([90abf69](https://github.com/briancaffey/django-step-by-step/commit/90abf69c8ed34118bb63a266c9d26237766fe06a))

## [0.7.1](https://github.com/briancaffey/django-step-by-step/compare/v0.7.0...v0.7.1) (2025-01-31)


### Bug Fixes

* **settings:** add csrf settings to production settings ([583aed1](https://github.com/briancaffey/django-step-by-step/commit/583aed1ecd0a554070d683a3d9291202fd5f06e5))

## [0.7.0](https://github.com/briancaffey/django-step-by-step/compare/v0.6.1...v0.7.0) (2025-01-31)


### Features

* **nvidia:** add nvidia api key variable to tf config ([81382df](https://github.com/briancaffey/django-step-by-step/commit/81382dfc3c965837dc65ac1ec640d8b635e19617))

## [0.6.1](https://github.com/briancaffey/django-step-by-step/compare/v0.6.0...v0.6.1) (2025-01-31)


### Bug Fixes

* **gha:** fix github action steps ([a4e538a](https://github.com/briancaffey/django-step-by-step/commit/a4e538a027e6f90cd6107afe876c93a3c972b5c8))

## [0.6.0](https://github.com/briancaffey/django-step-by-step/compare/v0.5.2...v0.6.0) (2025-01-31)


### Features

* **gha:** split app_update into different jobs ([07e27e1](https://github.com/briancaffey/django-step-by-step/commit/07e27e18ce8be565d4e52019c2ddd0df14f711c6))

## [0.5.2](https://github.com/briancaffey/django-step-by-step/compare/v0.5.1...v0.5.2) (2025-01-31)


### Bug Fixes

* **email:** add admin email setting ([86feb1e](https://github.com/briancaffey/django-step-by-step/commit/86feb1e6d4d1caf10ae9733be7204dcdfe4beffd))

## [0.5.1](https://github.com/briancaffey/django-step-by-step/compare/v0.5.0...v0.5.1) (2025-01-31)


### Bug Fixes

* **lint:** format code with black ([1e05cc0](https://github.com/briancaffey/django-step-by-step/commit/1e05cc0963c745e7295059290983a5f99ce4d869))

## [0.5.0](https://github.com/briancaffey/django-step-by-step/compare/v0.4.0...v0.5.0) (2025-01-31)


### Features

* **gha:** final fix for create db function ([9b1f71b](https://github.com/briancaffey/django-step-by-step/commit/9b1f71b775eb02d785eddf310a0e5cc1c4d21e8f))

## [0.4.0](https://github.com/briancaffey/django-step-by-step/compare/v0.3.3...v0.4.0) (2025-01-31)


### Features

* **gha:** final fixes for gha build push ([9f1442c](https://github.com/briancaffey/django-step-by-step/commit/9f1442cc2553ee67c6d9a651e43f4209d499db43))


### Bug Fixes

* **db:** final fix for management command that creates database ([fd108c6](https://github.com/briancaffey/django-step-by-step/commit/fd108c650d5b358369633d9a06f238cae60c71ea))
* **db:** final fix for management command that creates database ([30964a7](https://github.com/briancaffey/django-step-by-step/commit/30964a79958f5a666117ad179ad1d1fd2021b743))
* **db:** final fix for management command that creates database ([ee845c8](https://github.com/briancaffey/django-step-by-step/commit/ee845c8f748dd98208dcc168ca84005cfd93bef5))
* **db:** logging for db ([627bb71](https://github.com/briancaffey/django-step-by-step/commit/627bb71fae60aa9ea308b3fdda6ce0300ad36136))
* **gha:** update be build push pipeline ([23878fe](https://github.com/briancaffey/django-step-by-step/commit/23878fef4289394be4ad4dd903c90d14ae55bcc3))

## [0.3.3](https://github.com/briancaffey/django-step-by-step/compare/v0.3.2...v0.3.3) (2025-01-31)


### Bug Fixes

* **db:** fix script for creating db ([1b18311](https://github.com/briancaffey/django-step-by-step/commit/1b18311a039c4c193934b904d6b025a7f1747570))

## [0.3.2](https://github.com/briancaffey/django-step-by-step/compare/v0.3.1...v0.3.2) (2025-01-31)


### Bug Fixes

* **db:** fix db scripts, update poetry ([b6667c0](https://github.com/briancaffey/django-step-by-step/commit/b6667c0f086e12bc873af57c63a51bb039889b60))

## [0.3.1](https://github.com/briancaffey/django-step-by-step/compare/v0.3.0...v0.3.1) (2025-01-31)


### Bug Fixes

* **gha:** fix issue where with render task def where task is not updated ([0010e72](https://github.com/briancaffey/django-step-by-step/commit/0010e728ed2e7fe0adf545b86f30c8d38686684b))
* **gha:** fix issue with deploying new task definition ([b1cbce6](https://github.com/briancaffey/django-step-by-step/commit/b1cbce6e413b8674e8a14cf88cdf91baa483a015))
* **gha:** fix issue with deploying new task definition ([99bb5b3](https://github.com/briancaffey/django-step-by-step/commit/99bb5b354338dc77a5bcd11e8ecec0293ecfe375))

## [0.3.0](https://github.com/briancaffey/django-step-by-step/compare/v0.2.0...v0.3.0) (2025-01-31)


### Features

* **gha:** add app update workflow for frontend app ([4d28090](https://github.com/briancaffey/django-step-by-step/commit/4d2809003192b03e04ff585242f416e0d4ea3d63))
* **gha:** add workflow for running backend pre-update task for db migrations ([00b4a68](https://github.com/briancaffey/django-step-by-step/commit/00b4a682ad3b0ca163352f51a90510e06052f259))


### Bug Fixes

* **db:** fix for the script that creates postgres databases for new environments ([671fa6a](https://github.com/briancaffey/django-step-by-step/commit/671fa6af2f08a5c289273e9c00a4ed0719e3cb1f))
* **gha:** add fargate launch type to run-task action step ([99f1bf8](https://github.com/briancaffey/django-step-by-step/commit/99f1bf87c120545bea91de8ee05181b29bf1f502))
* **gha:** add fargate launch type to run-task action step ([9ebf11d](https://github.com/briancaffey/django-step-by-step/commit/9ebf11de4f23d3fc9c881cff45463c2b39e8dae5))
* **gha:** add if conditional to gha deploy step for when only updating task def ([09812ca](https://github.com/briancaffey/django-step-by-step/commit/09812cab59fd8c6d88e2c8f8cbffab6e6a5e39e3))
* **gha:** add step to get task definition ([c79fbc2](https://github.com/briancaffey/django-step-by-step/commit/c79fbc28b0d3ec907e0801d9da240c157ef5ef10))
* **gha:** add step to get task definition ([0137ebd](https://github.com/briancaffey/django-step-by-step/commit/0137ebd8955d06071e629c80d5877d2d84eb6de3))
* **gha:** fix env vars for tf gha ([ee98ec3](https://github.com/briancaffey/django-step-by-step/commit/ee98ec38b2eb350a067650ffe72bd9f6fd072cd6))
* **gha:** fix gha task deployment issue ([232b2a2](https://github.com/briancaffey/django-step-by-step/commit/232b2a2455caba5f65a56f3ac6adad166b0b1b5a))
* **gha:** fix gha task input issue ([bab44f5](https://github.com/briancaffey/django-step-by-step/commit/bab44f5cabb3b93296400a560b51f6ab14982341))
* **gha:** fix image reference in render task def step ([93d9baf](https://github.com/briancaffey/django-step-by-step/commit/93d9baf129a84c397be7e10351b0f1f0d244622f))
* **gha:** fix input for reusable gha ([e6340a7](https://github.com/briancaffey/django-step-by-step/commit/e6340a7022de892de9315d7047cf8c3d316fbf53))
* **gha:** fix tag lookup for run task ([955a2db](https://github.com/briancaffey/django-step-by-step/commit/955a2db1b2b1b6b43396eb9ea16c546bb6b746c9))
* **gha:** fix tag lookup for security groups ([2eb564f](https://github.com/briancaffey/django-step-by-step/commit/2eb564fb4d162c32b750fb101782e40956197cc3))
* **gha:** fix tag lookup for subnets ([c901458](https://github.com/briancaffey/django-step-by-step/commit/c901458d9f09fd6d988d1b16b8f85f26d04a9266))
* **gha:** fix tag lookup for vpc id ([b39343f](https://github.com/briancaffey/django-step-by-step/commit/b39343f70b8b3e8a134e612d87fef82583a63dde))
* **gha:** fix workflow container-name value ([a88d741](https://github.com/briancaffey/django-step-by-step/commit/a88d741ea3101f6078afab4847819f4ebe921d59))
* **gha:** move app update to reusable action ([58b891f](https://github.com/briancaffey/django-step-by-step/commit/58b891ff9b36c2e443c0cc323f4b7fec6e3382e5))
* **gha:** remove unused var backend_name ([5fb354d](https://github.com/briancaffey/django-step-by-step/commit/5fb354dac1bc991992ca6bb18a82c54d704bca29))
* **gha:** run pre update task fixes ([6a90658](https://github.com/briancaffey/django-step-by-step/commit/6a90658fa14c354541fb5fa5a0e35036ca4a5c0d))
* **tf:** fix variables for app stack ([94263de](https://github.com/briancaffey/django-step-by-step/commit/94263de3e0c2a2b513eced6ec9b19688f8015dbc))

## [0.2.0](https://github.com/briancaffey/django-step-by-step/compare/v0.1.0...v0.2.0) (2025-01-30)


### Features

* **gha:** fix build pipeline for frontend app image building ([ce368f0](https://github.com/briancaffey/django-step-by-step/commit/ce368f0d661820acb8245fb155295189eeda058e))
* **gha:** move workflow into workflows dir ([bc830df](https://github.com/briancaffey/django-step-by-step/commit/bc830df6d3cb2f0fec9d5769c655de23d452f277))
* **gha:** update gha for building backend image, added top-level app name ([19c5636](https://github.com/briancaffey/django-step-by-step/commit/19c563600c5c6e1530ef6482cc67f0090cdc4ff7))
* **gha:** update gha for terraform ad hoc base workflow ([a18d8f3](https://github.com/briancaffey/django-step-by-step/commit/a18d8f3aa8d2043dee1882f46a3bce459926d114))
* **settings:** update settings for email and fix database secret fetching ([43d3a5f](https://github.com/briancaffey/django-step-by-step/commit/43d3a5f3834d9bf7f403579d85179dc3853358f7))
* **tf:** add option for running terraform destroy ([67a689c](https://github.com/briancaffey/django-step-by-step/commit/67a689ce4f2dfe4bf7baded23074017c4cd6297b))


### Bug Fixes

* **gha:** final fixes for tf gha ([338dc42](https://github.com/briancaffey/django-step-by-step/commit/338dc42a1e13200eec89c14382180788a689bb4f))
* **gha:** fix syntax in workflow ([674c3c0](https://github.com/briancaffey/django-step-by-step/commit/674c3c05592fe0481d628db3dbdca62ff66f5f12))
* **gha:** fix syntax in workflow ([f7c092d](https://github.com/briancaffey/django-step-by-step/commit/f7c092ddcffe5358ae4f376138f8f45a192468fc))
* **gha:** fixes for using a single tf github action ([9dba7ad](https://github.com/briancaffey/django-step-by-step/commit/9dba7ad402700d18f4f5456e8d37866797ad649a))
* **gha:** improvements for tf gha ([afb6d4e](https://github.com/briancaffey/django-step-by-step/commit/afb6d4ea0b7d7e0d3076ca754be653059bd3e5de))
* **gha:** improvements for tf gha ([4775622](https://github.com/briancaffey/django-step-by-step/commit/4775622f8ddeeae896acb8f7f0cbf8e9f284e21b))
* **gha:** improvements for tf gha ([e9c97e1](https://github.com/briancaffey/django-step-by-step/commit/e9c97e1784174af9531e3ac36c46fc3960dea434))
* **gha:** improvements for tf gha ([f1823d1](https://github.com/briancaffey/django-step-by-step/commit/f1823d1c1a0462150d5c571a33acc9474dc98d92))
* **gha:** improvements for tf gha ([392a003](https://github.com/briancaffey/django-step-by-step/commit/392a0036a11fe39097e67839b59facf02769be46))
* **gha:** improvements for tf gha ([3fc0fab](https://github.com/briancaffey/django-step-by-step/commit/3fc0fabe8719034430c603bf43e56cd2f7bfd185))
* **gha:** improvements for tf gha ([6c595d2](https://github.com/briancaffey/django-step-by-step/commit/6c595d2f04c928eccb5c92283f646da16f86a6d0))
* **gha:** improvements for tf gha ([83d8612](https://github.com/briancaffey/django-step-by-step/commit/83d86126c5089db04df59eef2a764a80e3e8c083))
* **gha:** improvements for tf gha ([2a4666c](https://github.com/briancaffey/django-step-by-step/commit/2a4666c1b243b0919dc3dfac2b3c3930a3d2d2db))
* **gha:** improvements for tf gha ([6907a0a](https://github.com/briancaffey/django-step-by-step/commit/6907a0a3f4c8f50c7e09dc6f16b626fa99089f36))
* **gha:** improvements for tf gha ([356abbc](https://github.com/briancaffey/django-step-by-step/commit/356abbcf6ec10d55dbbc9b03b2a9ee93b8136efb))
* **gha:** improvements for tf gha ([2e32528](https://github.com/briancaffey/django-step-by-step/commit/2e3252826f3fbf13de4a950f4cf2963d1147e377))
* **gha:** improvements for tf gha ([40a4a6f](https://github.com/briancaffey/django-step-by-step/commit/40a4a6f6618bbe74535e11096329155f89887d28))
* **gha:** improvements for tf gha add credentials ([1a65f5c](https://github.com/briancaffey/django-step-by-step/commit/1a65f5cd317f620010edeff682855d614197f5f3))
* **gha:** improvements for tf gha tf workspace env var ([f6bed62](https://github.com/briancaffey/django-step-by-step/commit/f6bed62f442c5697ff23c7432ba4916855264cfb))
* **gha:** improvements for tf gha tf workspace env var ([aa440da](https://github.com/briancaffey/django-step-by-step/commit/aa440daeacebcfcec3bf4b29577a8e13f9fbde99))
* **gha:** improvements for tf gha tf workspace env var ([2c2571c](https://github.com/briancaffey/django-step-by-step/commit/2c2571ca66b1da03e5ee429467470f0ea801518e))
* **gha:** improvements for tf gha tf workspace env var ([978cfeb](https://github.com/briancaffey/django-step-by-step/commit/978cfebe5499cb85b212006aee52c9386cf19ac3))
* **gha:** update run-name for terraform action ([79c6600](https://github.com/briancaffey/django-step-by-step/commit/79c6600497c809fdc127be9da8154b4b89a24336))
* **terraform:** fix env vars for terraform ([8f8dd8c](https://github.com/briancaffey/django-step-by-step/commit/8f8dd8cd30de32837e9bca44b7048c2a117c4c83))
* **terraform:** fixes and debuggin tf scripts ([56af84d](https://github.com/briancaffey/django-step-by-step/commit/56af84d280298b2d80f7233fdea70e88f39cb84b))
* **terraform:** rename terraform gha workflow and file ([785056a](https://github.com/briancaffey/django-step-by-step/commit/785056a498e80720bb24c6bb96b0d6b0bf005098))
* **tf:** add rds password secret name output ([472152d](https://github.com/briancaffey/django-step-by-step/commit/472152dc715866228745298f75c5c1df3078d82f))
* **tf:** add variable for rds secret name ([526fc1a](https://github.com/briancaffey/django-step-by-step/commit/526fc1a69f700ffe8c0a6b605c53037f5bb7a157))
* **tf:** fix env vars for terraform gha ([da8f1a2](https://github.com/briancaffey/django-step-by-step/commit/da8f1a2cef060ee42d2bbaa8505f8232919b6b3a))
* **tf:** fix issues with tf app stack ([5e5b422](https://github.com/briancaffey/django-step-by-step/commit/5e5b422ccf01d3f60a07872846fa2401b88b84db))
* **tf:** fix module source ([05daba0](https://github.com/briancaffey/django-step-by-step/commit/05daba0393a79706f74e897e1c6886588727ea18))
* **tf:** fix output value for app stack redis_service_host ([521c39d](https://github.com/briancaffey/django-step-by-step/commit/521c39d5865eea9b891f8960cf2346138dd1c2a2))
* **tf:** fix source value to point to git repo rather than local dir ([8bf72a0](https://github.com/briancaffey/django-step-by-step/commit/8bf72a0c9e95b68094fc805fcfe7a1c279afdd3d))
* **tf:** fix typo in var name ([4a8ec35](https://github.com/briancaffey/django-step-by-step/commit/4a8ec3506256171ceef6f25854348c13f337e682))
* **tf:** remove unused variable ([9cb1a39](https://github.com/briancaffey/django-step-by-step/commit/9cb1a39a2428bd034f291e2beb2442e4b42d5ba4))
* **typo:** fix typo in terraform module ([081fde4](https://github.com/briancaffey/django-step-by-step/commit/081fde42de2f277b68f95aa68cc0e77ef0668e88))

## [0.1.0](https://github.com/briancaffey/django-step-by-step/compare/v0.0.5...v0.1.0) (2025-01-28)


### Features

* **auth:** update flow for activating account after user registers ([60479ff](https://github.com/briancaffey/django-step-by-step/commit/60479ff881552f867429acac91a288b732f5b1bc))
* **ca:** update rds certs ([f5a7d0a](https://github.com/briancaffey/django-step-by-step/commit/f5a7d0a83a5677c12728699d19be41d53565de2f))
* **cdk:** add env vars ([759e12e](https://github.com/briancaffey/django-step-by-step/commit/759e12e7c5af7fc85d9c98d8c4e6712e70910c47))
* **cdk:** add env vars ([50f0c72](https://github.com/briancaffey/django-step-by-step/commit/50f0c72ec51435cff0ccbb0a7818c38946be9cf6))
* **cdk:** add env vars ([333b833](https://github.com/briancaffey/django-step-by-step/commit/333b833b050461017de8f98ec8360621a03a3d40))
* **cdk:** add env vars ([0e62cdb](https://github.com/briancaffey/django-step-by-step/commit/0e62cdbba6b8eeebe51c05cfad2cb3942c7cec66))
* **cdk:** add env vars ([ac804a8](https://github.com/briancaffey/django-step-by-step/commit/ac804a8824384415a048748d2eac7c2c2ef35039))
* **cdk:** add env vars ([0275830](https://github.com/briancaffey/django-step-by-step/commit/0275830a4e633319305315133d02436e1a33ba35))
* **cdk:** add env vars ([5bb7862](https://github.com/briancaffey/django-step-by-step/commit/5bb786250aa0817743dd5441a205c91c36cf1450))
* **cdk:** add env vars ([1814eef](https://github.com/briancaffey/django-step-by-step/commit/1814eef4aeccd63136b2027a7235757a5ac050a8))
* **cdk:** fix gha ([caad8c2](https://github.com/briancaffey/django-step-by-step/commit/caad8c21cdbc066bf23551b703f4fe5d7a35cfc9))
* **cdk:** fix gha ([dbc2c39](https://github.com/briancaffey/django-step-by-step/commit/dbc2c390ef67213f42107ffd43856551f9c1e641))
* **cdk:** update action for cdk deploy ([ac3dc65](https://github.com/briancaffey/django-step-by-step/commit/ac3dc6594986473bd0d3d18f34df39a36415d458))
* **cdk:** update action for cdk deploy ([cea2a47](https://github.com/briancaffey/django-step-by-step/commit/cea2a47b585d0c8ff4501e7cc654d73013e8e071))
* **cdk:** update action for cdk deploy ([c30fe0a](https://github.com/briancaffey/django-step-by-step/commit/c30fe0a637f4166f8be5e4735d27421a9928665c))
* **cdk:** update action for cdk deploy ([920e1b3](https://github.com/briancaffey/django-step-by-step/commit/920e1b3ecb7b8bda0ef515bee7c8c392000fb0f4))
* **cdk:** update action for cdk deploy ([6d47116](https://github.com/briancaffey/django-step-by-step/commit/6d47116711ac05be5d982ec9a527a7947171f921))
* **cdk:** update action for cdk deploy ([d957b6a](https://github.com/briancaffey/django-step-by-step/commit/d957b6a8d91f2acb701b9aa5b392896014f134dd))
* **cdk:** update action for cdk deploy ([c85195d](https://github.com/briancaffey/django-step-by-step/commit/c85195decc93511a9fd5c7a4668580b36db5ac2c))
* **cdk:** update action for cdk deploy ([7d30190](https://github.com/briancaffey/django-step-by-step/commit/7d301903b7c7209cb54808b1b3493115f87500ed))
* **cdk:** update action for cdk deploy ([128e334](https://github.com/briancaffey/django-step-by-step/commit/128e33417687bd3dc743999dc98a8ba473b8ef81))
* **cdk:** update action for cdk deploy ([15d6b12](https://github.com/briancaffey/django-step-by-step/commit/15d6b1287d4b08d1c92ff46477a7b8317eae8419))
* **cdk:** upgrade version of cdk-django used in iac cdk program that uses cdk-django ([6467c37](https://github.com/briancaffey/django-step-by-step/commit/6467c3718730f90c99ef5c07acc7d7df34a8e713))
* **chat:** add placeholder for chats page ([342ff17](https://github.com/briancaffey/django-step-by-step/commit/342ff1789e2b3d59d799e994887ef6b9be9f6e41))
* **chat:** add skeleton chat page in quasar app ([dcfe4db](https://github.com/briancaffey/django-step-by-step/commit/dcfe4db68850efc2e4253c4aa1c804ba5e7c4f5e))
* **chat:** complete basic functionality for llm chat ([2f13e55](https://github.com/briancaffey/django-step-by-step/commit/2f13e559ab4f0e5160d10021db3eded7cc316f65))
* **chat:** finish basic requirements of chat feature ([7a40616](https://github.com/briancaffey/django-step-by-step/commit/7a4061604249b72dc9706b8953ed597214dd8a85))
* **chat:** improvements and fixes for chat ui ([b3748ba](https://github.com/briancaffey/django-step-by-step/commit/b3748ba13e4002d1536d5c54ddef1f288e3bf9e0))
* **chat:** WIP add django and quasar logic for integrating a simple chat interface with llamaindex and openai ([c03bc92](https://github.com/briancaffey/django-step-by-step/commit/c03bc923dbd4df0a45ba092bc21b282a21f0a0d2))
* **ci:** update versions for ci ([#40](https://github.com/briancaffey/django-step-by-step/issues/40)) ([f778d60](https://github.com/briancaffey/django-step-by-step/commit/f778d6041df577c88361fbdd0c1cb6ba46dfc75f))
* **cli:** update cli command ([a8108e9](https://github.com/briancaffey/django-step-by-step/commit/a8108e970bff1e51a4b496ebcf0fcc57a14a0105))
* **dark:** fix issues with dark mode in tailwind ([2e17745](https://github.com/briancaffey/django-step-by-step/commit/2e1774549e099a178ddb2c879216499b7f3d26f1))
* **dark:** fix issues with textarea tailwind classes when using dark mode ([a6d5862](https://github.com/briancaffey/django-step-by-step/commit/a6d586228dbb2b5a8a992c04fad2f90d97edea66))
* **db:** fix db connection for create database command ([6183b9a](https://github.com/briancaffey/django-step-by-step/commit/6183b9af0bc625299c863661bc8421f2aca50107))
* **dependencies:** upgrade python dependencies ([5864c93](https://github.com/briancaffey/django-step-by-step/commit/5864c9371d9ab94b03458c1d1271ccc5861ae366))
* **ecs:** add complete run task action ([c4c3910](https://github.com/briancaffey/django-step-by-step/commit/c4c39101e1306abe96e7b8439a65ffed3ec4a153))
* **ecs:** add complete run task action ([1917d20](https://github.com/briancaffey/django-step-by-step/commit/1917d2041159609880a3d09144a4d04f104a2354))
* **ecs:** add complete run task action ([8d7e64b](https://github.com/briancaffey/django-step-by-step/commit/8d7e64bc69f5399fb98bcae645becaa46c899958))
* **ecs:** add complete run task action ([fb614bb](https://github.com/briancaffey/django-step-by-step/commit/fb614bb78e788faa7c7b0c38802dd30f5f529fb1))
* **ecs:** add complete run task action ([643e8bb](https://github.com/briancaffey/django-step-by-step/commit/643e8bb4d50c1b4eb4180bb5374238b70b754784))
* **ecs:** add complete run task action ([7867bd1](https://github.com/briancaffey/django-step-by-step/commit/7867bd17c9147b07954c8050b3c83d488e98fcd0))
* **ecs:** add complete run task action ([5693d74](https://github.com/briancaffey/django-step-by-step/commit/5693d741292a8595aab3d765ebb56a56e6ec9d9e))
* **ecs:** add complete run task action ([601c47b](https://github.com/briancaffey/django-step-by-step/commit/601c47b7adfd41b913bf7817f42b64a77a3e078f))
* **gha:** add choices for gha inputs ([510d01e](https://github.com/briancaffey/django-step-by-step/commit/510d01ef34a92069c253384ed7e0e4117a24120f))
* **gha:** add container name env var ([0ee93dd](https://github.com/briancaffey/django-step-by-step/commit/0ee93ddd96e41aabe1e0d1cd2a3d4847bd7ea443))
* **gha:** add env vars to build step ([fe1f0b1](https://github.com/briancaffey/django-step-by-step/commit/fe1f0b1a92853e2c09b55a80c2774be31cf96b53))
* **gha:** add env vars to build step ([16e217e](https://github.com/briancaffey/django-step-by-step/commit/16e217e1b4bd5826eec7e30fc2371b3fbbe613ba))
* **gha:** add force ([e4ccb4f](https://github.com/briancaffey/django-step-by-step/commit/e4ccb4f7f99886bf14ba45ef80eb3061ab8664a0))
* **gha:** add main file ([1ca556e](https://github.com/briancaffey/django-step-by-step/commit/1ca556ef1d6d7099f4e19d5d68ba8af805fc8ce4))
* **gha:** add never require approval ([cc267f2](https://github.com/briancaffey/django-step-by-step/commit/cc267f248145198f70ca0d099a067843470e6aa6))
* **gha:** add never require approval ([35cc80a](https://github.com/briancaffey/django-step-by-step/commit/35cc80a7398789c25d4ebf509ac0c6bba090d0f9))
* **gha:** add tsc ([921d682](https://github.com/briancaffey/django-step-by-step/commit/921d682d08174c13b1e77435676be53be6de143f))
* **gha:** backend nginx ecr workflow ([0a3a56e](https://github.com/briancaffey/django-step-by-step/commit/0a3a56e0bcd66ccf5e6544a49fd6ecc152631c63))
* **gha:** cdk command params ([fa2bbab](https://github.com/briancaffey/django-step-by-step/commit/fa2bbab430991baea86d7c33f9fd54b31f06a21e))
* **gha:** fix app stack name ([d5d4944](https://github.com/briancaffey/django-step-by-step/commit/d5d4944bf2e9224db42069b9e9999799016c7e55))
* **gha:** fix app stack name ([1eb48e2](https://github.com/briancaffey/django-step-by-step/commit/1eb48e29c4eb2ed9458cf5d7fafa6ae63a47b062))
* **gha:** get exit code from run-task ([080e802](https://github.com/briancaffey/django-step-by-step/commit/080e80253842957e9d98aef186fc3b2e1cc0c4c0))
* **gha:** testing local composite actions ([8c9cd7c](https://github.com/briancaffey/django-step-by-step/commit/8c9cd7c92941b12e5a65b180c6b36ec047d64c74))
* **gha:** testing local composite actions ([499c495](https://github.com/briancaffey/django-step-by-step/commit/499c495db98e5f306d4d23eb4c75b482ff9853f8))
* **gha:** update github actions ([62fc255](https://github.com/briancaffey/django-step-by-step/commit/62fc255f2f035de94343269f6f38efae5cc7846c))
* **name:** fix be update ([c0c050b](https://github.com/briancaffey/django-step-by-step/commit/c0c050bf71d171c923c28b85f0c2095fc8c6c260))
* **name:** fix be update ([98ac36a](https://github.com/briancaffey/django-step-by-step/commit/98ac36a36d53959b9a7188553ed595e715fca3cf))
* **name:** update aname of backend update workflow ([7829198](https://github.com/briancaffey/django-step-by-step/commit/78291981902dd21c663465affa8376f97bfac812))
* **nuxt-auth:** WIP authentication with nuxt, composables and pinia ([874ed75](https://github.com/briancaffey/django-step-by-step/commit/874ed756446b6d02adf3e39c6b45c1841c4b737c))
* **nuxt:** standardize fetch calls with pluing, add dev and prod modes for nuxt app in docker compose ([66f556b](https://github.com/briancaffey/django-step-by-step/commit/66f556bff38e57ccaa282cb7eb511467de4606f5))
* **rds:** add updated ca bundle for rds connections ([d25b261](https://github.com/briancaffey/django-step-by-step/commit/d25b261360c7d1749893ecc2f376742aad528fb2))
* **rds:** fix rds password in production settings ([0ad006e](https://github.com/briancaffey/django-step-by-step/commit/0ad006e92e381272cdec2aa81b77257ac9263e8f))
* **release-please:** add release please for building git changelog ([79db239](https://github.com/briancaffey/django-step-by-step/commit/79db2394098a900a1efd8aa5f0047e5f592129ef))
* **s3:** add default acl ([527de34](https://github.com/briancaffey/django-step-by-step/commit/527de3464fcfea5dcc598f63870f8c5d876c66e6))
* **terraform:** update terraform ad-hoc base and deploy locally ([230744e](https://github.com/briancaffey/django-step-by-step/commit/230744eedce2f0957a55c726ea2a51e9bb425c10))
* **ui:** fixes for navigation and dark mode ([cb8b8a5](https://github.com/briancaffey/django-step-by-step/commit/cb8b8a5eac7e2c0ecdcedea299babcab31b9e07a))
* **update:** update versions of cdk deps ([7749e92](https://github.com/briancaffey/django-step-by-step/commit/7749e9240a6d1b458d67606ca717ee4c2870470a))
* **yarn:** upgrade dependencies in quasar project with yarn upgrade ([762ff5a](https://github.com/briancaffey/django-step-by-step/commit/762ff5a35a1f85875f49af8df47098c3f3af55b7))


### Bug Fixes

* **aws:** log group name ([09605cf](https://github.com/briancaffey/django-step-by-step/commit/09605cfd42c3fff03bdcfe56d5b087c4a6007db3))
* **import:** fix import path ([7fd6f2a](https://github.com/briancaffey/django-step-by-step/commit/7fd6f2a8318388d52de3ae75d17c7e8eed542d99))
* **import:** fix import path ([317f9b6](https://github.com/briancaffey/django-step-by-step/commit/317f9b69200bbb023908bcbbb96ca904a5218431))
* **import:** fix import path ([f3c4cc9](https://github.com/briancaffey/django-step-by-step/commit/f3c4cc9087a90420ace3d662234f54c3725c91b0))
* **lint:** format code with black ([18b11e9](https://github.com/briancaffey/django-step-by-step/commit/18b11e9c04f661f798e5b708df8dbb0c39c41a65))
* **linting:** format code with black ([bbdc934](https://github.com/briancaffey/django-step-by-step/commit/bbdc934641c87855e41ee70e083edd70dcced3e0))
* **typo:** log group name ([a54a7c4](https://github.com/briancaffey/django-step-by-step/commit/a54a7c453b8e4b229483304ce32b7bebf9efe147))
