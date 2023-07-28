FROM node:18-alpine AS client

WORKDIR /src
COPY . ./

WORKDIR /src/ClientApp
RUN npm install
RUN npm run prod

FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS server
WORKDIR /src
COPY . ./
# restore as distinct layers
RUN dotnet restore
# build and publish a release
RUN dotnet publish -c Release -o /app

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
ENV ASPNETCORE_URLS http://+:8080
ENV ASPNETCORE_ENVIRONMENT Production
EXPOSE 8080
WORKDIR /app
COPY --from=server /app .
COPY --from=client /src/ClientApp/dist ./wwwroot/
ENTRYPOINT [ "dotnet", "Blog.dll" ]
