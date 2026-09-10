const fs = require('fs');
const styles = `
.hover\\:border-emerald-600:hover { border-color: #059669; }
`;
fs.appendFileSync('css/style.css', styles);
