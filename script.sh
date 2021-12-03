#!/bin/bash
pdflatex new.tex
convert -density 300 -trim -flatten new.pdf -quality 100 new.png