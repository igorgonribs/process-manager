#!/bin/bash
docker build -t frontend .
docker run -p 3001:3000 --rm frontend