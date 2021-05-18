# Setup minikube on M1 Macs

https://mirairo.net/minikube-on-m1/

$ minikube start --driver=docker --alsologtostderr
I0518 00:15:41.224360   12869 out.go:291] Setting OutFile to fd 1 ...
I0518 00:15:41.224649   12869 out.go:343] isatty.IsTerminal(1) = true
I0518 00:15:41.224655   12869 out.go:304] Setting ErrFile to fd 2...
I0518 00:15:41.224659   12869 out.go:343] isatty.IsTerminal(2) = true
I0518 00:15:41.224894   12869 root.go:316] Updating PATH: /Users/brian/.minikube/bin
W0518 00:15:41.224989   12869 root.go:291] Error reading config file at /Users/brian/.minikube/config/config.json: open /Users/brian/.minikube/config/config.json: no such file or directory
I0518 00:15:41.227860   12869 out.go:298] Setting JSON to false
I0518 00:15:41.279824   12869 start.go:108] hostinfo: {"hostname":"Brians-MacBook-Pro.local","uptime":181993,"bootTime":1621129348,"procs":463,"os":"darwin","platform":"darwin","platformFamily":"Standalone Workstation","platformVersion":"11.2.3","kernelVersion":"20.3.0","kernelArch":"arm64","virtualizationSystem":"","virtualizationRole":"","hostId":"9fe8c0da-8ed0-381c-9cec-2a779f3e1503"}
W0518 00:15:41.279940   12869 start.go:116] gopshost.Virtualization returned error: not implemented yet
I0518 00:15:41.298860   12869 out.go:170] 😄  minikube v1.20.0 on Darwin 11.2.3 (arm64)
😄  minikube v1.20.0 on Darwin 11.2.3 (arm64)
I0518 00:15:41.299197   12869 notify.go:169] Checking for updates...
I0518 00:15:41.302055   12869 driver.go:322] Setting default libvirt URI to qemu:///system
I0518 00:15:41.578615   12869 docker.go:119] docker version: linux-20.10.6
I0518 00:15:41.579252   12869 cli_runner.go:115] Run: docker system info --format "{{json .}}"
I0518 00:15:42.041930   12869 info.go:261] docker info: {ID:BPX4:LYFY:YQD7:TE3Y:S3ZH:AVF4:CVAM:ZR37:O2XV:V5GK:N2WO:3CD5 Containers:2 ContainersRunning:0 ContainersPaused:0 ContainersStopped:2 Images:10 Driver:overlay2 DriverStatus:[[Backing Filesystem extfs] [Supports d_type true] [Native Overlay Diff true] [userxattr false]] SystemStatus:<nil> Plugins:{Volume:[local] Network:[bridge host ipvlan macvlan null overlay] Authorization:<nil> Log:[awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog]} MemoryLimit:true SwapLimit:true KernelMemory:true KernelMemoryTCP:true CPUCfsPeriod:true CPUCfsQuota:true CPUShares:true CPUSet:true PidsLimit:true IPv4Forwarding:true BridgeNfIptables:true BridgeNfIP6Tables:true Debug:false NFd:43 OomKillDisable:true NGoroutines:47 SystemTime:2021-05-18 04:15:41.681201876 +0000 UTC LoggingDriver:json-file CgroupDriver:cgroupfs NEventsListener:3 KernelVersion:5.10.25-linuxkit OperatingSystem:Docker Desktop OSType:linux Architecture:aarch64 IndexServerAddress:https://index.docker.io/v1/ RegistryConfig:{AllowNondistributableArtifactsCIDRs:[] AllowNondistributableArtifactsHostnames:[] InsecureRegistryCIDRs:[127.0.0.0/8] IndexConfigs:{DockerIo:{Name:docker.io Mirrors:[] Secure:true Official:true}} Mirrors:[]} NCPU:4 MemTotal:2085613568 GenericResources:<nil> DockerRootDir:/var/lib/docker HTTPProxy:http.docker.internal:3128 HTTPSProxy:http.docker.internal:3128 NoProxy: Name:docker-desktop Labels:[] ExperimentalBuild:false ServerVersion:20.10.6 ClusterStore: ClusterAdvertise: Runtimes:{Runc:{Path:runc}} DefaultRuntime:runc Swarm:{NodeID: NodeAddr: LocalNodeState:inactive ControlAvailable:false Error: RemoteManagers:<nil>} LiveRestoreEnabled:false Isolation: InitBinary:docker-init ContainerdCommit:{ID:05f951a3781f4f2c1911b05e61c160e9c30eaa8e Expected:05f951a3781f4f2c1911b05e61c160e9c30eaa8e} RuncCommit:{ID:12644e614e25b05da6fd08a38ffa0cfe1903fdec Expected:12644e614e25b05da6fd08a38ffa0cfe1903fdec} InitCommit:{ID:de40ad0 Expected:de40ad0} SecurityOptions:[name=seccomp,profile=default] ProductLicense: Warnings:<nil> ServerErrors:[] ClientInfo:{Debug:false Plugins:[map[Experimental:true Name:app Path:/usr/local/lib/docker/cli-plugins/docker-app SchemaVersion:0.1.0 ShortDescription:Docker App Vendor:Docker Inc. Version:v0.9.1-beta3] map[Name:buildx Path:/usr/local/lib/docker/cli-plugins/docker-buildx SchemaVersion:0.1.0 ShortDescription:Build with BuildKit Vendor:Docker Inc. Version:v0.5.1-docker] map[Name:compose Path:/usr/local/lib/docker/cli-plugins/docker-compose SchemaVersion:0.1.0 ShortDescription:Docker Compose Vendor:Docker Inc. Version:2.0.0-beta.1] map[Name:scan Path:/usr/local/lib/docker/cli-plugins/docker-scan SchemaVersion:0.1.0 ShortDescription:Docker Scan Vendor:Docker Inc. Version:v0.8.0]] Warnings:<nil>}}
I0518 00:15:42.059794   12869 out.go:170] ✨  Using the docker driver based on user configuration
✨  Using the docker driver based on user configuration
I0518 00:15:42.060013   12869 start.go:276] selected driver: docker
I0518 00:15:42.060019   12869 start.go:718] validating driver "docker" against <nil>
I0518 00:15:42.060034   12869 start.go:729] status for docker: {Installed:true Healthy:true Running:false NeedsImprovement:false Error:<nil> Reason: Fix: Doc:}
I0518 00:15:42.060366   12869 cli_runner.go:115] Run: docker system info --format "{{json .}}"
I0518 00:15:42.260671   12869 info.go:261] docker info: {ID:BPX4:LYFY:YQD7:TE3Y:S3ZH:AVF4:CVAM:ZR37:O2XV:V5GK:N2WO:3CD5 Containers:2 ContainersRunning:0 ContainersPaused:0 ContainersStopped:2 Images:10 Driver:overlay2 DriverStatus:[[Backing Filesystem extfs] [Supports d_type true] [Native Overlay Diff true] [userxattr false]] SystemStatus:<nil> Plugins:{Volume:[local] Network:[bridge host ipvlan macvlan null overlay] Authorization:<nil> Log:[awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog]} MemoryLimit:true SwapLimit:true KernelMemory:true KernelMemoryTCP:true CPUCfsPeriod:true CPUCfsQuota:true CPUShares:true CPUSet:true PidsLimit:true IPv4Forwarding:true BridgeNfIptables:true BridgeNfIP6Tables:true Debug:false NFd:43 OomKillDisable:true NGoroutines:47 SystemTime:2021-05-18 04:15:42.161304251 +0000 UTC LoggingDriver:json-file CgroupDriver:cgroupfs NEventsListener:3 KernelVersion:5.10.25-linuxkit OperatingSystem:Docker Desktop OSType:linux Architecture:aarch64 IndexServerAddress:https://index.docker.io/v1/ RegistryConfig:{AllowNondistributableArtifactsCIDRs:[] AllowNondistributableArtifactsHostnames:[] InsecureRegistryCIDRs:[127.0.0.0/8] IndexConfigs:{DockerIo:{Name:docker.io Mirrors:[] Secure:true Official:true}} Mirrors:[]} NCPU:4 MemTotal:2085613568 GenericResources:<nil> DockerRootDir:/var/lib/docker HTTPProxy:http.docker.internal:3128 HTTPSProxy:http.docker.internal:3128 NoProxy: Name:docker-desktop Labels:[] ExperimentalBuild:false ServerVersion:20.10.6 ClusterStore: ClusterAdvertise: Runtimes:{Runc:{Path:runc}} DefaultRuntime:runc Swarm:{NodeID: NodeAddr: LocalNodeState:inactive ControlAvailable:false Error: RemoteManagers:<nil>} LiveRestoreEnabled:false Isolation: InitBinary:docker-init ContainerdCommit:{ID:05f951a3781f4f2c1911b05e61c160e9c30eaa8e Expected:05f951a3781f4f2c1911b05e61c160e9c30eaa8e} RuncCommit:{ID:12644e614e25b05da6fd08a38ffa0cfe1903fdec Expected:12644e614e25b05da6fd08a38ffa0cfe1903fdec} InitCommit:{ID:de40ad0 Expected:de40ad0} SecurityOptions:[name=seccomp,profile=default] ProductLicense: Warnings:<nil> ServerErrors:[] ClientInfo:{Debug:false Plugins:[map[Experimental:true Name:app Path:/usr/local/lib/docker/cli-plugins/docker-app SchemaVersion:0.1.0 ShortDescription:Docker App Vendor:Docker Inc. Version:v0.9.1-beta3] map[Name:buildx Path:/usr/local/lib/docker/cli-plugins/docker-buildx SchemaVersion:0.1.0 ShortDescription:Build with BuildKit Vendor:Docker Inc. Version:v0.5.1-docker] map[Name:compose Path:/usr/local/lib/docker/cli-plugins/docker-compose SchemaVersion:0.1.0 ShortDescription:Docker Compose Vendor:Docker Inc. Version:2.0.0-beta.1] map[Name:scan Path:/usr/local/lib/docker/cli-plugins/docker-scan SchemaVersion:0.1.0 ShortDescription:Docker Scan Vendor:Docker Inc. Version:v0.8.0]] Warnings:<nil>}}
I0518 00:15:42.261272   12869 start_flags.go:259] no existing cluster config was found, will generate one from the flags 
W0518 00:15:42.261822   12869 info.go:50] Unable to get CPU info: no such file or directory
W0518 00:15:42.283124   12869 start.go:881] could not get system cpu info while verifying memory limits, which might be okay: no such file or directory
W0518 00:15:42.283176   12869 info.go:50] Unable to get CPU info: no such file or directory
W0518 00:15:42.283179   12869 start.go:881] could not get system cpu info while verifying memory limits, which might be okay: no such file or directory
I0518 00:15:42.283201   12869 start_flags.go:314] Using suggested 1988MB memory alloc based on sys=8192MB, container=1988MB
I0518 00:15:42.283292   12869 start_flags.go:715] Wait components to verify : map[apiserver:true system_pods:true]
I0518 00:15:42.283316   12869 cni.go:93] Creating CNI manager for ""
I0518 00:15:42.283331   12869 cni.go:167] CNI unnecessary in this configuration, recommending no CNI
I0518 00:15:42.283334   12869 start_flags.go:273] config:
{Name:minikube KeepContext:false EmbedCerts:false MinikubeISO: KicBaseImage:gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e Memory:1988 CPUs:2 DiskSize:20000 VMDriver: Driver:docker HyperkitVpnKitSock: HyperkitVSockPorts:[] DockerEnv:[] ContainerVolumeMounts:[] InsecureRegistry:[] RegistryMirror:[] HostOnlyCIDR:192.168.99.1/24 HypervVirtualSwitch: HypervUseExternalSwitch:false HypervExternalAdapter: KVMNetwork:default KVMQemuURI:qemu:///system KVMGPU:false KVMHidden:false KVMNUMACount:1 DockerOpt:[] DisableDriverMounts:false NFSShare:[] NFSSharesRoot:/nfsshares UUID: NoVTXCheck:false DNSProxy:false HostDNSResolver:true HostOnlyNicType:virtio NatNicType:virtio SSHIPAddress: SSHUser:root SSHKey: SSHPort:22 KubernetesConfig:{KubernetesVersion:v1.20.2 ClusterName:minikube Namespace:default APIServerName:minikubeCA APIServerNames:[] APIServerIPs:[] DNSDomain:cluster.local ContainerRuntime:docker CRISocket: NetworkPlugin: FeatureGates: ServiceCIDR:10.96.0.0/12 ImageRepository: LoadBalancerStartIP: LoadBalancerEndIP: CustomIngressCert: ExtraOptions:[] ShouldLoadCachedImages:true EnableDefaultCNI:false CNI: NodeIP: NodePort:8443 NodeName:} Nodes:[] Addons:map[] VerifyComponents:map[apiserver:true system_pods:true] StartHostTimeout:6m0s ScheduledStop:<nil> ExposedPorts:[] ListenAddress: Network: MultiNodeRequested:false}
I0518 00:15:42.302303   12869 out.go:170] 👍  Starting control plane node minikube in cluster minikube
👍  Starting control plane node minikube in cluster minikube
I0518 00:15:42.302375   12869 cache.go:111] Beginning downloading kic base image for docker with docker
W0518 00:15:42.302394   12869 out.go:424] no arguments passed for "🚜  Pulling base image ...\n" - returning raw string
W0518 00:15:42.302405   12869 out.go:424] no arguments passed for "🚜  Pulling base image ...\n" - returning raw string
I0518 00:15:42.355255   12869 out.go:170] 🚜  Pulling base image ...
🚜  Pulling base image ...
I0518 00:15:42.355468   12869 preload.go:98] Checking if preload exists for k8s version v1.20.2 and runtime docker
I0518 00:15:42.355546   12869 image.go:116] Checking for gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e in local cache directory
I0518 00:15:42.355580   12869 cache.go:134] Downloading gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e to local cache
I0518 00:15:42.355686   12869 image.go:192] Writing gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e to local cache
I0518 00:15:43.811923   12869 preload.go:123] Found remote preload: https://storage.googleapis.com/minikube-preloaded-volume-tarballs/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4
I0518 00:15:43.811949   12869 cache.go:54] Caching tarball of preloaded images
I0518 00:15:43.811981   12869 preload.go:98] Checking if preload exists for k8s version v1.20.2 and runtime docker
I0518 00:15:43.877781   12869 preload.go:123] Found remote preload: https://storage.googleapis.com/minikube-preloaded-volume-tarballs/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4
I0518 00:15:43.913271   12869 out.go:170] 💾  Downloading Kubernetes v1.20.2 preload ...
💾  Downloading Kubernetes v1.20.2 preload ...
I0518 00:15:43.913342   12869 preload.go:196] getting checksum for preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4 ...
    > gcr.io/k8s-minikube/kicbase...: 370.39 KiB / 324.66 MiB  0.11% 614.81 KiBI0518 00:15:46.792547   12869 download.go:78] Downloading: https://storage.googleapis.com/minikube-preloaded-volume-tarballs/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4?checksum=md5:ab4f9db9ceb7b68051bff97068bae118 -> /Users/brian/.minikube/cache/preloaded-tarball/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4
    > gcr.io/k8s-minikube/kicbase...: 324.66 MiB / 324.66 MiB  100.00% 1.03 MiB
