FROM node:alpine AS builder

#Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn --frozen-lockfile
# Required if not done in postinstall
# RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
