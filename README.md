# project-ecommerce

push bakcend to heroku

```
git subtree push --prefix backend heroku-backend master

```
build front end

```
heroku apps:create e-commerce-next-prod

git remote add heroku-frontend https://git.heroku.com/e-commerce-next-prod.git

npm run build

git subtree push --prefix frontend heroku-frontend master

```
