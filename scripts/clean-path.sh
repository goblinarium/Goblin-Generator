#!/usr/bin/env bash

sed -i -e 's/href="/href="\/Goblin-Generator/g' docs/index.html
sed -i -e 's/src="/src="\/Goblin-Generator/g' docs/index.html
sed -i -e 's/React App/Goblinarium Goblin Generator/g' docs/index.html
sed -i -e 's/Web site created using create-react-app/Generate goblins from the goblinarium/g' docs/index.html
sed -i -e 's/<\/head>/<script>window.S4_CONSTANTS={isProd: true};<\/script><\/head>/g' docs/index.html
