import json
import numpy as np
import requests
from celery import Celery
from joblib import load
from time import sleep


MODEL_API = "http://localhost://5000/model-api"
CLF = load("../model-api/model/digit_recognition.joblib")


app = Celery(
    "digit_inference", 
    broker="redis://localhost",
    backend="redis://localhost"
    )


@app.task
def add(x, y):
    sleep(3)
    return x + y


@app.task
def guess_digit(pixels):
    # pixels = np.ones((1, 784))
    payload = {"pixels": pixels}
    res = requests.post(MODEL_API, data=json.dumps(payload))
    return res.json()
    # return int( CLF.predict(pixels)[0] )