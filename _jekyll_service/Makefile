JEKYLL=$(shell which jekyll)
PWD=$(shell pwd)
SRCDIR=$(shell dirname ${PWD})

DEF=/etc/default/jekyll.bijianing.github.io
SERVICE=/etc/systemd/system/jekyll.service
DEFLOC=.jekyll.bijianing.github.io

install: ${DEF} ${SERVICE}
	@sudo systemctl daemon-reload

${DEFLOC}: 
	@echo "GEM_HOME=${GEM_HOME}" 	>  $@
	@echo "JEKYLL=${JEKYLL}" 	>> $@
	@echo "SRCDIR=${SRCDIR}" 	>> $@
	@echo "DSTDIR=/tmp/jekyll_dst"	>> $@
	@echo "JEKYLL_OPTS=\"--disable-disk-cache -H 0.0.0.0 \"" >> $@


${DEF}: ${DEFLOC}
	@sudo cp ${DEFLOC} ${DEF}

${SERVICE}: jekyll.service
	@sudo cp jekyll.service $@



.PHONY: install ${DEFLOC}
