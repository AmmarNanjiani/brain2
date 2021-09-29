FROM node:latest

WORKDIR /frontend
COPY package.json /frontend

RUN npm install

# RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /frontend
# USER appuser

EXPOSE 3000
CMD ["npm", "start"]