#!/bin/bash

tmp=$(mktemp)
minify=false

if [ "$1" == '-minify' ]; then
	minify=true
	shift
fi

while IFS="" read -r p || [ -n "$p" ]
do
	if [[ $p =~ '@@head' ]]; then
		node scripts/figlet.js $p >>$tmp
	else
    	printf '%s\n' "$p" >>$tmp
    fi
done < $1

cp $tmp $1

csstmp=$(mktemp)
lessc $1 $csstmp

if $minify; then

	html-minifier --collapse-whitespace --remove-comments --remove-optional-tags \
				--remove-redundant-attributes --remove-script-type-attributes \
				--remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true \
				"$csstmp" > "$2"

else 

	cp $csstmp $2

fi