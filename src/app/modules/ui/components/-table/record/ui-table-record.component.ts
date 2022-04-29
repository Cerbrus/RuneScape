import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LabeledBaseComponent } from '~modules/shared';

@Component({
    selector: 'ui-table-record',
    templateUrl: './ui-table-record.component.html',
    styleUrls: ['./ui-table-record.component.scss']
})
export class UiTableRecordComponent<K extends string,
    V extends string | number> extends LabeledBaseComponent {
    public sortedRecord?: Array<KeyValue<K, V>>;

    @Input()
    public sortBy?: 'key' | 'value';

    @Input()
    public set record(value: Array<KeyValue<K, V>>) {
        this.sortedRecord = this.sortBy
            ? value.sort((a, b) =>
                this.sortBy === 'value' ? this.compare(a.value, b.value) : this.compare(a.key, b.key)
            )
            : value;
    }

    @Input()
    public titleKeys?: [string, string];

    private compare(a: string | number, b: string | number): number {
        return typeof a === 'number' && typeof b === 'number'
            ? a - b
            : this.getString(a).localeCompare(this.getString(b));
    }

    getString(value: number | string): string {
        return `${value}`;
    }
}
