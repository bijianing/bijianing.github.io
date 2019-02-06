
function usage() {
echo "$0 <category> <title without quotation>"
}

if [ "${#*}" -lt 2 ]; then
	usage
	exit 1
fi

cate=$1
path=$cate/_posts

if [ ! -d "$path" ]; then
	echo "category directory \"$path\" not exists"
	exit 2
fi

filename="`date '+%Y-%m-%d'`-$2"
title="${2^}"
shift 2
for a in $* ; do
	filename+="-${a}"
	title+=" ${a^}"
done

path+=${filename}.md

if [ -f "$path" ]; then
	echo "file:$path exists, overwrite it? [y/N]"
	read ans
	ans=${ans^^}
	if [ "$ans" = "Y" ] || [ "$ans" = "YES" ]; then
		echo "Overwrite $path"
	else
		echo "not overwrite $path"
		exit 1
	fi
fi

cat << EOS > $path
---
layout: post
title: "$title"
date: `date '+%Y-%m-%d %H:%M:%S %z'`
tags:

---

* content
{:toc}
EOS

echo $path
