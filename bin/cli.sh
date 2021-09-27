#!/usr/bin/env bash

case $1 in
    "tag" )
        echo "create tag $2"
        git tag $2
        git tag
        exit
    ;;
    "del_ltag" )
        echo "delete tag $2"
        git tag -d $2
        git tag
        exit
    ;;
    "del_rtag" )
        echo "delete remote tag $2"
        git push --delete origin $2
        exit
    ;;
    "push_tag" )
        echo "push tag $2"
        git push origin $2
        exit
    ;;
    * ) echo "help: tag, del_ltag, del_rtag, push_tag"
esac
