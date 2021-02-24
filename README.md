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

## Nice to Haves
- Full Ci/CD pipeline
