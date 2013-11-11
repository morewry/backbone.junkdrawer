@echo off

set projdir=%~d0%~p0

:start

styledocco -n "" -o docs --include docs/preview.css --include css/all.css --preprocess
or "scss --compass" css/sass --verbose

shift
if NOT x%1==x goto start
