---
layout: post
tags:
---
* content
{:toc}

Kernel Version
==============

`<linux kernel root>/Makefile`:
```
VERSION = 4
PATCHLEVEL = 15
SUBLEVEL = 7
EXTRAVERSION = -sdio-300
NAME = Fearless Coyote
```
change these definition to change kernel version number


Rebuild When changed kernel startup command line
================================================

touch `kernel/drivers/of/fdt.c` and rebuild...
