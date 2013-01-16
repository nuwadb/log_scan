#!/bin/sh

REMOTE_GIT_REPO=github.com:nuwadb

echo "Adding project into GIT repository: $REMOTE_GIT_REPO"
echo "Add project to gitosis.conf before running this script!"

if [ -n "$1" ]
then
echo "project name: $1"
else
echo $"Usage: git_new_repo.sh <repo_name>"
exit 1
fi

echo "Remove old git db"
rm -rf .git


echo "Add all files to git repo"
git init
git add .

echo "git commit"
git commit -m "init" -a
git remote add origin git@$REMOTE_GIT_REPO/$1.git
echo "Push to remote repository"
git push -u origin master

