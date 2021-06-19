#!/bin/bash
docker build -t process-manager-backend .
docker run -p 8080:8080 process-manager-backend