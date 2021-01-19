import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class NotifyService {
  constructor(public notify: ToastrService) {}

  public badCredentialsError() {
    this.showErrorMessage('Bad credentials', 'Login failed', { timeOut: 3000 })
  }
  public loginFailError() {
    this.showErrorMessage('Try again', 'Login failed', { timeOut: 3000 })
  }

  private showErrorMessage(message: string = '', title: string = '', options: any = {}) {
    this.notify.error(message, title, options)
  }
  private showSuccessMessage(message: string = '', title: string = '', options: any = {}) {
    this.notify.success(message, title, options)
  }
  private showWarningMessage(message: string = '', title: string = '', options: any = {}) {
    this.notify.warning(message, title, options)
  }
  private showInfoMessage(message: string = '', title: string = '', options: any = {}) {
    this.notify.info(message, title, options)
  }
}
