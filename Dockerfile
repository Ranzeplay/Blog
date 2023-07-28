# Build frontend Angular application
FROM node:18 AS client
WORKDIR /src
COPY ./Client ./
RUN npm install
RUN npm run prod -- --output-path /staging

# Build backend ASP.NET Core application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS server
WORKDIR /src
COPY ./Server ./
RUN dotnet restore
RUN dotnet publish -c Release -o /staging

# Combine and run
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine
ENV ASPNETCORE_URLS http://+:8080
ENV ASPNETCORE_ENVIRONMENT Production
EXPOSE 8080
WORKDIR /app
COPY --from=server /staging .
COPY --from=client /staging ./wwwroot/
# Add OpenSSH to upload files
RUN apk add openssh
ENTRYPOINT [ "dotnet", "Blog.dll" ]
