import time
from backend.celery_app import app


@app.task
def debug_task():
    time.sleep(5)
    return "Debug task slept for 5 second."


@app.task
def celery_beat_debug_task():
    return "Celery beat debug task complete."
