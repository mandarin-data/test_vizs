from os import listdir
from os.path import join, isfile, isdir

in_path = 'vizs'
dirs = [d for d in listdir(in_path) if isdir(join(in_path, d))]

links = []
for dir in dirs:
    fs = [f for f in listdir(join(in_path, dir)) if isfile(join(in_path, dir, f))]
    for f in fs:
        link = join(in_path, dir, f)
        links.append(link)
    ds = [d for d in listdir(join(in_path, dir)) if isdir(join(in_path, dir, d))]
    for d in ds:
        fs = [f for f in listdir(join(in_path, dir, d)) if isfile(join(in_path, dir, d, f))]
        for f in fs:
            link = join(in_path, dir, d, f)
            links.append(link)

links = sorted(links)

html_begin = """<!DOCTYPE html>
<html>
<body>
"""

for link in links:
    name = link.split('/')[-1].split('.')[0]
    insert = """<p><a href="%s">%s</a></p>""" % (link, name)
    html_begin += '\n' + insert + '\n'

html_begin += """</body>
</html>"""

with open('index.html', 'w') as f:
    f.write(html_begin)
