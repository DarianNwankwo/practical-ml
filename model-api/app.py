import json
import numpy as np
from flask import Flask, jsonify, request
from joblib import load


app = Flask(__name__)
clf = load("./model/digit_recognition.joblib")


@app.route("/model-api", methods=['POST'])
def digit_inference():
    data = request.get_data()
    data = json.loads(data.decode("utf-8"))
    # print(type(data))
    # print(dir(request))
    pixels = np.asarray(data["pixels"]).reshape(1, 784)
    return jsonify({
        "result": int(clf.predict(pixels)[0])
    })


def parse_data(filename, offset):
    """Returns a numpy array of data read from an unsigned byte array."""
    info = None
    with open(filename, "rb") as data:
        data.read(offset)
        info = np.array(list(data.read()))
    return info


if __name__ == "__main__":
    app.run()
    # X_test, Y_test = parse_data("./data/test_images_ubyte", 16), parse_data("./data/test_labels_ubyte", 8)
    # X_test = np.reshape(X_test, (10000, 784))
    # Y_test = np.reshape(Y_test, (10000,))
    # print(clf.score(X_test, Y_test))