I0518 00:21:01.242554   12869 cache.go:137] successfully saved gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e as a tarball
I0518 00:21:01.242693   12869 image.go:130] Checking for gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e in local docker daemon
    > preloaded-images-k8s-v10-v1...: 441.17 MiB / 514.95 MiB  85.67% 1.74 MiB I0518 00:21:01.502435   12869 cache.go:160] Downloading gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e to local daemon
I0518 00:21:01.502483   12869 image.go:250] Writing gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e to local daemon
    > preloaded-images-k8s-v10-v1...: 514.95 MiB / 514.95 MiB  100.00% 1.47 MiB
    > gcr.io/k8s-minikube/kicbase...: 23.21 MiB / 324.66 MiB  7.15% 615.78 KiB I0518 00:21:44.233100   12869 preload.go:206] saving checksum for preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4 ...
    > gcr.io/k8s-minikube/kicbase...: 27.14 MiB / 324.66 MiB  8.36% 726.89 KiB I0518 00:21:48.002162   12869 preload.go:218] verifying checksumm of /Users/brian/.minikube/cache/preloaded-tarball/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4 ...
    > gcr.io/k8s-minikube/kicbase...: 28.70 MiB / 324.66 MiB  8.84% 851.83 KiB I0518 00:21:49.120552   12869 cache.go:57] Finished verifying existence of preloaded tar for  v1.20.2 on docker
I0518 00:21:49.122551   12869 profile.go:148] Saving config to /Users/brian/.minikube/profiles/minikube/config.json ...
I0518 00:21:49.122584   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/config.json: {Name:mk3779467fcc121bfedbc7b0a57f9b84bcafccb9 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
    > gcr.io/k8s-minikube/kicbase...: 324.66 MiB / 324.66 MiB  100.00% 1.67 MiB^[
I0518 00:24:17.040117   12869 cache.go:163] successfully downloaded gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e
I0518 00:24:17.040166   12869 cache.go:194] Successfully downloaded all kic artifacts
I0518 00:24:17.040768   12869 start.go:313] acquiring machines lock for minikube: {Name:mk5b0e48a007c7b0b6e7392099c3505f30517a3f Clock:{} Delay:500ms Timeout:10m0s Cancel:<nil>}
I0518 00:24:17.042412   12869 start.go:317] acquired machines lock for "minikube" in 1.436583ms
I0518 00:24:17.043025   12869 start.go:89] Provisioning new machine with config: &{Name:minikube KeepContext:false EmbedCerts:false MinikubeISO: KicBaseImage:gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e Memory:1988 CPUs:2 DiskSize:20000 VMDriver: Driver:docker HyperkitVpnKitSock: HyperkitVSockPorts:[] DockerEnv:[] ContainerVolumeMounts:[] InsecureRegistry:[] RegistryMirror:[] HostOnlyCIDR:192.168.99.1/24 HypervVirtualSwitch: HypervUseExternalSwitch:false HypervExternalAdapter: KVMNetwork:default KVMQemuURI:qemu:///system KVMGPU:false KVMHidden:false KVMNUMACount:1 DockerOpt:[] DisableDriverMounts:false NFSShare:[] NFSSharesRoot:/nfsshares UUID: NoVTXCheck:false DNSProxy:false HostDNSResolver:true HostOnlyNicType:virtio NatNicType:virtio SSHIPAddress: SSHUser:root SSHKey: SSHPort:22 KubernetesConfig:{KubernetesVersion:v1.20.2 ClusterName:minikube Namespace:default APIServerName:minikubeCA APIServerNames:[] APIServerIPs:[] DNSDomain:cluster.local ContainerRuntime:docker CRISocket: NetworkPlugin: FeatureGates: ServiceCIDR:10.96.0.0/12 ImageRepository: LoadBalancerStartIP: LoadBalancerEndIP: CustomIngressCert: ExtraOptions:[] ShouldLoadCachedImages:true EnableDefaultCNI:false CNI: NodeIP: NodePort:8443 NodeName:} Nodes:[{Name: IP: Port:8443 KubernetesVersion:v1.20.2 ControlPlane:true Worker:true}] Addons:map[] VerifyComponents:map[apiserver:true system_pods:true] StartHostTimeout:6m0s ScheduledStop:<nil> ExposedPorts:[] ListenAddress: Network: MultiNodeRequested:false} &{Name: IP: Port:8443 KubernetesVersion:v1.20.2 ControlPlane:true Worker:true}
I0518 00:24:17.043259   12869 start.go:126] createHost starting for "" (driver="docker")
I0518 00:24:17.061964   12869 out.go:197] 🔥  Creating docker container (CPUs=2, Memory=1988MB) ...
🔥  Creating docker container (CPUs=2, Memory=1988MB) ...| I0518 00:24:17.062476   12869 start.go:160] libmachine.API.Create for "minikube" (driver="docker")
I0518 00:24:17.062511   12869 client.go:168] LocalClient.Create starting
I0518 00:24:17.079334   12869 main.go:128] libmachine: Creating CA: /Users/brian/.minikube/certs/ca.pem
/ I0518 00:24:17.189595   12869 main.go:128] libmachine: Creating client certificate: /Users/brian/.minikube/certs/cert.pem
I0518 00:24:17.251984   12869 cli_runner.go:115] Run: docker network inspect minikube --format "{"Name": "{{.Name}}","Driver": "{{.Driver}}","Subnet": "{{range .IPAM.Config}}{{.Subnet}}{{end}}","Gateway": "{{range .IPAM.Config}}{{.Gateway}}{{end}}","MTU": {{if (index .Options "com.docker.network.driver.mtu")}}{{(index .Options "com.docker.network.driver.mtu")}}{{else}}0{{end}}, "ContainerIPs": [{{range $k,$v := .Containers }}"{{$v.IPv4Address}}",{{end}}]}"
| W0518 00:24:17.469507   12869 cli_runner.go:162] docker network inspect minikube --format "{"Name": "{{.Name}}","Driver": "{{.Driver}}","Subnet": "{{range .IPAM.Config}}{{.Subnet}}{{end}}","Gateway": "{{range .IPAM.Config}}{{.Gateway}}{{end}}","MTU": {{if (index .Options "com.docker.network.driver.mtu")}}{{(index .Options "com.docker.network.driver.mtu")}}{{else}}0{{end}}, "ContainerIPs": [{{range $k,$v := .Containers }}"{{$v.IPv4Address}}",{{end}}]}" returned with exit code 1
I0518 00:24:17.469895   12869 network_create.go:249] running [docker network inspect minikube] to gather additional debugging logs...
I0518 00:24:17.469930   12869 cli_runner.go:115] Run: docker network inspect minikube
/ W0518 00:24:17.578842   12869 cli_runner.go:162] docker network inspect minikube returned with exit code 1
I0518 00:24:17.578868   12869 network_create.go:252] error running [docker network inspect minikube]: docker network inspect minikube: exit status 1
stdout:
[]

