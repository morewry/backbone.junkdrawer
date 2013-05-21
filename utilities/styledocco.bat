@echo off

set projdir=%~d0%~p0

:start

styledocco --name "" --out docs --include docs/preview.css css/all.css --verbose

shift
if NOT x%1==x goto start