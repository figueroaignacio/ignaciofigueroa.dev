import * as migration_20260212_180110 from './20260212_180110';
import * as migration_20260417_234024_add_project_icon from './20260417_234024_add_project_icon';
import * as migration_20260504_002553 from './20260504_002553';
import * as migration_20260504_003516 from './20260504_003516';
import * as migration_20260504_004150 from './20260504_004150';
import * as migration_20260504_213034 from './20260504_213034';
import * as migration_20260504_214407 from './20260504_214407';
import * as migration_20260504_214709 from './20260504_214709';
import * as migration_20260504_214755 from './20260504_214755';
import * as migration_20260504_214802 from './20260504_214802';
import * as migration_20260512_224420 from './20260512_224420';
import * as migration_20260512_224828 from './20260512_224828';
import * as migration_20260512_232049 from './20260512_232049';
import * as migration_20260528_195009 from './20260528_195009';

export const migrations = [
  {
    up: migration_20260212_180110.up,
    down: migration_20260212_180110.down,
    name: '20260212_180110',
  },
  {
    up: migration_20260417_234024_add_project_icon.up,
    down: migration_20260417_234024_add_project_icon.down,
    name: '20260417_234024_add_project_icon',
  },
  {
    up: migration_20260504_002553.up,
    down: migration_20260504_002553.down,
    name: '20260504_002553',
  },
  {
    up: migration_20260504_003516.up,
    down: migration_20260504_003516.down,
    name: '20260504_003516',
  },
  {
    up: migration_20260504_004150.up,
    down: migration_20260504_004150.down,
    name: '20260504_004150',
  },
  {
    up: migration_20260504_213034.up,
    down: migration_20260504_213034.down,
    name: '20260504_213034',
  },
  {
    up: migration_20260504_214407.up,
    down: migration_20260504_214407.down,
    name: '20260504_214407',
  },
  {
    up: migration_20260504_214709.up,
    down: migration_20260504_214709.down,
    name: '20260504_214709',
  },
  {
    up: migration_20260504_214755.up,
    down: migration_20260504_214755.down,
    name: '20260504_214755',
  },
  {
    up: migration_20260504_214802.up,
    down: migration_20260504_214802.down,
    name: '20260504_214802',
  },
  {
    up: migration_20260512_224420.up,
    down: migration_20260512_224420.down,
    name: '20260512_224420',
  },
  {
    up: migration_20260512_224828.up,
    down: migration_20260512_224828.down,
    name: '20260512_224828',
  },
  {
    up: migration_20260512_232049.up,
    down: migration_20260512_232049.down,
    name: '20260512_232049',
  },
  {
    up: migration_20260528_195009.up,
    down: migration_20260528_195009.down,
    name: '20260528_195009',
  },
];
