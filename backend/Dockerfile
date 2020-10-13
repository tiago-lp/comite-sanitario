FROM rust:latest

WORKDIR /app

COPY . .

RUN cargo build

EXPOSE "9090"

CMD cargo run
