"""
Models to Train: 1-Layer NN, KNN (l2, l3), SVM, M-layer NN, CNN
"""
import numpy as np
import pickle
from sklearn.neighbors import KNeighborsClassifier, DistanceMetric
from sklearn.neural_network import MLPClassifier
from math import sqrt


def parse_data(filename, offset):
    """Returns a numpy array of data read from an unsigned byte array."""
    info = None
    with open(filename, "rb") as data:
        data.read(offset)
        info = np.array(list(data.read()))
    return info


def ann(X_train, Y_train, X_test, Y_test):
    # num_neurons = (X_train.shape[0] + 1) / 2
    clf = MLPClassifier(hidden_layer_sizes=(300,))
    clf.fit(X_train, Y_train)
    accuracy = clf.score(X_test, Y_test)
    # print(f"(ANN) Accuracy using {300} neurons and {1} hidden layer: {accuracy}")
    return clf


if __name__ == "__main__":
    # Collect training/test data
    X_train, Y_train = parse_data("./mnist/train_images_ubyte", 16), parse_data("./mnist/train_labels_ubyte", 8)
    X_test, Y_test = parse_data("./mnist/test_images_ubyte", 16), parse_data("./mnist/test_labels_ubyte", 8)

    # Reshape tranining/test s.t. each row corresponds to a input vector
    X_train = np.reshape(X_train, (60000, 784))
    Y_train = np.reshape(Y_train, (60000,))
    X_test = np.reshape(X_test, (10000, 784))
    Y_test = np.reshape(Y_test, (10000,))


    # Train ann algorithm on data
    clf = ann(X_train, Y_train, X_test, Y_test)