stderr:
Error: No such network: minikube
I0518 00:24:17.578880   12869 network_create.go:254] output of [docker network inspect minikube]: -- stdout --
[]

-- /stdout --
** stderr ** 
Error: No such network: minikube

** /stderr **
I0518 00:24:17.578957   12869 cli_runner.go:115] Run: docker network inspect bridge --format "{"Name": "{{.Name}}","Driver": "{{.Driver}}","Subnet": "{{range .IPAM.Config}}{{.Subnet}}{{end}}","Gateway": "{{range .IPAM.Config}}{{.Gateway}}{{end}}","MTU": {{if (index .Options "com.docker.network.driver.mtu")}}{{(index .Options "com.docker.network.driver.mtu")}}{{else}}0{{end}}, "ContainerIPs": [{{range $k,$v := .Containers }}"{{$v.IPv4Address}}",{{end}}]}"
- I0518 00:24:17.693554   12869 network.go:263] reserving subnet 192.168.49.0 for 1m0s: &{mu:{state:0 sema:0} read:{v:{m:map[] amended:true}} dirty:map[192.168.49.0:0x14000aec008] misses:0}
I0518 00:24:17.693752   12869 network.go:210] using free private subnet 192.168.49.0/24: &{IP:192.168.49.0 Netmask:255.255.255.0 Prefix:24 CIDR:192.168.49.0/24 Gateway:192.168.49.1 ClientMin:192.168.49.2 ClientMax:192.168.49.254 Broadcast:192.168.49.255 Interface:{IfaceName: IfaceIPv4: IfaceMTU:0 IfaceMAC:}}
I0518 00:24:17.693769   12869 network_create.go:100] attempt to create docker network minikube 192.168.49.0/24 with gateway 192.168.49.1 and MTU of 1500 ...
I0518 00:24:17.693877   12869 cli_runner.go:115] Run: docker network create --driver=bridge --subnet=192.168.49.0/24 --gateway=192.168.49.1 -o --ip-masq -o --icc -o com.docker.network.driver.mtu=1500 --label=created_by.minikube.sigs.k8s.io=true minikube
| I0518 00:24:21.577092   12869 cli_runner.go:168] Completed: docker network create --driver=bridge --subnet=192.168.49.0/24 --gateway=192.168.49.1 -o --ip-masq -o --icc -o com.docker.network.driver.mtu=1500 --label=created_by.minikube.sigs.k8s.io=true minikube: (3.883204042s)
I0518 00:24:21.577363   12869 network_create.go:84] docker network minikube 192.168.49.0/24 created
I0518 00:24:21.577419   12869 kic.go:106] calculated static IP "192.168.49.2" for the "minikube" container
I0518 00:24:21.577557   12869 cli_runner.go:115] Run: docker ps -a --format {{.Names}}
- I0518 00:24:21.686991   12869 cli_runner.go:115] Run: docker volume create minikube --label name.minikube.sigs.k8s.io=minikube --label created_by.minikube.sigs.k8s.io=true
\ I0518 00:24:21.787331   12869 oci.go:102] Successfully created a docker volume minikube
I0518 00:24:21.787502   12869 cli_runner.go:115] Run: docker run --rm --name minikube-preload-sidecar --label created_by.minikube.sigs.k8s.io=true --label name.minikube.sigs.k8s.io=minikube --entrypoint /usr/bin/test -v minikube:/var gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e -d /var/lib
| I0518 00:24:22.376054   12869 oci.go:106] Successfully prepared a docker volume minikube
I0518 00:24:22.376133   12869 preload.go:98] Checking if preload exists for k8s version v1.20.2 and runtime docker
I0518 00:24:22.376171   12869 preload.go:106] Found local preload: /Users/brian/.minikube/cache/preloaded-tarball/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4
I0518 00:24:22.376175   12869 kic.go:179] Starting extracting preloaded images to volume ...
I0518 00:24:22.376193   12869 cli_runner.go:115] Run: docker info --format "'{{json .SecurityOptions}}'"
I0518 00:24:22.376239   12869 cli_runner.go:115] Run: docker run --rm --entrypoint /usr/bin/tar -v /Users/brian/.minikube/cache/preloaded-tarball/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4:/preloaded.tar:ro -v minikube:/extractDir gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e -I lz4 -xf /preloaded.tar -C /extractDir
\ I0518 00:24:23.023112   12869 cli_runner.go:115] Run: docker run -d -t --privileged --security-opt seccomp=unconfined --tmpfs /tmp --tmpfs /run -v /lib/modules:/lib/modules:ro --hostname minikube --name minikube --label created_by.minikube.sigs.k8s.io=true --label name.minikube.sigs.k8s.io=minikube --label role.minikube.sigs.k8s.io= --label mode.minikube.sigs.k8s.io=minikube --network minikube --ip 192.168.49.2 --volume minikube:/var --security-opt apparmor=unconfined --memory=1988mb --memory-swap=1988mb --cpus=2 -e container=docker --expose 8443 --publish=127.0.0.1::8443 --publish=127.0.0.1::22 --publish=127.0.0.1::2376 --publish=127.0.0.1::5000 --publish=127.0.0.1::32443 gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e
- I0518 00:24:32.560721   12869 cli_runner.go:168] Completed: docker run -d -t --privileged --security-opt seccomp=unconfined --tmpfs /tmp --tmpfs /run -v /lib/modules:/lib/modules:ro --hostname minikube --name minikube --label created_by.minikube.sigs.k8s.io=true --label name.minikube.sigs.k8s.io=minikube --label role.minikube.sigs.k8s.io= --label mode.minikube.sigs.k8s.io=minikube --network minikube --ip 192.168.49.2 --volume minikube:/var --security-opt apparmor=unconfined --memory=1988mb --memory-swap=1988mb --cpus=2 -e container=docker --expose 8443 --publish=127.0.0.1::8443 --publish=127.0.0.1::22 --publish=127.0.0.1::2376 --publish=127.0.0.1::5000 --publish=127.0.0.1::32443 gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e: (9.537548208s)
I0518 00:24:32.560928   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Running}}
\ I0518 00:24:32.704983   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Status}}
/ I0518 00:24:32.829195   12869 cli_runner.go:115] Run: docker exec minikube stat /var/lib/dpkg/alternatives/iptables
\ I0518 00:24:33.044413   12869 oci.go:278] the created container "minikube" has a running status.
I0518 00:24:33.044464   12869 kic.go:210] Creating ssh key for kic: /Users/brian/.minikube/machines/minikube/id_rsa...
I0518 00:24:33.107434   12869 kic_runner.go:188] docker (temp): /Users/brian/.minikube/machines/minikube/id_rsa.pub --> /home/docker/.ssh/authorized_keys (381 bytes)
- I0518 00:24:33.350640   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Status}}
\ I0518 00:24:33.466058   12869 kic_runner.go:94] Run: chown docker:docker /home/docker/.ssh/authorized_keys
I0518 00:24:33.466078   12869 kic_runner.go:115] Args: [docker exec --privileged minikube chown docker:docker /home/docker/.ssh/authorized_keys]
/ I0518 00:24:38.549660   12869 cli_runner.go:168] Completed: docker run --rm --entrypoint /usr/bin/tar -v /Users/brian/.minikube/cache/preloaded-tarball/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4:/preloaded.tar:ro -v minikube:/extractDir gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e -I lz4 -xf /preloaded.tar -C /extractDir: (16.173467958s)
I0518 00:24:38.549681   12869 kic.go:188] duration metric: took 16.173599 seconds to extract preloaded images to volume
I0518 00:24:38.549808   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Status}}
- I0518 00:24:38.651744   12869 machine.go:88] provisioning docker machine ...
I0518 00:24:38.651791   12869 ubuntu.go:169] provisioning hostname "minikube"
I0518 00:24:38.652102   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
\ I0518 00:24:38.754167   12869 main.go:128] libmachine: Using SSH client type: native
I0518 00:24:38.754825   12869 main.go:128] libmachine: &{{{<nil> 0 [] [] []} docker [0x104b49560] 0x104b49530 <nil>  [] 0s} 127.0.0.1 62622 <nil> <nil>}
I0518 00:24:38.754834   12869 main.go:128] libmachine: About to run SSH command:
sudo hostname minikube && echo "minikube" | sudo tee /etc/hostname
| I0518 00:24:38.881366   12869 main.go:128] libmachine: SSH cmd err, output: <nil>: minikube

I0518 00:24:38.881511   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
/ I0518 00:24:38.983337   12869 main.go:128] libmachine: Using SSH client type: native
I0518 00:24:38.983484   12869 main.go:128] libmachine: &{{{<nil> 0 [] [] []} docker [0x104b49560] 0x104b49530 <nil>  [] 0s} 127.0.0.1 62622 <nil> <nil>}
I0518 00:24:38.983500   12869 main.go:128] libmachine: About to run SSH command:

                if ! grep -xq '.*\sminikube' /etc/hosts; then
                        if grep -xq '127.0.1.1\s.*' /etc/hosts; then
                                sudo sed -i 's/^127.0.1.1\s.*/127.0.1.1 minikube/g' /etc/hosts;
                        else 
                                echo '127.0.1.1 minikube' | sudo tee -a /etc/hosts; 
                        fi
                fi
