# Running

## Normal running

This will rebuild the style sheets before running.

```sh
npm start
```

## For testing

Running this command will set up a loop to watch and rebuild the style sheets whenever they get update. A ⌘-R will refresh the screen.

```sh
npm start & a="$(stat -f "%m%t%Sm %N" styles/styles.less)" ; echo $a ; while true; do b=$(stat -f "%m%t%Sm %N" styles/styles.less) ; if [ "$a" != "$b" ]; then sleep 1 ; echo $b -- REBUILD; a="${b}" ; lessc styles/styles.less build/styles.css ; else sleep 1 ; fi; done
```

