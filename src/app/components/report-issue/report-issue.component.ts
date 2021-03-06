import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TIssueType } from '~types';

@Component({ selector: 'report-issue', template: '' })
export class ReportIssueComponent {
    constructor(private readonly translate: TranslateService, route: ActivatedRoute) {
        this.openIssue(route.snapshot.params.issueType);
    }

    public openIssue(issueType: TIssueType): void {
        this.buildIssueUrl(issueType).subscribe(url => {
            document.location.href = url;
        });
    }

    public buildIssueUrl(issueType: TIssueType): Observable<string> {
        return this.translate
            .get('common.repositoryUrl')
            .pipe(map(repositoryUrl => `${repositoryUrl}/issues/new?template=${issueType}.md`));
    }
}