- I0518 00:24:39.091150   12869 main.go:128] libmachine: SSH cmd err, output: <nil>: 
I0518 00:24:39.091167   12869 ubuntu.go:175] set auth options {CertDir:/Users/brian/.minikube CaCertPath:/Users/brian/.minikube/certs/ca.pem CaPrivateKeyPath:/Users/brian/.minikube/certs/ca-key.pem CaCertRemotePath:/etc/docker/ca.pem ServerCertPath:/Users/brian/.minikube/machines/server.pem ServerKeyPath:/Users/brian/.minikube/machines/server-key.pem ClientKeyPath:/Users/brian/.minikube/certs/key.pem ServerCertRemotePath:/etc/docker/server.pem ServerKeyRemotePath:/etc/docker/server-key.pem ClientCertPath:/Users/brian/.minikube/certs/cert.pem ServerCertSANs:[] StorePath:/Users/brian/.minikube}
I0518 00:24:39.091183   12869 ubuntu.go:177] setting up certificates
I0518 00:24:39.091188   12869 provision.go:83] configureAuth start
I0518 00:24:39.091296   12869 cli_runner.go:115] Run: docker container inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}},{{.GlobalIPv6Address}}{{end}}" minikube
\ I0518 00:24:39.190575   12869 provision.go:137] copyHostCerts
I0518 00:24:39.190660   12869 exec_runner.go:152] cp: /Users/brian/.minikube/certs/ca.pem --> /Users/brian/.minikube/ca.pem (1074 bytes)
I0518 00:24:39.190951   12869 exec_runner.go:152] cp: /Users/brian/.minikube/certs/cert.pem --> /Users/brian/.minikube/cert.pem (1119 bytes)
I0518 00:24:39.191176   12869 exec_runner.go:152] cp: /Users/brian/.minikube/certs/key.pem --> /Users/brian/.minikube/key.pem (1679 bytes)
I0518 00:24:39.191285   12869 provision.go:111] generating server cert: /Users/brian/.minikube/machines/server.pem ca-key=/Users/brian/.minikube/certs/ca.pem private-key=/Users/brian/.minikube/certs/ca-key.pem org=brian.minikube san=[192.168.49.2 127.0.0.1 localhost 127.0.0.1 minikube minikube]
| I0518 00:24:39.332929   12869 provision.go:165] copyRemoteCerts
I0518 00:24:39.333886   12869 ssh_runner.go:149] Run: sudo mkdir -p /etc/docker /etc/docker /etc/docker
I0518 00:24:39.333941   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
/ I0518 00:24:39.436633   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
- I0518 00:24:39.518985   12869 ssh_runner.go:316] scp /Users/brian/.minikube/certs/ca.pem --> /etc/docker/ca.pem (1074 bytes)
I0518 00:24:39.536744   12869 ssh_runner.go:316] scp /Users/brian/.minikube/machines/server.pem --> /etc/docker/server.pem (1196 bytes)
I0518 00:24:39.551576   12869 ssh_runner.go:316] scp /Users/brian/.minikube/machines/server-key.pem --> /etc/docker/server-key.pem (1679 bytes)
\ I0518 00:24:39.567999   12869 provision.go:86] duration metric: configureAuth took 476.803416ms
I0518 00:24:39.568021   12869 ubuntu.go:193] setting minikube options for container-runtime
I0518 00:24:39.568479   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
| I0518 00:24:39.671994   12869 main.go:128] libmachine: Using SSH client type: native
I0518 00:24:39.672179   12869 main.go:128] libmachine: &{{{<nil> 0 [] [] []} docker [0x104b49560] 0x104b49530 <nil>  [] 0s} 127.0.0.1 62622 <nil> <nil>}
I0518 00:24:39.672184   12869 main.go:128] libmachine: About to run SSH command:
df --output=fstype / | tail -n 1
/ I0518 00:24:39.781518   12869 main.go:128] libmachine: SSH cmd err, output: <nil>: overlay

I0518 00:24:39.781540   12869 ubuntu.go:71] root file system type: overlay
I0518 00:24:39.781648   12869 provision.go:296] Updating docker unit: /lib/systemd/system/docker.service ...
I0518 00:24:39.781740   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
- I0518 00:24:39.882526   12869 main.go:128] libmachine: Using SSH client type: native
I0518 00:24:39.882693   12869 main.go:128] libmachine: &{{{<nil> 0 [] [] []} docker [0x104b49560] 0x104b49530 <nil>  [] 0s} 127.0.0.1 62622 <nil> <nil>}
I0518 00:24:39.882743   12869 main.go:128] libmachine: About to run SSH command:
sudo mkdir -p /lib/systemd/system && printf %s "[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
BindsTo=containerd.service
After=network-online.target firewalld.service containerd.service
Wants=network-online.target
Requires=docker.socket
StartLimitBurst=3
StartLimitIntervalSec=60

[Service]
Type=notify
Restart=on-failure



# This file is a systemd drop-in unit that inherits from the base dockerd configuration.
# The base configuration already specifies an 'ExecStart=...' command. The first directive
# here is to clear out that command inherited from the base configuration. Without this,
# the command from the base configuration and the command specified here are treated as
# a sequence of commands, which is not the desired behavior, nor is it valid -- systemd
# will catch this invalid input and refuse to start the service with an error like:
#  Service has more than one ExecStart= setting, which is only allowed for Type=oneshot services.

# NOTE: default-ulimit=nofile is set to an arbitrary number for consistency with other
# container runtimes. If left unlimited, it may result in OOM issues with MySQL.
ExecStart=
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock --default-ulimit=nofile=1048576:1048576 --tlsverify --tlscacert /etc/docker/ca.pem --tlscert /etc/docker/server.pem --tlskey /etc/docker/server-key.pem --label provider=docker --insecure-registry 10.96.0.0/12 
ExecReload=/bin/kill -s HUP \$MAINPID

# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity

# Uncomment TasksMax if your systemd version supports it.
# Only systemd 226 and above support this version.
TasksMax=infinity
TimeoutStartSec=0

# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes

# kill only the docker process, not all processes in the cgroup
KillMode=process

[Install]
WantedBy=multi-user.target
" | sudo tee /lib/systemd/system/docker.service.new
\ I0518 00:24:39.998386   12869 main.go:128] libmachine: SSH cmd err, output: <nil>: [Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
BindsTo=containerd.service
After=network-online.target firewalld.service containerd.service
Wants=network-online.target
Requires=docker.socket
StartLimitBurst=3
StartLimitIntervalSec=60

[Service]
Type=notify
Restart=on-failure



# This file is a systemd drop-in unit that inherits from the base dockerd configuration.
# The base configuration already specifies an 'ExecStart=...' command. The first directive
# here is to clear out that command inherited from the base configuration. Without this,
# the command from the base configuration and the command specified here are treated as
# a sequence of commands, which is not the desired behavior, nor is it valid -- systemd
# will catch this invalid input and refuse to start the service with an error like:
#  Service has more than one ExecStart= setting, which is only allowed for Type=oneshot services.

# NOTE: default-ulimit=nofile is set to an arbitrary number for consistency with other
# container runtimes. If left unlimited, it may result in OOM issues with MySQL.
ExecStart=
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock --default-ulimit=nofile=1048576:1048576 --tlsverify --tlscacert /etc/docker/ca.pem --tlscert /etc/docker/server.pem --tlskey /etc/docker/server-key.pem --label provider=docker --insecure-registry 10.96.0.0/12 
ExecReload=/bin/kill -s HUP $MAINPID

# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity

# Uncomment TasksMax if your systemd version supports it.
# Only systemd 226 and above support this version.
TasksMax=infinity
TimeoutStartSec=0

# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes

# kill only the docker process, not all processes in the cgroup
KillMode=process

[Install]
WantedBy=multi-user.target

I0518 00:24:39.998717   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
| I0518 00:24:40.100149   12869 main.go:128] libmachine: Using SSH client type: native
I0518 00:24:40.100315   12869 main.go:128] libmachine: &{{{<nil> 0 [] [] []} docker [0x104b49560] 0x104b49530 <nil>  [] 0s} 127.0.0.1 62622 <nil> <nil>}
I0518 00:24:40.100325   12869 main.go:128] libmachine: About to run SSH command:
sudo diff -u /lib/systemd/system/docker.service /lib/systemd/system/docker.service.new || { sudo mv /lib/systemd/system/docker.service.new /lib/systemd/system/docker.service; sudo systemctl -f daemon-reload && sudo systemctl -f enable docker && sudo systemctl -f restart docker; }
- I0518 00:25:03.855795   12869 main.go:128] libmachine: SSH cmd err, output: <nil>: --- /lib/systemd/system/docker.service     2021-04-09 22:44:09.000000000 +0000
+++ /lib/systemd/system/docker.service.new      2021-05-18 04:24:39.996463000 +0000
@@ -1,30 +1,32 @@
 [Unit]
 Description=Docker Application Container Engine
 Documentation=https://docs.docker.com
+BindsTo=containerd.service
 After=network-online.target firewalld.service containerd.service
 Wants=network-online.target
-Requires=docker.socket containerd.service
+Requires=docker.socket
+StartLimitBurst=3
+StartLimitIntervalSec=60
 
 [Service]
 Type=notify
-# the default is not to use systemd for cgroups because the delegate issues still
-# exists and systemd currently does not support the cgroup feature set required
-# for containers run by docker
-ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
-ExecReload=/bin/kill -s HUP $MAINPID
-TimeoutSec=0
-RestartSec=2
-Restart=always
-
-# Note that StartLimit* options were moved from "Service" to "Unit" in systemd 229.
-# Both the old, and new location are accepted by systemd 229 and up, so using the old location
-# to make them work for either version of systemd.
-StartLimitBurst=3
+Restart=on-failure
 
