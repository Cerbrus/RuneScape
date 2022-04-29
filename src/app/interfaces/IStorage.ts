import { ISettings } from './';

export interface IStorage {
    appVersion: string;
    darkMode: boolean | null;
    settings: ISettings;
    uiActiveTabs: Record<string, string>;
    uiCollapsibleState: Partial<Record<string, boolean>>;
}
