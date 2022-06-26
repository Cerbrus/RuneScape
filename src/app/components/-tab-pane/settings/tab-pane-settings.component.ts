import { Component } from '@angular/core';
import { environment } from '~environment';
import { DomHelper, Helper, ObjectHelper } from '~helpers';
import { ISettings } from '~interfaces';
import { ITabPaneComponent } from '~interfaces/ui';
import { faBug, faLightbulb, faUndo } from '~modules/font-awesome';
import { StorageService, UserService } from '~services';

type NumericKeys = 'tooltipDelay';
type StringKeys = 'userName';

@Component({
    selector: 'tab-pane-settings',
    templateUrl: './tab-pane-settings.component.html',
    styleUrls: ['./tab-pane-settings.component.scss']
})
export class TabPaneSettingsComponent implements ITabPaneComponent {
    public environment = environment;

    public settings: ISettings;

    public bug = faBug;
    public lightBulb = faLightbulb;
    public clearInputIcon = faUndo;

    constructor(private readonly storageService: StorageService, private readonly userService: UserService) {
        this.settings = storageService.get.settings();
        this.registerDarkModeWatch();
        this.applySettings();
    }

    public getTitleKey(key: keyof ISettings) {
        return `settings.${key}${this.settings[key] ? 'On' : 'Off'}`;
    }

    public onBoolChange(key: keyof Omit<ISettings, NumericKeys | StringKeys>): void {
        this.settings[key] = !this.settings[key];
        this.applySettings();
    }

    public onNumberChange(): void {
        this.applySettings();
    }

    public onStringChange(): void {
        this.applySettings();
    }

    public onUserNameChange(): void {
        this.userService.loadUser(this.settings.userName);
        this.onStringChange();
    }

    public resetNumber(key: keyof Pick<ISettings, NumericKeys>): void {
        this.settings[key] = this.storageService.getDefault.settings()[key];
        this.applySettings();
    }

    public resetString(key: keyof Pick<ISettings, StringKeys>): void {
        this.settings[key] = this.storageService.getDefault.settings()[key];
        this.applySettings();
    }

    private registerDarkModeWatch(): void {
        if (!window.matchMedia) return;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        if (!Helper.hasValue(this.settings.darkMode)) this.settings.darkMode = prefersDark.matches;

        prefersDark.addEventListener('change', e => {
            this.settings.darkMode = e.matches;
            this.applySettings();
        });
    }

    private applySettings(): void {
        const { settings } = this;
        const classList = DomHelper.getRoot().classList;

        ObjectHelper.forEach(
            {
                'custom-cursor': settings.customCursor,
                'theme-dark': settings.darkMode ?? true,
                'theme-light': !settings.darkMode,
                'theme-background': settings.enableBackground
            },
            (className: string, value: boolean) => classList.toggle(className, value)
        );

        this.storageService.save.settings(settings);
    }
}
