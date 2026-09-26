import * as migration_20260925_160000_initial from './20260925_160000_initial';
import * as migration_20260925_231827_team_leads_downloads from './20260925_231827_team_leads_downloads';
import * as migration_20260926_174950_origin_trips_coffees from './20260926_174950_origin_trips_coffees';

export const migrations = [
  {
    up: migration_20260925_160000_initial.up,
    down: migration_20260925_160000_initial.down,
    name: '20260925_160000_initial',
  },
  {
    up: migration_20260925_231827_team_leads_downloads.up,
    down: migration_20260925_231827_team_leads_downloads.down,
    name: '20260925_231827_team_leads_downloads',
  },
  {
    up: migration_20260926_174950_origin_trips_coffees.up,
    down: migration_20260926_174950_origin_trips_coffees.down,
    name: '20260926_174950_origin_trips_coffees'
  },
];
