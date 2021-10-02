FROM node:16-alpine

WORKDIR /app/frontend

RUN chmod -R 775 /app/frontend
# RUN chmod -R node:node /app/frontend

RUN chgrp -R 0 /app/frontend 
RUN chmod -R g+rwx /app/frontend

# ENV PATH /app/frontend/node_modules/.bin:$PATH


COPY --chown=node:node package*.json /app/frontend/


RUN npm install

COPY --chown=node:node . /app/frontend/

# RUN npm run build

# RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /frontend
# USER appuser



EXPOSE 3000
CMD ["npm", "start"]