-# Note that StartLimitInterval was renamed to StartLimitIntervalSec in systemd 230.
-# Both the old, and new name are accepted by systemd 230 and up, so using the old name to make
-# this option work for either version of systemd.
-StartLimitInterval=60s
+
+
+# This file is a systemd drop-in unit that inherits from the base dockerd configuration.
+# The base configuration already specifies an 'ExecStart=...' command. The first directive
+# here is to clear out that command inherited from the base configuration. Without this,
+# the command from the base configuration and the command specified here are treated as
+# a sequence of commands, which is not the desired behavior, nor is it valid -- systemd
+# will catch this invalid input and refuse to start the service with an error like:
+#  Service has more than one ExecStart= setting, which is only allowed for Type=oneshot services.
+
+# NOTE: default-ulimit=nofile is set to an arbitrary number for consistency with other
+# container runtimes. If left unlimited, it may result in OOM issues with MySQL.
+ExecStart=
+ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock --default-ulimit=nofile=1048576:1048576 --tlsverify --tlscacert /etc/docker/ca.pem --tlscert /etc/docker/server.pem --tlskey /etc/docker/server-key.pem --label provider=docker --insecure-registry 10.96.0.0/12 
+ExecReload=/bin/kill -s HUP $MAINPID
 
 # Having non-zero Limit*s causes performance problems due to accounting overhead
 # in the kernel. We recommend using cgroups to do container-local accounting.
@@ -32,16 +34,16 @@
 LimitNPROC=infinity
 LimitCORE=infinity
 
-# Comment TasksMax if your systemd version does not support it.
-# Only systemd 226 and above support this option.
+# Uncomment TasksMax if your systemd version supports it.
+# Only systemd 226 and above support this version.
 TasksMax=infinity
+TimeoutStartSec=0
 
 # set delegate yes so that systemd does not reset the cgroups of docker containers
 Delegate=yes
 
 # kill only the docker process, not all processes in the cgroup
 KillMode=process
-OOMScoreAdjust=-500
 
 [Install]
 WantedBy=multi-user.target
Synchronizing state of docker.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable docker

I0518 00:25:03.856937   12869 machine.go:91] provisioned docker machine in 25.205310875s
I0518 00:25:03.856961   12869 client.go:171] LocalClient.Create took 46.794713125s
I0518 00:25:03.856987   12869 start.go:168] duration metric: libmachine.API.Create for "minikube" took 46.794782334s
I0518 00:25:03.857001   12869 start.go:267] post-start starting for "minikube" (driver="docker")
I0518 00:25:03.857010   12869 start.go:277] creating required directories: [/etc/kubernetes/addons /etc/kubernetes/manifests /var/tmp/minikube /var/lib/minikube /var/lib/minikube/certs /var/lib/minikube/images /var/lib/minikube/binaries /tmp/gvisor /usr/share/ca-certificates /etc/ssl/certs]
I0518 00:25:03.858694   12869 ssh_runner.go:149] Run: sudo mkdir -p /etc/kubernetes/addons /etc/kubernetes/manifests /var/tmp/minikube /var/lib/minikube /var/lib/minikube/certs /var/lib/minikube/images /var/lib/minikube/binaries /tmp/gvisor /usr/share/ca-certificates /etc/ssl/certs
I0518 00:25:03.858825   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
\ I0518 00:25:03.964060   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
| I0518 00:25:04.046889   12869 ssh_runner.go:149] Run: cat /etc/os-release
I0518 00:25:04.051774   12869 main.go:128] libmachine: Couldn't set key PRIVACY_POLICY_URL, no corresponding struct field found
I0518 00:25:04.051790   12869 main.go:128] libmachine: Couldn't set key VERSION_CODENAME, no corresponding struct field found
I0518 00:25:04.051800   12869 main.go:128] libmachine: Couldn't set key UBUNTU_CODENAME, no corresponding struct field found
I0518 00:25:04.051804   12869 info.go:137] Remote host: Ubuntu 20.04.2 LTS
I0518 00:25:04.051812   12869 filesync.go:118] Scanning /Users/brian/.minikube/addons for local assets ...
I0518 00:25:04.052096   12869 filesync.go:118] Scanning /Users/brian/.minikube/files for local assets ...
I0518 00:25:04.052153   12869 start.go:270] post-start completed in 195.145583ms
I0518 00:25:04.052520   12869 cli_runner.go:115] Run: docker container inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}},{{.GlobalIPv6Address}}{{end}}" minikube
/ I0518 00:25:04.151948   12869 profile.go:148] Saving config to /Users/brian/.minikube/profiles/minikube/config.json ...
I0518 00:25:04.152493   12869 ssh_runner.go:149] Run: sh -c "df -h /var | awk 'NR==2{print $5}'"
I0518 00:25:04.152550   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
- I0518 00:25:04.249598   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
I0518 00:25:04.328270   12869 start.go:129] duration metric: createHost completed in 47.285263333s
I0518 00:25:04.328283   12869 start.go:80] releasing machines lock for "minikube", held for 47.286118667s
I0518 00:25:04.328388   12869 cli_runner.go:115] Run: docker container inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}},{{.GlobalIPv6Address}}{{end}}" minikube
\ I0518 00:25:04.425954   12869 ssh_runner.go:149] Run: curl -sS -m 2 https://k8s.gcr.io/
I0518 00:25:04.426054   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
I0518 00:25:04.428510   12869 ssh_runner.go:149] Run: systemctl --version
I0518 00:25:04.428571   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
| I0518 00:25:04.534140   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
I0518 00:25:04.534260   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
\ I0518 00:25:07.759136   12869 ssh_runner.go:189] Completed: systemctl --version: (3.330592667s)
I0518 00:25:07.759198   12869 ssh_runner.go:189] Completed: curl -sS -m 2 https://k8s.gcr.io/: (3.333223959s)
W0518 00:25:07.759857   12869 start.go:637] [curl -sS -m 2 https://k8s.gcr.io/] failed: curl -sS -m 2 https://k8s.gcr.io/: Process exited with status 28
stdout:

stderr:
curl: (28) Resolving timed out after 2006 milliseconds
I0518 00:25:07.760021   12869 ssh_runner.go:149] Run: sudo systemctl is-active --quiet service containerd
W0518 00:25:07.760381   12869 out.go:235] ❗  This container is having trouble accessing https://k8s.gcr.io

❗  This container is having trouble accessing https://k8s.gcr.io
W0518 00:25:07.760422   12869 out.go:424] no arguments passed for "💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/\n" - returning raw string
W0518 00:25:07.760455   12869 out.go:235] 💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
I0518 00:25:07.787067   12869 ssh_runner.go:149] Run: sudo systemctl cat docker.service
I0518 00:25:07.805033   12869 cruntime.go:225] skipping containerd shutdown because we are bound to it
I0518 00:25:07.805148   12869 ssh_runner.go:149] Run: sudo systemctl is-active --quiet service crio
I0518 00:25:07.816803   12869 ssh_runner.go:149] Run: /bin/bash -c "sudo mkdir -p /etc && printf %s "runtime-endpoint: unix:///var/run/dockershim.sock
image-endpoint: unix:///var/run/dockershim.sock
" | sudo tee /etc/crictl.yaml"
I0518 00:25:07.831244   12869 ssh_runner.go:149] Run: sudo systemctl unmask docker.service
I0518 00:25:07.885110   12869 ssh_runner.go:149] Run: sudo systemctl enable docker.socket
I0518 00:25:07.934629   12869 ssh_runner.go:149] Run: sudo systemctl cat docker.service
I0518 00:25:07.943392   12869 ssh_runner.go:149] Run: sudo systemctl daemon-reload
I0518 00:25:07.993435   12869 ssh_runner.go:149] Run: sudo systemctl start docker
I0518 00:25:08.003826   12869 ssh_runner.go:149] Run: docker version --format {{.Server.Version}}
I0518 00:25:08.152356   12869 out.go:197] 🐳  Preparing Kubernetes v1.20.2 on Docker 20.10.6 ...
🐳  Preparing Kubernetes v1.20.2 on Docker 20.10.6 ...| I0518 00:25:08.152646   12869 cli_runner.go:115] Run: docker exec -t minikube dig +short host.docker.internal
/ I0518 00:25:08.348661   12869 network.go:68] got host ip for mount in container by digging dns: 192.168.65.2
I0518 00:25:08.349834   12869 ssh_runner.go:149] Run: grep 192.168.65.2 host.minikube.internal$ /etc/hosts
I0518 00:25:08.355217   12869 ssh_runner.go:149] Run: /bin/bash -c "{ grep -v $'\thost.minikube.internal$' "/etc/hosts"; echo "192.168.65.2     host.minikube.internal"; } > /tmp/h.$$; sudo cp /tmp/h.$$ "/etc/hosts""
- I0518 00:25:08.364811   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "8443/tcp") 0).HostPort}}'" minikube
\ I0518 00:25:08.466245   12869 preload.go:98] Checking if preload exists for k8s version v1.20.2 and runtime docker
I0518 00:25:08.466282   12869 preload.go:106] Found local preload: /Users/brian/.minikube/cache/preloaded-tarball/preloaded-images-k8s-v10-v1.20.2-docker-overlay2-arm64.tar.lz4
I0518 00:25:08.466343   12869 ssh_runner.go:149] Run: docker images --format {{.Repository}}:{{.Tag}}
I0518 00:25:08.496006   12869 docker.go:528] Got preloaded images: -- stdout --
gcr.io/k8s-minikube/storage-provisioner:v5
k8s.gcr.io/kube-proxy:v1.20.2
k8s.gcr.io/kube-controller-manager:v1.20.2
k8s.gcr.io/kube-apiserver:v1.20.2
k8s.gcr.io/kube-scheduler:v1.20.2
kubernetesui/dashboard:v2.1.0
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0
kubernetesui/metrics-scraper:v1.0.4
k8s.gcr.io/pause:3.2

-- /stdout --
I0518 00:25:08.496027   12869 docker.go:465] Images already preloaded, skipping extraction
I0518 00:25:08.496348   12869 ssh_runner.go:149] Run: docker images --format {{.Repository}}:{{.Tag}}
I0518 00:25:08.524663   12869 docker.go:528] Got preloaded images: -- stdout --
gcr.io/k8s-minikube/storage-provisioner:v5
k8s.gcr.io/kube-proxy:v1.20.2
k8s.gcr.io/kube-controller-manager:v1.20.2
k8s.gcr.io/kube-apiserver:v1.20.2
k8s.gcr.io/kube-scheduler:v1.20.2
kubernetesui/dashboard:v2.1.0
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0
kubernetesui/metrics-scraper:v1.0.4
k8s.gcr.io/pause:3.2

