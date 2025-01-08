FROM node:lts  
# This is a node base image

WORKDIR /app
# Set the cwd as /app

COPY package*.json ./
# Copy our dependency file into the /app

RUN npm install
# On image build, install the dependencies


COPY . .
# Copy the app code into the image

EXPOSE 3000
# Give port 3000 access

CMD ["npm", "start"]
# Run this command to start