# chatgpt-builds-ai
A simple webapp built by ChatGPT that uses a CNN for classifying digits from the MNIST dataset

## Watch ChatGPT build this project!
https://www.youtube.com/watch?v=mw2mG1O2_uE&feature=youtu.be&ab_channel=BreakTheCode

## Run the webapp with Docker
```sh
cd webapp
docker-compose up
```

## Run the webapp without Docker
Make sure you have node installed on your machine and then run the following

```sh
cd webapp
yarn
yarn serve
```

OR
```sh
cd webapp
npm install
npm run serve
```

and then navigate to http://localhost:8080 on your browser

## Train the classifier with Docker
```sh
cd classifier
docker-compose build
docker-compose up
```

## Train the classifier without Docker
Make sure you have [python3](https://www.python.org/downloads/) and [tensorflow 2.0](https://www.tensorflow.org/install) installed on your system and then run

```sh
cd classifier
python3 src/train.py
```
