# flake8: noqa

from .base import *

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": (
                "%(asctime)s [%(process)d] [%(levelname)s] "
                + "pathname=%(pathname)s lineno=%(lineno)s "
                + "funcname=%(funcName)s %(message)s"
            ),
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "simple": {"format": "%(levelname)s %(message)s"},
    },
    "handlers": {
        "null": {
            "level": "DEBUG",
            "class": "logging.NullHandler",
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "testlogger": {
            "handlers": ["console"],
            "level": "INFO",
        }
    },
}

# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": True,
#     "formatters": {
#         "verbose": {
#             "format": "%(asctime)s %(levelname)s [%(name)s:%(lineno)s] %(module)s %(process)d %(thread)d %(message)s"
#         }
#     },
#     "handlers": {
#         "gunicorn": {
#             "level": "DEBUG",
#             "class": "logging.handlers.RotatingFileHandler",
#             "formatter": "verbose",
#             "filename": "/opt/djangoprojects/reports/bin/gunicorn.errors",
#             "maxBytes": 1024 * 1024 * 100,  # 100 mb
#         }
#     },
#     "loggers": {
#         "gunicorn.errors": {
#             "level": "DEBUG",
#             "handlers": ["gunicorn"],
#             "propagate": True,
#         },
#     },
# }