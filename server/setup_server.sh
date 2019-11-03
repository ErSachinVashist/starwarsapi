#!/bin/bash

pm2 start $(pwd)/server/server.js
pm2 start $(pwd)/workers/workerQueue.js
