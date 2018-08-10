# Hogyan dolgozunk?
+ kerüljük a kódban az ékezetes karaktereket
+ minden vizuban legyen minden js változónak és függvénynek egyedi neve, pl az svg helyett lehet svg_02_04, a width helyett pedig lehet width_02_04
+ minden vizunál a div id és class nevek legyenek az adott vizura jellemzően egyediek, pl div id="viz" helyett használjuk a div id="viz_02_04"-et

# Wordpress szállítás
+ a divi-integration branchen található egyelőre a "build" script ami a wp-habitat mappa alá elkészíti minden js,css és html file minify-olt verzióját. ezt a minify-olt contentet célszerű berakni a divi editorban is (code block).
  +  az alábbi csomagok megléte szükséges: `sudo npm install uglifyjs cssnano cssnano-cli html-minifier -g`
+ ezt a mappát egy az egyben fel tudjátok tölteni a wordpress-re. Az admin oldalon a menüben fogtok találni egy "wp file manager" menüpontot (https://utah.fixversion.com/wp-admin/admin.php?page=wp_file_manager) Feltölthettek egy-egy file-t is, de egyben a wp-habitat mappát is. 
+ a felületen a feltöltéshez használd floppy ikont egy zöld plusz jellel vagy jobb egérgomb. 
  + @TODO igyekszem belőni a feltöltést rest api-n.
