#!/bin/bash
read -p "Do you want remove all docker images and data of EKGS? [Y/N]" IS_REMOVE

if [ "$IS_REMOVE" = 'Y' -o "$IS_REMOVE" = 'y' ] ; then
echo "Removing....";

# Remove Images
IMAGE_COUNT=$(docker images | grep 'irs3y/ekgs-*'| awk 'END { print NR }');
if [ $IMAGE_COUNT -gt 0 ]; then
echo "Need to remove $IMAGE_COUNT images"
docker rmi $(docker images | grep 'irs3y/ekgs-*'| awk '{ print $3}')
fi

# Remove Volume (ekgs_configs)
VOLUME_COUNT=$(docker volume list | grep 'ekgs'| awk 'END { print NR }');
if [ $VOLUME_COUNT -gt 0 ]; then
echo "Need to remove $VOLUME_COUNT volumes"
docker volume rm $(docker volume list | grep 'ekgs'| awk 'END { print $2 }')
fi

echo "Done";
fi