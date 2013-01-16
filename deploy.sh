#!/bin/sh

APP_HOME="/opt/lvdb/node"
APP="log_scan"
APP_DIR="$APP_HOME/$APP"
APP_USER="lvdb"

echo "Check destination directory: $APP_DIR"
if [ -d "$APP_DIR" ]
then
   echo "Directory found!"
else
   echo "Create new directory: $APP_DIR"
   sudo mkdir -p $APP_DIR
   sudo install -m 755 $APP /etc/init.d
fi

#sudo cp -r * /opt/lvdb/node/lvdb/.
#sudo cp -r [!.]* ../cp_dest
sudo rsync -a --exclude .git * $APP_DIR
sudo chown -R $APP_USER $APP_DIR
