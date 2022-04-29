import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '~environment';
import { ITab } from '~interfaces/ui';
import settings from '~settings';
import {
    TabPaneDevComponent,
    TabPanePohComponent,
    TabPaneSettingsComponent
} from '../-tab-pane';

@Component({
    selector: 'rune-scape',
    templateUrl: './rune-scape.component.html',
    styleUrls: ['./rune-scape.component.scss']
})
export class RuneScapeComponent {
    public environment = environment;

    public tabs: Array<ITab> = [
        {
            component: TabPanePohComponent,
            options: { title: 'labels.POH', key: 'poh', shortcutKey: 'p' },
            cssClass: 'runeWords'
        },
        {
            component: TabPaneSettingsComponent,
            options: { title: 'settings.title', key: 'settings', shortcutKey: 's', right: true, fillHeight: false }
        },
        {
            component: TabPaneDevComponent,
            options: { title: 'labels.dev', key: 'dev', shortcutKey: 'd', right: true, fillHeight: false },
            hide: this.environment.production
        }
    ];

    constructor(titleService: Title, translate: TranslateService) {
        translate.setDefaultLang(settings.defaultLanguage);
        translate.use(settings.defaultLanguage);
        translate.get('common.appTitle').subscribe(title => titleService.setTitle(title));
    }
}
