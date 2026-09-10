<?php
// data/build_all_languages.php
// Master Generator for all 10 language dictionaries in /lang/*.php

require_once __DIR__ . '/lang_data_source.php';

 = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ru', 'zh', 'ja', 'ar'];

foreach ( as ) {
     = getLanguageData();
     = "<?php\n// lang/{}.php\nreturn " . var_export(, true) . ";\n";
    file_put_contents(__DIR__ . "/../lang/{}.php", );
    echo "Generated lang/{}.php successfully\n";
}
echo "All 10 languages generated!\n";