-- /stdout --
I0518 00:25:08.524682   12869 cache_images.go:74] Images are preloaded, skipping loading
I0518 00:25:08.524998   12869 ssh_runner.go:149] Run: docker info --format {{.CgroupDriver}}
/ I0518 00:25:08.703754   12869 cni.go:93] Creating CNI manager for ""
I0518 00:25:08.703768   12869 cni.go:167] CNI unnecessary in this configuration, recommending no CNI
I0518 00:25:08.703773   12869 kubeadm.go:87] Using pod CIDR: 10.244.0.0/16
I0518 00:25:08.703782   12869 kubeadm.go:153] kubeadm options: {CertDir:/var/lib/minikube/certs ServiceCIDR:10.96.0.0/12 PodSubnet:10.244.0.0/16 AdvertiseAddress:192.168.49.2 APIServerPort:8443 KubernetesVersion:v1.20.2 EtcdDataDir:/var/lib/minikube/etcd EtcdExtraArgs:map[] ClusterName:minikube NodeName:minikube DNSDomain:cluster.local CRISocket:/var/run/dockershim.sock ImageRepository: ComponentOptions:[{Component:apiServer ExtraArgs:map[enable-admission-plugins:NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,NodeRestriction,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota] Pairs:map[certSANs:["127.0.0.1", "localhost", "192.168.49.2"]]} {Component:controllerManager ExtraArgs:map[allocate-node-cidrs:true leader-elect:false] Pairs:map[]} {Component:scheduler ExtraArgs:map[leader-elect:false] Pairs:map[]}] FeatureArgs:map[] NoTaintMaster:true NodeIP:192.168.49.2 CgroupDriver:cgroupfs ClientCAFile:/var/lib/minikube/certs/ca.crt StaticPodPath:/etc/kubernetes/manifests ControlPlaneAddress:control-plane.minikube.internal KubeProxyOptions:map[]}
I0518 00:25:08.704045   12869 kubeadm.go:157] kubeadm config:
apiVersion: kubeadm.k8s.io/v1beta2
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: 192.168.49.2
  bindPort: 8443
bootstrapTokens:
  - groups:
      - system:bootstrappers:kubeadm:default-node-token
    ttl: 24h0m0s
    usages:
      - signing
      - authentication
nodeRegistration:
  criSocket: /var/run/dockershim.sock
  name: "minikube"
  kubeletExtraArgs:
    node-ip: 192.168.49.2
  taints: []
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
apiServer:
  certSANs: ["127.0.0.1", "localhost", "192.168.49.2"]
  extraArgs:
    enable-admission-plugins: "NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,NodeRestriction,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota"
controllerManager:
  extraArgs:
    allocate-node-cidrs: "true"
    leader-elect: "false"
scheduler:
  extraArgs:
    leader-elect: "false"
certificatesDir: /var/lib/minikube/certs
clusterName: mk
controlPlaneEndpoint: control-plane.minikube.internal:8443
dns:
  type: CoreDNS
etcd:
  local:
    dataDir: /var/lib/minikube/etcd
    extraArgs:
      proxy-refresh-interval: "70000"
kubernetesVersion: v1.20.2
networking:
  dnsDomain: cluster.local
  podSubnet: "10.244.0.0/16"
  serviceSubnet: 10.96.0.0/12
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  x509:
    clientCAFile: /var/lib/minikube/certs/ca.crt
cgroupDriver: cgroupfs
clusterDomain: "cluster.local"
# disable disk resource management by default
imageGCHighThresholdPercent: 100
evictionHard:
  nodefs.available: "0%"
  nodefs.inodesFree: "0%"
  imagefs.available: "0%"
failSwapOn: false
staticPodPath: /etc/kubernetes/manifests
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
clusterCIDR: "10.244.0.0/16"
metricsBindAddress: 0.0.0.0:10249

I0518 00:25:08.704659   12869 kubeadm.go:901] kubelet [Unit]
Wants=docker.socket

[Service]
ExecStart=
ExecStart=/var/lib/minikube/binaries/v1.20.2/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --config=/var/lib/kubelet/config.yaml --container-runtime=docker --hostname-override=minikube --kubeconfig=/etc/kubernetes/kubelet.conf --node-ip=192.168.49.2

