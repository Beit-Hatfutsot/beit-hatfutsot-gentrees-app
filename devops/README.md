# Devops Documentation

## deployment

* publish a release on github
* modify the RELEASE_VERSION below to the version you published
* run the following deployment code

```
sudo su -l ftapp
export RELEASE_VERSION="1.0.0"
export RELEASE_URL="https://github.com/Beit-Hatfutsot/beit-hatfutsot-gentrees-app/archive/v${RELEASE_VERSION}.tar.gz"
wget $RELEASE_URL
tar -xzf "v${RELEASE_VERSION}.tar.gz"
export NEW_DIR="`pwd`/beit-hatfutsot-gentrees-app-${RELEASE_VERSION}"
export CURRENT_DIR="`pwd`/current"
export MERGE_DIR="`pwd`/merge"
export OLD_DIR="`pwd`/`date +%Y-%m-%d`"
cp -r $CURRENT_DIR $MERGE_DIR
rsync -a $NEW_DIR/ $MERGE_DIR/
cd $MERGE_DIR
npm install
bower install
cd ..
mv $CURRENT_DIR $OLD_DIR
mv $MERGE_DIR $CURRENT_DIR
df -h
```

To start local server for dev purposes, run `gulp` and open your browser at `http://localhost:3000`.

To compile and deploy client code into server public dir run run `gulp rebuild-client`.

The server main file is `server.js`.
