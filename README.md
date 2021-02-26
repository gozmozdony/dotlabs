# thisdotlabs
## Repository
This is a monorepo for the given task. It includes api specification, server and client code as well.
Also it contains the required SAM templates to deploy.

## Why this approach
In order to hide the api key from the client it is a good approach to use a proxy layer between github API and the constructed client.
You can check the full architecture diagram in the dotlabs_architecture.drawio

## API Specification
To check the current API Specification run the following commands inside the apiSpecification folder.

### Install packages for api spec:

`yarn install`

### Run api servlet:

`yarn run api`

## Server 
### PreRequisites
- AWS Trial account
- SAM CLI
- SAM credentials configured
- S3 bucket
### Commands
#### Test
Run tests

`yarn run test`
#### Build
Build the code

`yarn run test`
#### Package
Package the code into an artifact and push to an S3 bucket
#### Deploy
Deploy the IaC and create/update services
## Client
### TBD

## Issues
- The deployed Lambda is set up in gateway as a Proxy
- The deployed gateway resource CORS still have an issue
- The deployed gateway resource needs query params in the templating

## Nice to Haves
- Full Ci/CD pipeline
- Router for FE app
- CORS and domain settings due to security
- WAF
- One time JWT token between FE and BE
- BE Authorizer for token
- Workbox - GraphQl - Apollo caching
- State management for FE VueX ?
- Linter settings for BE
- Pre commit Hook - linter+test
- Integration test for BE
- FE snapshot testing
- Shared package for typings 
- Auto .env generation for endpoint for FE
