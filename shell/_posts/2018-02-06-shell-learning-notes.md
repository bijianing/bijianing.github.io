---
layout: post
title: "shell learning notes"
date: 2018-02-06 10:31:12 +0900
tags: bash

---
* content
{:toc}


$@ And $*
===========

test.sh
---------
Output count of arguments, and all arguments
```shell
echo '$#  :' \"$#\"
cnt=$#

for (( i = 0; i < $cnt; i++ )); do
        echo "arg[$i]: $1"
        shift
done
```

test result
------------
with double quote, the result is different.
```
~/wk$ set a b c
~/wk$ /tmp/test.sh "$@"
$#  : "3"
arg[0]: a
arg[1]: b
arg[2]: c
~/wk$ /tmp/test.sh "$*"
$#  : "1"
arg[0]: a b c
```

Output color
============

References
-----------
[シェル - echoで文字に色をつける その1](http://www.m-bsys.com/linux/echo-color-1)

Syntax
-------
```shell
ESC[色属性m
```

Color Code
----------

|Code |Color|
|:--- |:--- |
|0    |Black|
|1    |Red  |
|2    |Green  |
|3    |Yellow  |
|4    |Blue  |
|5    |Magenta  |
|6    |Cyan  |
|7    |White  |


付加属性
--------

|属性番号 |attributes       |属性   |
|:------- |:--------------- |:----- |
|1        |bold             |太字   |
|2        |low intensity    |弱強調 |
|4        |underline        |下線   |
|5        |blink            |点滅   |
|7        |reverse video    |反転   |
|8        |invisible text   |非表示 |

Uppercase / Lowercase
=====================

|Format |description       |
|:-------  |:--------------- |
|`${v^}`   | 大文字化(１文字目のみ) |
|`${v^^}`  | 大文字化(全文字)       |
|`${v,}`   | 小文字化(１文字目のみ) |
|`${v,,}`  | 小文字化(全文字)       |
