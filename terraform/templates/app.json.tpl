[
  {
    "name": "${container_name}",
    "image": "${container_image}",
    "essential": true,
    "cpu": 10,
    "memory": 512,
    "links": [],
    "portMappings": [
      {
        "containerPort": 8000,
        "hostPort": 0,
        "protocol": "tcp"
      }
    ],
    "command": ${command},
    "environment": [
      {
        "name": "DJANGO_SETTINGS_MODULE",
        "value": "${django_settings_module}"
      },
      {
        "name": "POSTGRES_USERNAME",
        "value": "${postgres_username}"
      },
      {
        "name": "POSTGRES_PASSWORD",
        "value": "${postgres_password}"
      },
      {
        "name": "POSTGRES_SERVICE_HOST",
        "value": "${postgres_service_host}"
      },
      {
        "name": "REDIS_SERVICE_HOST",
        "value": "${redis_service_host}"
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/django-app",
        "awslogs-region": "${region}",
        "awslogs-stream-prefix": "django-app-log-stream"
      }
    }
  }
]
