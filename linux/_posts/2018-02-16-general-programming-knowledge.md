---
layout: post
date: 2018-02-16 10:33:04 +0900
tags:

---
* content
{:toc}

Autotools
===========

Also known as `GNU Build System`.
Well descripted at [Wiki](https://en.wikipedia.org/wiki/GNU_Build_System)

References
-----------

* [Autoconf Manual](https://www.gnu.org/software/autoconf/manual/html_node/index.html)
* [Automake Manual](https://www.gnu.org/software/automake/manual/automake.html)
* [petazzoni-autotools-tutorial.pdf](https://events.static.linuxfound.org/sites/events/files/slides/petazzoni-autotools-tutorial.pdf)


Overall description
-------------------

* Flow diagram of autoconf and automake: original image is [here](https://upload.wikimedia.org/wikipedia/commons/8/84/Autoconf-automake-process.svg)   
	![Flow diagram of autoconf and automake](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Autoconf-automake-process.svg/400px-Autoconf-automake-process.svg.png)

* Overall organization from [petazzoni-autotools-tutorial.pdf](https://events.static.linuxfound.org/sites/events/files/slides/petazzoni-autotools-tutorial.pdf) 
original image is [here](images/autotools_overall.png)    
	<img src="images/autotools_overall.png" style="width:100%">


Regenerating autotools files: autoreconf
----------------------------------------

* To generate all the files used by autotools, you could call automake, autoconf, aclocal, autoheader, etc. manually.
  *  But it is not very easy and efficient.
* A tool called autoreconf automates this process
  * Useful option: -i or --install, to ask autoreconf to copy missing auxiliary files
* Always use autoreconf!


configure.ac language
---------------------

* configure.ac is a shell script.
* it used to be named configure.in but this name is now deprecated
* Processed through the m4 preprocessor
* Shell script augmented with special constructs for portability:
  * `AS_IF` instead of shell `if ... then .. fi`
  * `AS_CASE` instead of shell `case ... esac`


Some Macros
-----------

* `AC_INIT(package, version, [bug-report], [tarname], [url])`
  * Every conﬁgure script must call AC_INIT before doing anything else that produces output.
* `AC_OUTPUT`
  * Every configure.ac, should ﬁnish by calling AC_OUTPUT.
  * Generates and runs config.status, which in turn creates the makeﬁles and any
    other ﬁles resulting from conﬁguration.
* `AC_PREREQ`
  * Veriﬁes that a recent enough version of autoconf is used
* `AC_PROG_CC, AC_PROG_CXX, AC_PROG_AWK, AC_PROG_GREP, AC_PROG_LEX, AC_PROG_YACC`
  * makes sure a compiler, awk, grep, etc. is available
* `AC_CONFIG_FILES (file..., [cmds], [init-cmds])`
  * Make AC_OUTPUT create each file by copying an input `file` (by default `file.in`),
    substituting the output variable values.
  * Example: `AC_CONFIG_FILES([Makefile src/Makefile])`
* Many other macros in [Manual](https://www.gnu.org/savannah-checkouts/gnu/autoconf/manual/autoconf-2.69/html_node/Existing-Tests.html#Existing-Tests)


Output variables
----------------

* autoconf will replace `@variable@` constructs by the appropriate values in files listed in `AC_CONFIG_FILES`
* Long list of standard variables replaced by autoconf
* Additional shell variables declared in configure.ac can be replaced using `AC_SUBST`
  * The following three examples are equivalent:
    ```
AC_SUBST([FOO], [42])
    ```
    ```
FOO=42
AC_SUBST([FOO])
    ```
    ```
AC_SUBST([FOO])
FOO=42
    ```