[Install]
 config:
{KubernetesVersion:v1.20.2 ClusterName:minikube Namespace:default APIServerName:minikubeCA APIServerNames:[] APIServerIPs:[] DNSDomain:cluster.local ContainerRuntime:docker CRISocket: NetworkPlugin: FeatureGates: ServiceCIDR:10.96.0.0/12 ImageRepository: LoadBalancerStartIP: LoadBalancerEndIP: CustomIngressCert: ExtraOptions:[] ShouldLoadCachedImages:true EnableDefaultCNI:false CNI: NodeIP: NodePort:8443 NodeName:}
I0518 00:25:08.704761   12869 ssh_runner.go:149] Run: sudo ls /var/lib/minikube/binaries/v1.20.2
I0518 00:25:08.712557   12869 binaries.go:44] Found k8s binaries, skipping transfer
I0518 00:25:08.712665   12869 ssh_runner.go:149] Run: sudo mkdir -p /etc/systemd/system/kubelet.service.d /lib/systemd/system /var/tmp/minikube
I0518 00:25:08.720951   12869 ssh_runner.go:316] scp memory --> /etc/systemd/system/kubelet.service.d/10-kubeadm.conf (334 bytes)
I0518 00:25:08.730661   12869 ssh_runner.go:316] scp memory --> /lib/systemd/system/kubelet.service (352 bytes)
I0518 00:25:08.743617   12869 ssh_runner.go:316] scp memory --> /var/tmp/minikube/kubeadm.yaml.new (1840 bytes)
I0518 00:25:08.755028   12869 ssh_runner.go:149] Run: grep 192.168.49.2 control-plane.minikube.internal$ /etc/hosts
I0518 00:25:08.759061   12869 ssh_runner.go:149] Run: /bin/bash -c "{ grep -v $'\tcontrol-plane.minikube.internal$' "/etc/hosts"; echo "192.168.49.2control-plane.minikube.internal"; } > /tmp/h.$$; sudo cp /tmp/h.$$ "/etc/hosts""
- I0518 00:25:08.767761   12869 certs.go:52] Setting up /Users/brian/.minikube/profiles/minikube for IP: 192.168.49.2
I0518 00:25:08.767825   12869 certs.go:175] generating minikubeCA CA: /Users/brian/.minikube/ca.key
I0518 00:25:08.838052   12869 crypto.go:157] Writing cert to /Users/brian/.minikube/ca.crt ...
I0518 00:25:08.838067   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/ca.crt: {Name:mk67bcca619a10bd467c6ea47899bd9907af20ac Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:08.839910   12869 crypto.go:165] Writing key to /Users/brian/.minikube/ca.key ...
I0518 00:25:08.839918   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/ca.key: {Name:mkf60f781d2f28f50b1d30608439d51a55786fc7 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:08.840250   12869 certs.go:175] generating proxyClientCA CA: /Users/brian/.minikube/proxy-client-ca.key
\ I0518 00:25:08.930284   12869 crypto.go:157] Writing cert to /Users/brian/.minikube/proxy-client-ca.crt ...
I0518 00:25:08.930296   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/proxy-client-ca.crt: {Name:mk917465c6798054f115a5e67e3add08788b87d1 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:08.930796   12869 crypto.go:165] Writing key to /Users/brian/.minikube/proxy-client-ca.key ...
I0518 00:25:08.930802   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/proxy-client-ca.key: {Name:mk64297b4556d235b6175fff925b493a5f027318 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:08.930962   12869 certs.go:286] generating minikube-user signed cert: /Users/brian/.minikube/profiles/minikube/client.key
I0518 00:25:08.930967   12869 crypto.go:69] Generating cert /Users/brian/.minikube/profiles/minikube/client.crt with IP's: []
/ I0518 00:25:09.078542   12869 crypto.go:157] Writing cert to /Users/brian/.minikube/profiles/minikube/client.crt ...
I0518 00:25:09.078559   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/client.crt: {Name:mk732880477be29ebbc669ed861f70436a08df4a Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:09.078832   12869 crypto.go:165] Writing key to /Users/brian/.minikube/profiles/minikube/client.key ...
I0518 00:25:09.078837   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/client.key: {Name:mk064b30cd9a10650f26195ce606b2cf34f0c8cf Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:09.078958   12869 certs.go:286] generating minikube signed cert: /Users/brian/.minikube/profiles/minikube/apiserver.key.dd3b5fb2
I0518 00:25:09.078961   12869 crypto.go:69] Generating cert /Users/brian/.minikube/profiles/minikube/apiserver.crt.dd3b5fb2 with IP's: [192.168.49.2 10.96.0.1 127.0.0.1 10.0.0.1]
I0518 00:25:09.139690   12869 crypto.go:157] Writing cert to /Users/brian/.minikube/profiles/minikube/apiserver.crt.dd3b5fb2 ...
I0518 00:25:09.139705   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/apiserver.crt.dd3b5fb2: {Name:mkd182f7d5cbb9acd33ccca05a50da56dd8cd496 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:09.140743   12869 crypto.go:165] Writing key to /Users/brian/.minikube/profiles/minikube/apiserver.key.dd3b5fb2 ...
I0518 00:25:09.140750   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/apiserver.key.dd3b5fb2: {Name:mk3d59fe3a70df4ec54e54e1c9d64a07d9c2f467 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:09.140891   12869 certs.go:297] copying /Users/brian/.minikube/profiles/minikube/apiserver.crt.dd3b5fb2 -> /Users/brian/.minikube/profiles/minikube/apiserver.crt
I0518 00:25:09.140983   12869 certs.go:301] copying /Users/brian/.minikube/profiles/minikube/apiserver.key.dd3b5fb2 -> /Users/brian/.minikube/profiles/minikube/apiserver.key
I0518 00:25:09.141065   12869 certs.go:286] generating aggregator signed cert: /Users/brian/.minikube/profiles/minikube/proxy-client.key
I0518 00:25:09.141068   12869 crypto.go:69] Generating cert /Users/brian/.minikube/profiles/minikube/proxy-client.crt with IP's: []
- I0518 00:25:09.205710   12869 crypto.go:157] Writing cert to /Users/brian/.minikube/profiles/minikube/proxy-client.crt ...
I0518 00:25:09.205723   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/proxy-client.crt: {Name:mk59f1d895e8fc4443563744c1658d6d94f5c3b2 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:09.205973   12869 crypto.go:165] Writing key to /Users/brian/.minikube/profiles/minikube/proxy-client.key ...
I0518 00:25:09.205977   12869 lock.go:36] WriteFile acquiring /Users/brian/.minikube/profiles/minikube/proxy-client.key: {Name:mkecf3e02ecbeafb6d3d95426342d357a60bfa66 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:09.207475   12869 certs.go:361] found cert: /Users/brian/.minikube/certs/Users/brian/.minikube/certs/ca-key.pem (1675 bytes)
I0518 00:25:09.207529   12869 certs.go:361] found cert: /Users/brian/.minikube/certs/Users/brian/.minikube/certs/ca.pem (1074 bytes)
I0518 00:25:09.207549   12869 certs.go:361] found cert: /Users/brian/.minikube/certs/Users/brian/.minikube/certs/cert.pem (1119 bytes)
I0518 00:25:09.207567   12869 certs.go:361] found cert: /Users/brian/.minikube/certs/Users/brian/.minikube/certs/key.pem (1679 bytes)
I0518 00:25:09.210452   12869 ssh_runner.go:316] scp /Users/brian/.minikube/profiles/minikube/apiserver.crt --> /var/lib/minikube/certs/apiserver.crt (1399 bytes)
I0518 00:25:09.239704   12869 ssh_runner.go:316] scp /Users/brian/.minikube/profiles/minikube/apiserver.key --> /var/lib/minikube/certs/apiserver.key (1679 bytes)
I0518 00:25:09.257203   12869 ssh_runner.go:316] scp /Users/brian/.minikube/profiles/minikube/proxy-client.crt --> /var/lib/minikube/certs/proxy-client.crt (1147 bytes)
I0518 00:25:09.274122   12869 ssh_runner.go:316] scp /Users/brian/.minikube/profiles/minikube/proxy-client.key --> /var/lib/minikube/certs/proxy-client.key (1675 bytes)
\ I0518 00:25:09.291171   12869 ssh_runner.go:316] scp /Users/brian/.minikube/ca.crt --> /var/lib/minikube/certs/ca.crt (1111 bytes)
I0518 00:25:09.306857   12869 ssh_runner.go:316] scp /Users/brian/.minikube/ca.key --> /var/lib/minikube/certs/ca.key (1675 bytes)
I0518 00:25:09.322071   12869 ssh_runner.go:316] scp /Users/brian/.minikube/proxy-client-ca.crt --> /var/lib/minikube/certs/proxy-client-ca.crt (1119 bytes)
I0518 00:25:09.336884   12869 ssh_runner.go:316] scp /Users/brian/.minikube/proxy-client-ca.key --> /var/lib/minikube/certs/proxy-client-ca.key (1675 bytes)
I0518 00:25:09.351498   12869 ssh_runner.go:316] scp /Users/brian/.minikube/ca.crt --> /usr/share/ca-certificates/minikubeCA.pem (1111 bytes)
I0518 00:25:09.365714   12869 ssh_runner.go:316] scp memory --> /var/lib/minikube/kubeconfig (738 bytes)
I0518 00:25:09.378476   12869 ssh_runner.go:149] Run: openssl version
| I0518 00:25:09.387264   12869 ssh_runner.go:149] Run: sudo /bin/bash -c "test -s /usr/share/ca-certificates/minikubeCA.pem && ln -fs /usr/share/ca-certificates/minikubeCA.pem /etc/ssl/certs/minikubeCA.pem"
I0518 00:25:09.394709   12869 ssh_runner.go:149] Run: ls -la /usr/share/ca-certificates/minikubeCA.pem
I0518 00:25:09.398835   12869 certs.go:402] hashing: -rw-r--r-- 1 root root 1111 May 18 04:25 /usr/share/ca-certificates/minikubeCA.pem
I0518 00:25:09.398940   12869 ssh_runner.go:149] Run: openssl x509 -hash -noout -in /usr/share/ca-certificates/minikubeCA.pem
I0518 00:25:09.405628   12869 ssh_runner.go:149] Run: sudo /bin/bash -c "test -L /etc/ssl/certs/b5213941.0 || ln -fs /etc/ssl/certs/minikubeCA.pem /etc/ssl/certs/b5213941.0"
I0518 00:25:09.412229   12869 kubeadm.go:381] StartCluster: {Name:minikube KeepContext:false EmbedCerts:false MinikubeISO: KicBaseImage:gcr.io/k8s-minikube/kicbase:v0.0.22@sha256:7cc3a3cb6e51c628d8ede157ad9e1f797e8d22a1b3cedc12d3f1999cb52f962e Memory:1988 CPUs:2 DiskSize:20000 VMDriver: Driver:docker HyperkitVpnKitSock: HyperkitVSockPorts:[] DockerEnv:[] ContainerVolumeMounts:[] InsecureRegistry:[] RegistryMirror:[] HostOnlyCIDR:192.168.99.1/24 HypervVirtualSwitch: HypervUseExternalSwitch:false HypervExternalAdapter: KVMNetwork:default KVMQemuURI:qemu:///system KVMGPU:false KVMHidden:false KVMNUMACount:1 DockerOpt:[] DisableDriverMounts:false NFSShare:[] NFSSharesRoot:/nfsshares UUID: NoVTXCheck:false DNSProxy:false HostDNSResolver:true HostOnlyNicType:virtio NatNicType:virtio SSHIPAddress: SSHUser:root SSHKey: SSHPort:22 KubernetesConfig:{KubernetesVersion:v1.20.2 ClusterName:minikube Namespace:default APIServerName:minikubeCA APIServerNames:[] APIServerIPs:[] DNSDomain:cluster.local ContainerRuntime:docker CRISocket: NetworkPlugin: FeatureGates: ServiceCIDR:10.96.0.0/12 ImageRepository: LoadBalancerStartIP: LoadBalancerEndIP: CustomIngressCert: ExtraOptions:[] ShouldLoadCachedImages:true EnableDefaultCNI:false CNI: NodeIP: NodePort:8443 NodeName:} Nodes:[{Name: IP:192.168.49.2 Port:8443 KubernetesVersion:v1.20.2 ControlPlane:true Worker:true}] Addons:map[] VerifyComponents:map[apiserver:true system_pods:true] StartHostTimeout:6m0s ScheduledStop:<nil> ExposedPorts:[] ListenAddress: Network: MultiNodeRequested:false}
I0518 00:25:09.412382   12869 ssh_runner.go:149] Run: docker ps --filter status=paused --filter=name=k8s_.*_(kube-system)_ --format={{.ID}}
I0518 00:25:09.441321   12869 ssh_runner.go:149] Run: sudo ls /var/lib/kubelet/kubeadm-flags.env /var/lib/kubelet/config.yaml /var/lib/minikube/etcd
I0518 00:25:09.447810   12869 ssh_runner.go:149] Run: sudo cp /var/tmp/minikube/kubeadm.yaml.new /var/tmp/minikube/kubeadm.yaml
I0518 00:25:09.456792   12869 kubeadm.go:220] ignoring SystemVerification for kubeadm because of docker driver
I0518 00:25:09.456896   12869 ssh_runner.go:149] Run: sudo ls -la /etc/kubernetes/admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf
I0518 00:25:09.464975   12869 kubeadm.go:151] config check failed, skipping stale config cleanup: sudo ls -la /etc/kubernetes/admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf: Process exited with status 2
stdout:

stderr:
ls: cannot access '/etc/kubernetes/admin.conf': No such file or directory
ls: cannot access '/etc/kubernetes/kubelet.conf': No such file or directory
ls: cannot access '/etc/kubernetes/controller-manager.conf': No such file or directory
ls: cannot access '/etc/kubernetes/scheduler.conf': No such file or directory
I0518 00:25:09.465002   12869 ssh_runner.go:240] Start: /bin/bash -c "sudo env PATH=/var/lib/minikube/binaries/v1.20.2:$PATH kubeadm init --config /var/tmp/minikube/kubeadm.yaml  --ignore-preflight-errors=DirAvailable--etc-kubernetes-manifests,DirAvailable--var-lib-minikube,DirAvailable--var-lib-minikube-etcd,FileAvailable--etc-kubernetes-manifests-kube-scheduler.yaml,FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml,FileAvailable--etc-kubernetes-manifests-kube-controller-manager.yaml,FileAvailable--etc-kubernetes-manifests-etcd.yaml,Port-10250,Swap,Mem,SystemVerification,FileContent--proc-sys-net-bridge-bridge-nf-call-iptables"
\ W0518 00:25:10.179156   12869 out.go:424] no arguments passed for "    ▪ Generating certificates and keys ..." - returning raw string
W0518 00:25:10.179226   12869 out.go:424] no arguments passed for "    ▪ Generating certificates and keys ..." - returning raw string
I0518 00:25:10.198037   12869 out.go:197]     ▪ Generating certificates and keys ...

    ▪ Generating certificates and keys ...\ W0518 00:25:12.175124   12869 out.go:424] no arguments passed for "    ▪ Booting up control plane ..." - returning raw string
W0518 00:25:12.175167   12869 out.go:424] no arguments passed for "    ▪ Booting up control plane ..." - returning raw string
I0518 00:25:12.193654   12869 out.go:197]     ▪ Booting up control plane ...

    ▪ Booting up control plane .../ W0518 00:25:30.737444   12869 out.go:424] no arguments passed for "    ▪ Configuring RBAC rules ..." - returning raw string
W0518 00:25:30.737493   12869 out.go:424] no arguments passed for "    ▪ Configuring RBAC rules ..." - returning raw string
- I0518 00:25:30.754957   12869 out.go:197]     ▪ Configuring RBAC rules ...

    ▪ Configuring RBAC rules ...- I0518 00:25:31.167823   12869 cni.go:93] Creating CNI manager for ""
