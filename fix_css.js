const fs = require('fs');

const missingStyles = `
.bg-emerald-600 { background-color: #059669; }
.hover\\:bg-emerald-700:hover { background-color: #047857; }
.bg-emerald-700 { background-color: #047857; }
.hover\\:bg-emerald-800:hover { background-color: #065f46; }
.bg-action-600 { background-color: #16A34A; }
.bg-action-700 { background-color: #15803D; }
.hover\\:bg-action-800:hover { background-color: #166534; }
`;

fs.appendFileSync('css/style.css', missingStyles);
console.log('Appended missing classes to style.css');
