"""Setup for pdf XBlock."""

import os
from setuptools import setup


def package_data(pkg, root):
    """Generic function to find package_data for `pkg` under `root`."""
    data = []
    for dirname, _, files in os.walk(os.path.join(pkg, root)):
        for fname in files:
            data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='xblock-pdf',
    version='0.2.2',
    description='This XBlock provides an easy way to embed a PDF.',
    packages=[
        'pdf',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'pdf = pdf:pdfXBlock',
        ]
    },
    package_data=package_data("pdf", "static"),
)
