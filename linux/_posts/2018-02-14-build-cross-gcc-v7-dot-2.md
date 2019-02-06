---
layout: post
title: "Compile arm gcc v7.2"
date: 2018-02-14 17:23:23 +0900
tags: gcc linaro

---
* content
{:toc}

References
==========

* [Building GCC on Ubuntu Linux](https://solarianprogrammer.com/2016/10/07/building-gcc-ubuntu-linux/)
* [Gcc Manual - 3.18.4 ARM Options](https://gcc.gnu.org/onlinedocs/gcc/ARM-Options.html)
* [Installing GCC](https://gcc.gnu.org/install/build.html)

Procedure (this was failed!!)
=========
1. Download source code
	https://releases.linaro.org/components/toolchain/gcc-linaro/latest/
2. Download needed files
```
tar xvf gcc-linaro-7.2-2017.11.tar.xz
cd gcc-linaro-7.2-2017.11
vi contrib/download_prerequisites
# change ftp://gcc.gnu... to https://gcc.gnu
./contrib/download_prerequisites
```
3. configure & build
```
mkdir build
cd build
../configure --target=arm-linux-gnueabihf --prefix=$HOME/opt/gcc-linaro-7.2 --program-prefix=linaro-arm-linux-gnueabihf- --disable-multilib --with-arch=armv7-a --with-tune=cortex-a7 --with-abi=aapcs-linux --with-fpu=neon-vfpv4 --with-float=hard --with-mode=arm
make -j 8
```

