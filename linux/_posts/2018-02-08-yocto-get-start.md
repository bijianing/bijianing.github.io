---
layout: post
date: 2018-02-08 12:26:49 +0900
tags: Yocto

---
* content
{:toc}

References 
===========
* [OpenEmbedded User Manual](http://www.embeddedlinux.org.cn/OEManual/index.html)


Change kernel itb's rootfs image
================================

Change ROOTFS_IMAGE variable below:
```
../sources/meta-freescale/recipes-fsl/images/fsl-image-kernelitb.bb
	ROOTFS_IMAGE ?= "fsl-image-core"
```


Add extra package to rootfs image
================================

Change IMAGE_INSTALL_append variable below:
```
../sources/meta-freescale/recipes-fsl/images/fsl-image-core.bb
	IMAGE_INSTALL_append
```

Add own package to rootfs image
=================================

Purporse
------------
* Add libptp to rootfs image.
* libptp's source resides in github https://github.com/jrabbit/libptp-chdk.git
* Add some self developed program to roofs image

reference:
------------
* [Yocto wiki](https://wiki.yoctoproject.org/wiki/Building_your_own_recipes_from_first_principles)

Procedure
------------

1. prepare a layer  
	There are two options  
	1. Placing a recipe in an existing layer  
	2. Using a new layer for recipes  
		example layer struct:
		```
		├── conf
		│   └── layer.conf
		└── recipes-ptp
		    └── libptp2
		        ├── files
		        │   └── configure.in.patch
		        └── libptp2_1.2.0.bb
		```
		`layer.conf`'s contents:
		```shell
		# We have a conf and classes directory, add to BBPATH
		BBPATH .= ":${LAYERDIR}"
		# We have recipes-* directories, add to BBFILES
		BBFILES += "${LAYERDIR}/recipes-*/*/*.bb \
	    ${LAYERDIR}/recipes-*/*/*.bbappend"
		BBFILE_COLLECTIONS += "xacti"
		BBFILE_PATTERN_xacti = "^${LAYERDIR}/"
		BBFILE_PRIORITY_xacti = "6"
		```
2. Build package  
There are two options too.  
	1. Build an example package based on a git repository commit  
	example of `<package>_<version>.bb` file
	```
	#
	# This file was derived from the 'Hello World!' example recipe in the
	# Yocto Project Development Manual.
	#
	DESCRIPTION = "Simple helloworld application"
	SECTION = "examples"
	DEPENDS = ""
	LICENSE = "MIT"
	LIC_FILES_CHKSUM = "file://LICENSE;md5=96af5705d6f64a88e035781ef00e98a8"
	FILESEXTRAPATHS_prepend := "${THISDIR}/${PN}-${PV}:"
	SRCREV = "4ec84957442182f36351f94c0626560ec3ffd487"
	SRC_URI = "git://github.com/DynamicDevices/bbexample.git"
	S = "${WORKDIR}/git"
	inherit autotools
	# The autotools configuration I am basing this on seems to have a problem with a race condition when parallel make is enabled
	PARALLEL_MAKE = ""
	```
	2. Build an example package based on a local source archive  
	example of `<package>_<version>.bb` file
	```
	#
	# This file was derived from the 'Hello World!' example recipe in the
	# Yocto Project Development Manual.
	#
	DESCRIPTION = "Simple helloworld application"
	SECTION = "examples"
	DEPENDS = ""
	LICENSE = "MIT"
	LIC_FILES_CHKSUM = "file://LICENSE;md5=96af5705d6f64a88e035781ef00e98a8"
	FILESEXTRAPATHS_prepend := "${THISDIR}/${PN}-${PV}:"
	SRC_URI = "https://github.com/DynamicDevices/bbexample/releases/download/v1.0/bbexample-${PV}.tar.gz"
	SRC_URI[md5sum] = "e15723f0d5ac710bbe788cd3a797bc44"
	SRC_URI[sha256sum] = "0b34eb133596348bb6f1a3ef5e05e4d5bf0c88062256affe768d8337d7cc8f83"
	# Make sure our source directory (for the build) matches the directory structure in the tarball
	S = "${WORKDIR}/bbexample-${PV}"
	inherit autotools
	# The autotools configuration I am basing this on seems to have a problem with a race condition when parallel make is enabled
	PARALLEL_MAKE = ""
	```
	3. Build an example package based on a remote source archive  
	example of `<package>_<version>.bb` file
	```
	#
	# This file was derived from the 'Hello World!' example recipe in the
	# Yocto Project Development Manual.
	#
	DESCRIPTION = "Simple helloworld application"
	SECTION = "examples"
	DEPENDS = ""
	LICENSE = "MIT"
	LIC_FILES_CHKSUM = "file://LICENSE;md5=96af5705d6f64a88e035781ef00e98a8"
	FILESEXTRAPATHS_prepend := "${THISDIR}/${PN}-${PV}:"
	SRC_URI = "https://github.com/DynamicDevices/bbexample/releases/download/v1.0/bbexample-${PV}.tar.gz"
	SRC_URI[md5sum] = "e15723f0d5ac710bbe788cd3a797bc44"
	SRC_URI[sha256sum] = "0b34eb133596348bb6f1a3ef5e05e4d5bf0c88062256affe768d8337d7cc8f83"
	# Make sure our source directory (for the build) matches the directory structure in the tarball
	S = "${WORKDIR}/bbexample-${PV}"
	inherit autotools
	# The autotools configuration I am basing this on seems to have a problem with a race condition when parallel make is enabled
	PARALLEL_MAKE = ""
	```


Bitbake options
===============

reference
---------
* [Bitbake options wiki](http://wiki.kaeilos.com/index.php/Bitbake_options)


Basic options
------------
* `bitbake -e`   
	Displays the internal state of variables used by BitBake
* `bitbake -c cleansstate <pkgname>`   
	Cleans up all the tasks state with regard to the given <pkgname> This option is frequently used during the development of new recipes
* `bitbake <pkgname> -c rebuild -f`  
	Clean and build again a package
* `bitbake -c CMD <pkgname>`  
	Specify the task to execute. The exact options available depend on the metadata
* `bitbake -c listtasks core-image-minimal`  
	```
do_build                       Default task for a recipe - depends on all other normal tasks required to 'build' a recipe
do_bundle_initramfs            Combines an initial ramdisk image and kernel together to form a single image
do_checkuri                    Validates the SRC_URI value
do_checkuriall                 Validates the SRC_URI value for all recipes required to build a target
do_clean                       Removes all output files for a target
do_cleanall                    Removes all output files, shared state cache, and downloaded source files for a target
do_cleansstate                 Removes all output files and shared state cache for a target
do_compile                     Compiles the source in the compilation directory
do_configure                   Configures the source by enabling and disabling any build-time and configuration options for the software being built
do_devshell                    Starts a shell with the environment set up for development/debugging
do_fetch                       Fetches the source code
do_fetchall                    Fetches all remote sources required to build a target
do_install                     Copies files from the compilation directory to a holding area
do_listtasks                   Lists all defined tasks for a target
do_package                     Analyzes the content of the holding area and splits it into subsets based on available packages and files
do_package_setscene            Analyzes the content of the holding area and splits it into subsets based on available packages and files (setscene version)
do_package_write_rpm           Creates the actual RPM packages and places them in the Package Feed area
do_package_write_rpm_setscene  Creates the actual RPM packages and places them in the Package Feed area (setscene version)
do_packagedata                 Creates package metadata used by the build system to generate the final packages
do_packagedata_setscene        Creates package metadata used by the build system to generate the final packages (setscene version)
do_patch                       Locates patch files and applies them to the source code
do_populate_lic                Writes license information for the recipe that is collected later when the image is constructed
do_populate_lic_setscene       Writes license information for the recipe that is collected later when the image is constructed (setscene version)
do_populate_sdk                Creates the file and directory structure for an installable SDK
do_populate_sysroot            Copies a subset of files installed by do_install into the sysroot in order to make them available to other recipes
do_populate_sysroot_setscene   Copies a subset of files installed by do_install into the sysroot in order to make them available to other recipes (setscene version)
do_rootfs                      Creates the root filesystem (file and directory structure) for an image
do_unpack                      Unpacks the source code into a working directory
	```


