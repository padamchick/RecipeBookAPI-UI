import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class NotifyService {
  constructor(public notify: ToastrService) {}

  public badCredentialsError() {
    this.showErrorMessage('Bad credentials', 'Login failed')
  }
  public loginFailError() {
    this.showErrorMessage('Try again', 'Login failed')
  }
  public signUpSuccess() {
    this.showSuccessMessage('The account has been registered')
  }
  public signUpError() {
    this.showErrorMessage('Account registration failed')
  }
  public setLangSuccess() {
    this.showSuccessMessage('Language changed successfully')
  }
  public setLangError() {
    this.showErrorMessage('Language change error')
  }


  private showErrorMessage(message: string = '', title: string = '') {
    this.notify.error(message, title, { timeOut: 3000 })
  }
  private showSuccessMessage(message: string = '', title: string = '') {
    this.notify.success(message, title, { timeOut: 3000,  })
  }
  private showWarningMessage(message: string = '', title: string = '') {
    this.notify.warning(message, title, { timeOut: 3000 })
  }
  private showInfoMessage(message: string = '', title: string = '') {
    this.notify.info(message, title, { timeOut: 3000 })
  }
}
