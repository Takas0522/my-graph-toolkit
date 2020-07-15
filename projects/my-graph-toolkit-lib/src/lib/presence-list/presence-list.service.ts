import { Injectable } from '@angular/core';
import { MsalService } from '../msal/msal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PresenceListService {

    constructor(
        private msalService: MsalService,
        private httpClient: HttpClient
    ) {}

    async getUserList$(): Promise<void> {
        console.log({ di: this.msalService })
        if (this.msalService.isCompleteSettingState) {
            this.getUserList();
            return;
        }
        this.msalService.isCompleteSettingState$.subscribe(x => {
            if (x) {
                this.getUserList();
            }
        });
    }

    private async getUserList(): Promise<{userId: string, name: string}> {
        const token = await this.msalService.aquireToken();
        const header = new HttpHeaders().append('Authorization', `Bearer ${token}`);
        this.httpClient.get('https://graph.microsoft.com/v1.0/users', { headers: header }).subscribe(x => {
            console.log(x);
        });
        return { userId: '', name: '' };
    }
}
