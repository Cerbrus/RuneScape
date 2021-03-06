import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faCheck, faTimes } from '~modules/font-awesome';
import { LabeledBaseComponent } from '~modules/shared';

@Component({
    selector: 'input-checkbox',
    templateUrl: './input-checkbox.component.html',
    styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent extends LabeledBaseComponent {
    @Input()
    public isXl = false;

    @Input()
    public showIcon = false;

    @Input()
    public checked!: boolean | undefined;

    @Output()
    public checkedChange = new EventEmitter<boolean>();

    @Output()
    public click = new EventEmitter<void>();

    public iconCheck = faCheck;
    public iconX = faTimes;

    constructor(translate: TranslateService) {
        super(translate);
    }

    public onClick(): void {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
        this.click.emit();
    }
}
