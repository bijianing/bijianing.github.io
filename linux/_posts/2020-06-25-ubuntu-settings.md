---
layout: post
tags: Ubuntu
---
* content
{:toc}

# Ubuntu mouse not work after resume from sleep

- Make sure your device module is psmouse by running,
```
lsmod | grep psmouse
```
if its not, find the relavant module name.
- create script for resume from sleep
```
$ cd /lib/systemd/system-sleep/
$ sudo vi fixtouchpad
```
- then paste and save the following
```
#!/bin/bash
[ "$1" = "post" ] && exec modprobe psmouse
[ "$1" = "pre" ] && exec rmmod psmouse
exit 0
```
This will reload your psmouse module after resuming. Replace 'psmouse' with your module name.
- Be sure to make the script executable
```
sudo chmod +x fixtouchpad
```


