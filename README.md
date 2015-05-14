Seymour-Admin
=============

- make changes, add and commit, and push to a branch (pull request).
- review your changes and merge into master
- master will quick off a codeship pipeline, but the tests don't currently work (TODO - exit with success)


- Merge/push to master will/hould kick off the tests on codeship and deplyoy to Heroku if tests pass

- visit https://seymour-admin.herokuapp.com/login
- TODO - set up Mongo instance.

Locally:

- run mongo: mongod
- run app: foreman web start

