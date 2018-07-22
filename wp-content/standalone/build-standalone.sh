cat header.tmpl > index.html

for html in $(find ../../vizs -type f -name "*.html");
do
  name=$(echo "$html" | awk -F '/' '{print $NF}' | awk -F '_' '{print $1$2}')
  echo "<div id=\"$name\" style=\"margin: 20px 0px 10px 10px; border: 1px solid #CCC;\">&nbsp;</div>" >> index.html
  echo "<script type=\"text/javascript\">" >> index.html
  echo "\$(\"#$name\").load(\"$html\");" >> index.html
  echo "</script>" >> index.html

done
cat footer.tmpl >> index.html
