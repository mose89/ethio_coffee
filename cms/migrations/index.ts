import * as migration_20260925_160000_initial from './20260925_160000_initial';

export const migrations = [
  {
    up: migration_20260925_160000_initial.up,
    down: migration_20260925_160000_initial.down,
    name: '20260925_160000_initial'
  },
];
