import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { environment } from '~environment';
import { IUser } from '~interfaces/user/IUser';
import { StorageService } from '~services/storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    public user: ReplaySubject<IUser> = new ReplaySubject<IUser>();

    constructor(private readonly http: HttpClient, storageService: StorageService) {
        const userName = storageService.get.settings().userName;
        if (userName)
            this.loadUser(userName);
    }

    public loadUser(userName: string): Observable<IUser> {
        this.http.get<IUser>(`${environment.apiUrl}/users/profile/${userName}`)
            .pipe(
                take(1),
                tap(user => {
                    this.user.next(user);
                }))
            .subscribe();

        return this.user.asObservable();
    }
}
