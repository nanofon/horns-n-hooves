## To view the hosted build
https://nanofon.github.io/horns-n-hooves/

## To set up locally
npm install
npm run dev -> runs dev server on localhost:4321

## To build run 
npm run build -> builds to ./dist/          |

## To deploy to gh-pages
git checkout --orphan gh-pages-deploy
git --work-tree dist add --all
git commit -m "Deploy: Overwrite gh-pages with latest build"
git push -f origin gh-pages-deploy:gh-pages
git checkout main --force
git branch -D gh-pages-deploy
