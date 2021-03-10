import {Injectable} from "@angular/core";
import * as appActions from "../../store/app/app.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class LayoutService {
    layoutChange$ = new BehaviorSubject<boolean>(false);

    constructor(private store: Store<AppState>) {
    }
    hideNavbar() {
        this.store.dispatch(appActions.hideNavBar());
        this.layoutChange$.next(true);
    }

    showNavbar() {
        this.store.dispatch(appActions.showNavBar());
        this.layoutChange$.next(true);
    }
}
