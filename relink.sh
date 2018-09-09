#!/bin/bash
find . -type f -name "*.html" -print0 | xargs -0 sed -i -e 's/\.\.\/\.\.\/\.\.\//\/wp-habitat\//g'
find . -type f -name "*.html" -print0 | xargs -0 sed -i -e 's/\.\.\/\.\.\//\/wp-habitat\//g'
find . -type f -name "*.html" -print0 | xargs -0 sed -i -e 's/\.\.\//\/wp-habitat\//g'
find . -type f -name "*.css" -print0 | xargs -0 sed -i -e 's/\.\.\/\.\.\//\/wp-habitat\//g'
find . -type f -name "*.js" -print0 | xargs -0 sed -i -e 's/\.\.\/\.\.\//\/wp-habitat\//g'
