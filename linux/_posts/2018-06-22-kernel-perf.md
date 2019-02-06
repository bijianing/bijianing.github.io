---
layout: post
tags: performance perf kernel
---
* content
{:toc}


Kernel Option
=============
CONFIG_PERF_EVENTS
General setup → Kernel Performance Events And Counters → Kernel performance events and counters


Notices
========

タイマー周波数(Kernel Features → Timer frequency / CONFIG_HZ=1000)を1000HZにする（sample pointが少なくなるため）


perf tools build option
=======================
`EXTRA_CFLAGS=--sysroot=/home/.../output/host/arm-buildroot-linux-gnueabihf/sysroot make tools/perf`


FlameGraph
==========

### Prepare FlameGraph
1. `git clone https://github.com/brendangregg/FlameGraph`
2. `cd FlameGraph`

### get performance data (execute in target system)
1. `perf record -a -F 999 -g -- iperf -c 192.168.137.2`   
   option `-a` is important, this will make perf see the global environment.
2. `perf script > iperf.script.bm25.send`
3. `scp iperf.script.bm25.send bjn@192.168.137.2:~/wk/FlameGraph/`

### Generate FlameGraph
1. `cat iperf.script.bm25.send | ./stackcollapse-perf.pl > out.iperf-folded.bm25.send`
2. `./flamegraph.pl out.iperf-folded.bm25.send  > iperf.bm25.send.svg`



