// Angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Custom modules
import { SharedModule } from '~modules';

// Components
import {
    UiButtonComponent,
    UiCollapsibleComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
} from './components';

// Components
const components = [
    UiButtonComponent,
    UiCollapsibleComponent,
    UiTabComponent,
    UiTableHeadComponent,
    UiTableRecordComponent,
    UiTableSortControlComponent,
    UiTabsComponent
];

@NgModule({
    declarations: [components],
    imports: [CommonModule, SharedModule],
    exports: [components]
})
export class UiModule {
}
