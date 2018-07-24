for d in $(find . -type f -name "*.html"); do echo $d ; done
for d in $(find . -type f -name "*.html"); do sed -i 's#../js#/wp-habitat/js' $d ; done
for d in $(find . -type f -name "*.html"); do sed -i 's#../js#/wp-habitat/js#g' $d ; done
for d in $(find . -type f -name "*.html"); do sed -i 's#../vizs#/wp-habitat/vizs#g' $d ; done
for d in $(find . -type f -name "*.html"); do sed -i 's#../../data#/wp-habitat/data#g' $d ; done
for d in $(find . -type f -name "*.js"); do sed -i 's#../vizs#/wp-habitat/vizs#g' $d ; done
for d in $(find . -type f -name "*.js"); do sed -i 's#../data#/wp-habitat/data#g' $d ; done
for d in $(find . -type f -name "*.html"); do sed -i 's#../css#/wp-habitat/css#g' $d ; done
for d in $(find . -type f -name "*.html"); do sed -i 's#<iframe src="#<iframe src="/wp-habitat/#g' $d ; done
