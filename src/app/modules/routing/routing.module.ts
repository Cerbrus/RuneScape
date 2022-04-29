import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportIssueComponent } from '~components/report-issue/report-issue.component';
import { RuneScapeComponent } from '~components/runescape/rune-scape.component';
import { ParameterIssueType, ParameterTab } from './guards';

const routes: Routes = [
    { path: '', component: RuneScapeComponent },
    { path: ':tab', component: RuneScapeComponent, canActivate: [ParameterTab] },
    {
        path: 'issue/:issueType',
        component: ReportIssueComponent,
        canActivate: [ParameterIssueType]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ParameterTab]
})
export class RoutingModule {
}
