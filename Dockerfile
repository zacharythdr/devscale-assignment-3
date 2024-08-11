FROM node:lts 

WORKDIR /app

COPY . .

RUN npm install

ENV MONGO_URI=mongodb+srv://devscale-user:umcibT7u9KGuRhZZ@cluster-introdevscale.dn8chn6.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster-introDevscale
ENV PORT=8000
ENV JWT_ACCESS_SECRET=fggbsDT2B8sDCeHCcRdVRfsf1LDbGsCx2S44OqF/zyY=
ENV JWT_REFRESH_SECRET=SyD0G/8dbFUDuUhjxrmizHePstSxGtVzgZYduYjjtyRAvQWIy8EjWV9JbXYJySsXJfhFVntm2sweVVBco+QiHg==

EXPOSE 8000

CMD [ "npm", "run", "start" ]