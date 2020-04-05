#!/bin/bash

buildcss () {
	scripts/buildcss.sh styles/styles.less build/styles.css 
	lastDate="$(stat -f "%m%t%Sm %N" styles/styles.less)"
}

rm -rf build 
mkdir -p build 
buildcss

npm run-script start-dev &
electron_pid=$!

die () {
	echo "dying"
	kill -s TERM "${electron_pid}" 		
	exit 0
}

trap die SIGTERM SIGINT

echo trapping on $electron_pid

lastDate="$(stat -f "%m%t%Sm %N" styles/styles.less)"
echo $lastDate

while true; do 
	newDate=$(stat -f "%m%t%Sm %N" styles/styles.less) ; 
	if [ "$lastDate" != "$newDate" ]; then 
		sleep 1 
		echo $newDate -- REBUILD
		buildcss
	else
		sleep 1
	fi
done

