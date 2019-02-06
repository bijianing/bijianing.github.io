---
layout: post
tags:
---
* content
{:toc}


Reference
=========
http://www.youchikurin.com/blog/2007/06/linuxlan_1.html


Examples （認証方式 + 暗号方式）
===============================

WPA-PSK  ＋　TKIP
---------------------------------

```
network={
ssid="myid"
proto=WPA
key_mgmt=WPA-PSK
pairwise=TKIP
group=TKIP
psk=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
}
```

WPA-PSK  ＋　AES
---------------------------------

```
network={
ssid="myid"
proto=WPA
key_mgmt=WPA-PSK
pairwise=CCMP
group=CCMP
psk=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
}
```

WPA2-PSK  ＋　TKIP
---------------------------------

```
network={
ssid="myid"
proto=RSN
key_mgmt=WPA-PSK
pairwise=TKIP
group=TKIP
psk=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
}
```

WPA2-PSK  ＋　AES
---------------------------------

```
network={
ssid="myid"
proto=RSN
key_mgmt=WPA-PSK
pairwise=CCMP
group=CCMP
psk=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
}
```

WEP128
---------------------------------

```
network={
ssid="myid"
key_mgmt=NONE
wep_key0="1234567890123"
wep_tx_keyidx=0
}
```


