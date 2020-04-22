import codecs
from setuptools import setup

with codecs.open('README.md', encoding='utf-8') as f:
    long_description = f.read()

setup(
    name="uni-utils",
    version="1.0.0",
    license='https://github.com/yxwzaxns/uni-utils/blob/master/LICENSE',
    description="A unified toolkit for all languages",
    author='aong',
    author_email='yxwzaxns@gmail.com',
    url='https://github.com/yxwzaxns/uni-utils',
    packages=['src/python'],
    package_data={
        'uni-utils': ['README.md', 'LICENSE']
    },
    install_requires=[],
    entry_points="""
    """,
    classifiers=[
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
    ],
    long_description=long_description,
    long_description_content_type="text/markdown",
    python_requires='>=3.6'
)
