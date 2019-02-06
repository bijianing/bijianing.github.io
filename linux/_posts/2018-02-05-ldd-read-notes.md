---
layout: post
title: "LDD read notes"
date: 2018-02-05 11:47:44 +0900
tags: LDD Reading Kernel Driver

---


## Chapter 3 Char Drivers
-------------------------


### The Internal Representation of Device Numbers

* `<linux/kdev_t.h>` Header

* `dev_t` in Kernel 2.6.0, 32-bit, 12-bit major number, 20-bit minor number.

* `MAJOR(dev_t dev);`

* `MINOR(dev_t dev);`

* `MKDEV(int major, int minor);`

### Allocating and Freeing Device Numbers

* `int register_chrdev_region(dev_t first, unsigned int count, char *name);`  
	alloc a range of device number from first to first + count.

* `int alloc_chrdev_region(dev_t *dev, unsigned int firstminor, unsigned int count, char *name);`

* `void unregister_chrdev_region(dev_t first, unsigned int count);`
