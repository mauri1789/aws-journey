#!/bin/bash

OPTIONS=p:ibdrw
LONGOPTS=project,install,build,deploy,remove,website

! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")

p=0 i=0 p=0 b=0 d=0 w=0

CF_FILE="/tmp/cf_file.txt"
DEPLOYMENTS_BUCKET="maudeployments"

case "$1" in
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
  -p|--project)
    p=1
    project=$2
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
  echo install
#   mkdir -p build
#   cp -r src/* build/
fi

if [[ $b -eq 1 ]]; then
  echo build
# aws cloudformation package \
#   --template-file template.yaml \
#   --s3-bucket $DEPLOYMENTS_BUCKET \
#   --output-template-file $CF_FILE

fi

if [[ $d -eq 1 ]]; then
  echo deploy
# aws cloudformation deploy \
#   --no-fail-on-empty-changeset \
#   --template-file $CF_FILE \
#   --parameter-overrides Project=cf_lab2  \
#   --stack-name "my-awesome-stack3" \
#   --capabilities CAPABILITY_NAMED_IAM
fi

if [[ $r -eq 1 ]]; then
  echo remove
fi

if [[ $p -eq 1  ]]; then
  echo $project
fi