const fs = require('fs');
const content = fs.readFileSync('views/template.php', 'utf8');
content.split('\n').forEach((l, i) => {
    if(l.includes('title="') && !l.includes('<?=')) {
        console.log(i + ': ' + l.trim());
    }
});
