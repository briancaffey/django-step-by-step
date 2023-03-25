
```
openssl genrsa -aes256 -passout pass:foobar -out server.key 2048
```

```
openssl req -new -key server.key -out server.csr -subj "/CN=Brian Caffey/OU=Brian Caffey/emailAddress=hello@briancaffey.com"
```

```
openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 3650 -sha256 -extfile v3.ext
```

```
openssl rsa -in server.key -out server.key
```
