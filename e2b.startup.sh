#!/bin/bash

# Ensure we're in the correct directory
cd /home/user/app

# Install dependencies using bun
bun install --frozen-lockfile

# Start the development server using bun
bun run dev --port 3000 --host > ./vite-dev-log.txt 2>&1

# This script runs while building the sandbox template only (used for snapshot for quick startup time)
# and makes sure the Vite app is (1) running and (2) the `/` page is compiled
function ping_server() {
	counter=0
	response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	while [[ ${response} -ne 200 ]]; do
	  let counter++
	  if  (( counter % 20 == 0 )); then
        echo "Waiting for server to start..."
        sleep 0.1
      fi

	  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	done
}

# Run the function
ping_server