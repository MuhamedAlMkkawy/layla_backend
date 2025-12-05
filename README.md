# About This Project

Hi, my name is **Muhmed AlMkkawy**, and this is my **NestJS backend base
project**, created to speed up my backend development workflow and
provide a clean, scalable foundation for REST API projects.

This setup includes all the core modules, configurations, and tools I
commonly use when starting a new NestJS application.

## The goals of this base are to:

-   Provide a ready-to-use structured NestJS architecture
-   Speed up backend project initialization
-   Standardize my development environment
-   Ensure best practices for validation, DTOs, sessions, file uploads,
    and database layer
-   Reduce repeated setup time across multiple projects

# Dependencies & Modules Used in This NestJS Project

This project uses a solid stack of NestJS modules and backend tools for
configuration, validation, sessions, file uploads, and database layer.

## 1. @nestjs/common, @nestjs/core, @nestjs/platform-express

Core NestJS framework modules.

## 2. @nestjs/config

Environment configs with ConfigService.

## 3. dotenv

Loads .env environment variables.

## 4. @nestjs/typeorm + typeorm

Database ORM integration.

## 5. mongodb

MongoDB driver.

## 6. class-validator + class-transformer

DTO validation & transformation.

## 7. cookie-session

Encrypted cookie sessions.

## 8. multer

File upload handling.

## 9. reflect-metadata

Decorator support.

## 10. rxjs

Async reactive utilities.

# Installation

    npm install

# Running the Project

### Development

    npm run start:dev

### Production

    npm run build
    npm run start:prod

# Environment Variables Example

    PORT=3000
    MONGO_URI=mongodb://localhost:27017/mydb
    SESSION_KEY=supersecret

# Example Controller

``` ts
@Post('register')
@UseInterceptors(FileInterceptor('avatar'))
createUser(
  @Body() body: CreateUserDto,
  @UploadedFile() avatar: Express.Multer.File
) {
  return this.userService.create(body, avatar);
}
```
