---
layout: post
tags: Ubuntu
---
* content
{:toc}


Ubuntu mouse not work after resume from sleep
=============================================

1. Make sure your device module is psmouse by running,
```
lsmod | grep psmouse
```
if its not, find the relavant module name.

2. create script for resume from sleep
```
$ cd /lib/systemd/system-sleep/
$ sudo vi fixtouchpad
```

3. then paste and save the following
```
#!/bin/bash
[ "$1" = "post" ] && exec modprobe psmouse
[ "$1" = "pre" ] && exec rmmod psmouse
exit 0
```
This will reload your psmouse module after resuming. Replace 'psmouse' with your module name.

4. Be sure to make the script executable
```
sudo chmod +x fixtouchpad
```


Air capture form Ubuntu
=======================

1. disable network manager
```
sudo systemctl stop NetworkManager
```

2. create network interface
```
sudo iw phy phy0 interface add wlanmon0 type monitor
sudo ifconfig wlanmon0 up
```

3. change channel
```
sudo iwconfig wlanmon0 channel 11
```


Action when close lid
=====================

1. Change `HandleLidSwitch` in `/etc/systemd/logind.conf`
```
sudo vi sudo gedit /etc/systemd/logind.conf
```
    - `HandleLidSwitch=lock` – lock when lid closed.
    - `HandleLidSwitch=ignore` – do nothing.
    - `HandleLidSwitch=poweroff` – shutdown.
    - `HandleLidSwitch=hibernate` – hibernate Ubuntu.

2. Restart logind
```
sudo systemctl restart systemd-logind
```

systemd in Ubuntu
=================

reference: 
- Ubuntu man page [systemd.service](http://manpages.ubuntu.com/manpages/cosmic/man5/systemd.service.5.html)
- Ubuntu man page [systemd.exec](http://manpages.ubuntu.com/manpages/cosmic/man5/systemd.exec.5.html)


`systemd` is a manage system for system service. including the action: start/stop/restart, auto start etc.

1. Concept
	* `Unit File`  
	  The file define the service which locate at `/etc/systemd/system` or `/lib/systemd/system`
	    - `/etc/systemd/system`: administrator change setting in this directory
	    - `/lib/systemd/system`: default system settings
	* `Environment File`  
	  The file define Environment variables for `Unit File`.  
	  Specify the `Environment File` in `Unit File` with `EnvironmentFile=/path/to/file`.  
	  The location of `Environment File` often in `/etc/default/*`
	* `systemctl` command  
	  The command manage services. start / stop / restart etc.

2. `Unit File`  
	- example
		```
		[Unit]
		Description=Start Jekyll server for bijianing.github.io

		[Service]
		Type=simple
		EnvironmentFile=/etc/default/jekyll.bijianing.github.io
		ExecStart=ruby $JEKYLL server -s $SRCDIR -d $DSTDIR $JEKYLL_OPTS
		ExecStop=kill -INT $MAINPID

		[Install]
		WantedBy = multi-user.target
		```
3. `systemctl` command  
	- `sudo systemctl daemon-reload`  
		reload configurations of all units
	- `sudo systemctl [start | stop | restart] unit`  
		start / stop / restart unit
	- `sudo systemctl status unit`  
		show status of unit
		start / stop / restart unit
	

Update Kernel manually
=====================

- reference  
  [Ubuntuで最新のカーネルをお手軽にビルドする方法](https://gihyo.jp/admin/serial/01/ubuntu-recipe/0526?page=2)
- build kernel need 30GB disk space, So I used USB HDD(80GB)


1. Install necessary packages
```
sudo apt install git ccache fakeroot libncurses5-dev
sudo apt build-dep linux
```

2. Download source code
```
git clone https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
cd linux
```

3. Prepare config file
```
mkdir ../build
cp /boot/config-`uname -r` ../build/.config
scripts/config --file ../build/.config --disable DEBUG_INFO
make O=../build/ olddefconfig
```

4. Build kernel and modules
```
time make -j9 O=../build/ LOCALVERSION=-stock
time make modules -j9 O=../build/ LOCALVERSION=-stock
```

5. Create and install packages for Ubuntu
```
make bindeb-pkg O=../build/ LOCALVERSION=-stock
sudo apt install ../*.deb
```

