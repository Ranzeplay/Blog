FROM node:18 AS client
WORKDIR /src
COPY ./Client ./

WORKDIR /src/ClientApp
RUN npm install
RUN npm run prod -- --output-path /staging

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS server
WORKDIR /src
COPY ./Server ./
# restore as distinct layers
RUN dotnet restore
# build and publish a release
RUN dotnet publish -c Release -o /staging

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
ENV ASPNETCORE_URLS http://+:8080
ENV ASPNETCORE_ENVIRONMENT Production
EXPOSE 8080
WORKDIR /app
COPY --from=server /staging .
COPY --from=client /staging ./wwwroot/
ENTRYPOINT [ "dotnet", "Blog.dll" ]
