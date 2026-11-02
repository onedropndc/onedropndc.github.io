from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
root=Path('.').resolve(); files=list(root.glob('*.html'))
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.ids=set()
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.add(d['id'])
  if tag in ['a','script','link','img','source']:
   u=d.get('href') or d.get('src')
   if u:self.refs.append((tag,u))
pages={p:Scan() for p in files}
for p,scan in pages.items():scan.feed(p.read_text())
missing=[];anchors=[]
for p,scan in pages.items():
 for tag,url in scan.refs:
  u=urlsplit(url)
  if u.scheme or u.netloc or url.startswith('//') or not u.path and not u.fragment:continue
  target=(p.parent/unquote(u.path or p.name)).resolve()
  if target.is_dir():target=target/'index.html'
  if not target.exists():missing.append((p.name,tag,url))
  elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:anchors.append((p.name,url))
print('Missing static targets:', missing);print('Unresolved static anchors (some are dynamic):',anchors)
if missing or anchors:
 raise SystemExit(1)
print('PASS: local static links and anchors')