I0518 00:25:31.167847   12869 cni.go:167] CNI unnecessary in this configuration, recommending no CNI
I0518 00:25:31.167875   12869 ssh_runner.go:149] Run: /bin/bash -c "cat /proc/$(pgrep kube-apiserver)/oom_adj"
I0518 00:25:31.168355   12869 ssh_runner.go:149] Run: sudo /var/lib/minikube/binaries/v1.20.2/kubectl label nodes minikube.k8s.io/version=v1.20.0 minikube.k8s.io/commit=c61663e942ec43b20e8e70839dcca52e44cd85ae minikube.k8s.io/name=minikube minikube.k8s.io/updated_at=2021_05_18T00_25_31_0700 --all --overwrite --kubeconfig=/var/lib/minikube/kubeconfig
I0518 00:25:31.168397   12869 ssh_runner.go:149] Run: sudo /var/lib/minikube/binaries/v1.20.2/kubectl create clusterrolebinding minikube-rbac --clusterrole=cluster-admin --serviceaccount=kube-system:default --kubeconfig=/var/lib/minikube/kubeconfig
I0518 00:25:31.179524   12869 ops.go:34] apiserver oom_adj: -16
| I0518 00:25:31.361350   12869 kubeadm.go:977] duration metric: took 193.411333ms to wait for elevateKubeSystemPrivileges.
I0518 00:25:31.361390   12869 kubeadm.go:383] StartCluster complete in 21.94928975s
I0518 00:25:31.361415   12869 settings.go:142] acquiring lock: {Name:mkacc1c116705ecb48d12b1e76f8f59b4292cc95 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
I0518 00:25:31.362017   12869 settings.go:150] Updating kubeconfig:  /Users/brian/.kube/config
I0518 00:25:31.365007   12869 lock.go:36] WriteFile acquiring /Users/brian/.kube/config: {Name:mk424d46bee83ac669ddd65c3be096eaea3538e7 Clock:{} Delay:500ms Timeout:1m0s Cancel:<nil>}
/ I0518 00:25:31.888988   12869 kapi.go:244] deployment "coredns" in namespace "kube-system" and context "minikube" rescaled to 1
I0518 00:25:31.889050   12869 start.go:201] Will wait 6m0s for node &{Name: IP:192.168.49.2 Port:8443 KubernetesVersion:v1.20.2 ControlPlane:true Worker:true}
W0518 00:25:31.889083   12869 out.go:424] no arguments passed for "🔎  Verifying Kubernetes components...\n" - returning raw string
W0518 00:25:31.889108   12869 out.go:424] no arguments passed for "🔎  Verifying Kubernetes components...\n" - returning raw string
I0518 00:25:31.907497   12869 out.go:170] 🔎  Verifying Kubernetes components...
I0518 00:25:31.889564   12869 addons.go:328] enableAddons start: toEnable=map[], additional=[]

🔎  Verifying Kubernetes components...
I0518 00:25:31.907570   12869 addons.go:55] Setting storage-provisioner=true in profile "minikube"
I0518 00:25:31.907584   12869 addons.go:131] Setting addon storage-provisioner=true in "minikube"
W0518 00:25:31.907587   12869 addons.go:140] addon storage-provisioner should already be in state true
I0518 00:25:31.907598   12869 host.go:66] Checking if "minikube" exists ...
I0518 00:25:31.907586   12869 addons.go:55] Setting default-storageclass=true in profile "minikube"
I0518 00:25:31.907626   12869 addons_storage_classes.go:33] enableOrDisableStorageClasses default-storageclass=true on "minikube"
I0518 00:25:31.907803   12869 ssh_runner.go:149] Run: sudo systemctl is-active --quiet service kubelet
I0518 00:25:31.907997   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Status}}
I0518 00:25:31.925243   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Status}}
I0518 00:25:31.926989   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "8443/tcp") 0).HostPort}}'" minikube
I0518 00:25:32.128603   12869 out.go:170]     ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
I0518 00:25:32.128671   12869 addons.go:261] installing /etc/kubernetes/addons/storage-provisioner.yaml
I0518 00:25:32.128676   12869 ssh_runner.go:316] scp memory --> /etc/kubernetes/addons/storage-provisioner.yaml (2676 bytes)
I0518 00:25:32.128739   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
I0518 00:25:32.131473   12869 api_server.go:50] waiting for apiserver process to appear ...
I0518 00:25:32.131537   12869 ssh_runner.go:149] Run: sudo pgrep -xnf kube-apiserver.*minikube.*
I0518 00:25:32.138405   12869 addons.go:131] Setting addon default-storageclass=true in "minikube"
W0518 00:25:32.138420   12869 addons.go:140] addon default-storageclass should already be in state true
I0518 00:25:32.138429   12869 host.go:66] Checking if "minikube" exists ...
I0518 00:25:32.138748   12869 cli_runner.go:115] Run: docker container inspect minikube --format={{.State.Status}}
I0518 00:25:32.154830   12869 api_server.go:70] duration metric: took 265.748917ms to wait for apiserver process to appear ...
I0518 00:25:32.154862   12869 api_server.go:86] waiting for apiserver healthz status ...
I0518 00:25:32.154873   12869 api_server.go:223] Checking apiserver healthz at https://127.0.0.1:62626/healthz ...
I0518 00:25:32.175708   12869 api_server.go:249] https://127.0.0.1:62626/healthz returned 200:
ok
I0518 00:25:32.178675   12869 api_server.go:139] control plane version: v1.20.2
I0518 00:25:32.178690   12869 api_server.go:129] duration metric: took 23.825042ms to wait for apiserver health ...
I0518 00:25:32.178695   12869 system_pods.go:43] waiting for kube-system pods to appear ...
I0518 00:25:32.188464   12869 system_pods.go:59] 0 kube-system pods found
I0518 00:25:32.188885   12869 retry.go:31] will retry after 263.082536ms: only 0 pod(s) have shown up
I0518 00:25:32.256644   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
I0518 00:25:32.258384   12869 addons.go:261] installing /etc/kubernetes/addons/storageclass.yaml
I0518 00:25:32.258397   12869 ssh_runner.go:316] scp memory --> /etc/kubernetes/addons/storageclass.yaml (271 bytes)
I0518 00:25:32.258470   12869 cli_runner.go:115] Run: docker container inspect -f "'{{(index (index .NetworkSettings.Ports "22/tcp") 0).HostPort}}'" minikube
I0518 00:25:32.349854   12869 ssh_runner.go:149] Run: sudo KUBECONFIG=/var/lib/minikube/kubeconfig /var/lib/minikube/binaries/v1.20.2/kubectl apply -f /etc/kubernetes/addons/storage-provisioner.yaml
I0518 00:25:32.365019   12869 sshutil.go:53] new ssh client: &{IP:127.0.0.1 Port:62622 SSHKeyPath:/Users/brian/.minikube/machines/minikube/id_rsa Username:docker}
I0518 00:25:32.457399   12869 system_pods.go:59] 0 kube-system pods found
I0518 00:25:32.457421   12869 retry.go:31] will retry after 381.329545ms: only 0 pod(s) have shown up
I0518 00:25:32.458768   12869 ssh_runner.go:149] Run: sudo KUBECONFIG=/var/lib/minikube/kubeconfig /var/lib/minikube/binaries/v1.20.2/kubectl apply -f /etc/kubernetes/addons/storageclass.yaml
I0518 00:25:32.649289   12869 out.go:170] 🌟  Enabled addons: storage-provisioner, default-storageclass
🌟  Enabled addons: storage-provisioner, default-storageclass
I0518 00:25:32.649308   12869 addons.go:330] enableAddons completed in 760.019542ms
I0518 00:25:32.847800   12869 system_pods.go:59] 1 kube-system pods found
I0518 00:25:32.847823   12869 system_pods.go:61] "storage-provisioner" [105583a8-6c2b-451d-b3d2-74d905fcd39c] Pending: PodScheduled:Unschedulable (0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn't tolerate.)
I0518 00:25:32.847829   12869 retry.go:31] will retry after 422.765636ms: only 1 pod(s) have shown up
I0518 00:25:33.278501   12869 system_pods.go:59] 1 kube-system pods found
I0518 00:25:33.278520   12869 system_pods.go:61] "storage-provisioner" [105583a8-6c2b-451d-b3d2-74d905fcd39c] Pending: PodScheduled:Unschedulable (0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn't tolerate.)
I0518 00:25:33.278541   12869 retry.go:31] will retry after 473.074753ms: only 1 pod(s) have shown up
I0518 00:25:33.759596   12869 system_pods.go:59] 1 kube-system pods found
I0518 00:25:33.759629   12869 system_pods.go:61] "storage-provisioner" [105583a8-6c2b-451d-b3d2-74d905fcd39c] Pending: PodScheduled:Unschedulable (0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn't tolerate.)
I0518 00:25:33.759641   12869 retry.go:31] will retry after 587.352751ms: only 1 pod(s) have shown up
I0518 00:25:34.354482   12869 system_pods.go:59] 5 kube-system pods found
I0518 00:25:34.354513   12869 system_pods.go:61] "etcd-minikube" [2f4d2f69-7d89-45c0-af16-08d97aa6ec86] Pending
I0518 00:25:34.354521   12869 system_pods.go:61] "kube-apiserver-minikube" [cf962947-833a-4991-824c-908f37d685ee] Pending
I0518 00:25:34.354528   12869 system_pods.go:61] "kube-controller-manager-minikube" [503da315-ffd1-4a1a-8b96-c6fdc5b77925] Pending
I0518 00:25:34.354542   12869 system_pods.go:61] "kube-scheduler-minikube" [5d2be68c-e85f-43d4-8db3-ba73ff19aa81] Running / Ready:ContainersNotReady (containers with unready status: [kube-scheduler]) / ContainersReady:ContainersNotReady (containers with unready status: [kube-scheduler])
I0518 00:25:34.354551   12869 system_pods.go:61] "storage-provisioner" [105583a8-6c2b-451d-b3d2-74d905fcd39c] Pending: PodScheduled:Unschedulable (0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn't tolerate.)
I0518 00:25:34.354558   12869 system_pods.go:74] duration metric: took 2.175872s to wait for pod list to return data ...
I0518 00:25:34.354569   12869 kubeadm.go:538] duration metric: took 2.465505083s to wait for : map[apiserver:true system_pods:true] ...
I0518 00:25:34.354595   12869 node_conditions.go:102] verifying NodePressure condition ...
I0518 00:25:34.358435   12869 node_conditions.go:122] node storage ephemeral capacity is 61255492Ki
I0518 00:25:34.358462   12869 node_conditions.go:123] node cpu capacity is 4
I0518 00:25:34.358482   12869 node_conditions.go:105] duration metric: took 3.881041ms to run NodePressure ...
I0518 00:25:34.358494   12869 start.go:206] waiting for startup goroutines ...
I0518 00:25:34.486345   12869 start.go:460] kubectl: 1.21.0, cluster: 1.20.2 (minor skew: 1)
I0518 00:25:34.505180   12869 out.go:170] 🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default