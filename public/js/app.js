import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';
import domReady from './modules/domReady';

typeAhead( $('.search') );