#!/bin/bash

OPTIONS=p:ibdrw
LONGOPTS=project,install,build,deploy,remove,website

! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")

p=0 i=0 p=0 b=0 d=0 w=0

CF_FILE="/tmp/cf_file.txt"
DEPLOYMENTS_BUCKET="maudeployments"

if [[ $1 == "-p" ]] || [[ $1 == "--project" ]]; then
  project=$2
  cd $project
else
  exit 126 # Command invoked cannot execute
fi

case "$3" in
  -i|--install)
    i=1
    shift
    ;;
  -r|--remove)
    r=1
    shift
    ;;
  -b|--build)
    b=1
    shift
    ;;
  -d|--deploy)
    d=1
    shift
    ;;
  -w|--website)
    w=1
    shift
    ;;
  --)
    shift
    break
    ;;
  *)
    ;;
esac

if [[ $i -eq 1 ]]; then
  mkdir -p build
  cp -r src/* build/
fi

if [[ $b -eq 1 ]]; then
  aws cloudformation package \
    --template-file template.yaml \
    --s3-bucket $DEPLOYMENTS_BUCKET \
    --output-template-file $CF_FILE

fi

if [[ $d -eq 1 ]]; then
  echo deploy
  aws cloudformation deploy \
    --no-fail-on-empty-changeset \
    --template-file $CF_FILE \
    --stack-name $project \
    --capabilities CAPABILITY_NAMED_IAM
fi

if [[ $r -eq 1 ]]; then
  echo remove
fi
