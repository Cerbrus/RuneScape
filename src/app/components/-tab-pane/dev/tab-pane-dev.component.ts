import { Component } from '@angular/core';
import { ITabPaneComponent } from '~interfaces/ui';

@Component({
    selector: 'tab-pane-dev',
    templateUrl: './tab-pane-dev.component.html',
    styleUrls: ['./tab-pane-dev.component.scss']
})
export class TabPaneDevComponent implements ITabPaneComponent {
}
