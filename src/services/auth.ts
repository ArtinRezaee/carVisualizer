import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { User } from './../data_structs/structs';

@Injectable()
export class Auth {

    private sub1: Subscription = null;

    private name: string = "";
    private access: number = 2;
    private phone: string = "";

    private loggedIn: boolean = false;

    constructor(private fAuth: AngularFireAuth, private fDb: AngularFireDatabase) {

        this.fAuth.authState.subscribe((auth) => {
            if(auth) {
                this.loggedIn = true;
                this.sub1 = this.fDb.object<User>('users/' + this.getUID()).valueChanges().subscribe(
                    user => {
                        this.name = user.name;
                        this.access = user.access;
                        this.phone = user.phone;
                    }
                );
            }
            else {
                this.loggedIn = false;
                this.name = "";
                this.access = 2;
                this.phone = "";

                if(this.sub1 != null)
                    this.sub1.unsubscribe();
            }
        });
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUID() {
        if(this.isLoggedIn())
            return this.fAuth.auth.currentUser.uid;
        else
            return null;
    }

    getEmail() {
        if(this.isLoggedIn())
            return this.fAuth.auth.currentUser.email;
        else
            return null;
    }

    getName() {
        return this.name;
    }

    getAccess() {
        return this.access;
    }
    
    getPhone() {
        return this.phone;
    }

    nowUnix() {
        return moment().unix();
    }

    getNewDesignID() {
        return this.fDb.list('users/' + this.getUID() + '/designs').push({}).key;
    }
}
