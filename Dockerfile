FROM mhart/alpine-node:13
ENV NODE_ENV production
COPY ./build ./

EXPOSE 3000
ENTRYPOINT ["node", "./server.js"]
