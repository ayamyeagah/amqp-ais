
# AMQP Multi-Station by AIS PPNS


AMQP Multi-Station is project that receive all Automatic Identification System (AIS) data in 6 station in Indonesia
Using AMQP (Advanced Message Queueing Protocol) by RabbitMQ.

Currently Station: 
- Surabaya
- Madura
- Banyuwangi
- Semarang
- Indramayu
- Batam

Use for better managing AIS data in server.



## Environment Variables

To run this project, you will need to modify the following environment variables to your config.js file

`udp: port:[ADJUST WITH RECEIVER PORT]`

`udp: address:[ADJUST WITH RECEIVER ADDRESS]`


## Run Locally

Clone the project

```bash
  git clone https://github.com/ayamyeagah/amqp-ais.git
```

Go to the project directory

```bash
  cd amqp-ais
```

Install dependencies

```bash
  npm install
```

Start the test

```bash
  npm run test
```

Start the service

```bash
  npm start
```


## Authors

[@ayamyeagah](https://www.github.com/ayamyeagah)
