from celery import Celery


app = Celery("digit_inference", broker="redis://localhost")


@app.task
def add(x, y):
    return x + y