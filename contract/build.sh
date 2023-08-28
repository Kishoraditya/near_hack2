#!/bin/sh

echo ">> Building contracts"

rustup target add wasm32-unknown-unknown
cargo build --manifest-path ./contract/Cargo.toml --target wasm32-unknown-unknown --release

if [ $? -ne 0 ]; then
  echo ">> Error building contracts"
  exit 1
fi

echo ">> All contracts built successfully"
