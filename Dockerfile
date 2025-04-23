FROM node:lts
WORKDIR /app
EXPOSE 3000
ENV CHOKIDAR_USEPOLLING=true
CMD ["npm", "run", "dev"]
