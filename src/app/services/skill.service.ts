import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { environment } from '~environment';
import { IUser } from '~interfaces/user/IUser';
import { StorageService } from '~services/storage.service';

@Injectable({ providedIn: 'root' })
export class SkillService {
    public skills: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>();

    constructor(private readonly http: HttpClient) {
        this.loadSkills();
    }

    public loadSkills(): Observable<Array<any>> {
        this.http.get<Array<any>>(`${environment.apiUrl}/skills/list`)
            .pipe(
                take(1),
                tap(skills => {
                    this.skills.next(skills);
                }))
            .subscribe();

        return this.skills.asObservable();
    }
}
