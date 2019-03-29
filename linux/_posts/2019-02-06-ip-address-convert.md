---
layout: post
title: "Ip Address Convert"
date: 2019-02-06 14:48:56 +0900
tags:

---

* content
{:toc}

API
=======
1. text to binary: [inet_pton](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/inet_pton.3.html)
```
#include <arpa/inet.h>
int inet_pton(int af, const char *src, void *dst);
```
2. binary to text: [inet_ntop](https://linuxjm.osdn.jp/html/LDP_man-pages/man3/inet_ntop.3.html)
```
#include <arpa/inet.h>
const char *inet_ntop(int af, const void *src,char *dst, socklen_t size);`
```



