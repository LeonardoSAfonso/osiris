import { Injectable } from '@nestjs/common';
import { Token } from './dtos/token.output';
import { KeycloakAuthService } from './keycloak-auth.service';
import { KeycloakUserService } from './keycloak-user.service';
import { CreateUserDTO } from './dtos/createUser';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakUserService: KeycloakUserService,
    private readonly keycloakAuthService: KeycloakAuthService,
    //private readonly mailSchedule: EmailScheduleQueue,
  ) {}

  login(username: string, password: string): Promise<Token> {
    return this.keycloakAuthService.login(username, password);
  }

  async loginLongLivedToken(
    username: string,
    password: string,
  ): Promise<Token> {
    return this.keycloakAuthService.loginLongLivedToken(username, password);
  }

  refreshToken(token: string): Promise<Token> {
    return this.keycloakAuthService.refreshToken(token);
  }

  async signUp(user: CreateUserDTO): Promise<void> {
    await this.keycloakAuthService.checkIfAdminTokenStillValid();
    await this.keycloakUserService.create(user);
    //await this.sendActiveMail(user);

    return;
  }

  async logout(id: string) {
    await this.keycloakAuthService.logout(id);
  }

  async changePassword(email: string, newPassword: string) {
    await this.keycloakAuthService.checkIfAdminTokenStillValid();

    return await this.keycloakUserService.changePassword(email, newPassword);
  }

  async resetPassword(token: string, newPassword: string) {
    const email = await this.keycloakUserService.verifyToken(token);

    await this.keycloakAuthService.checkIfAdminTokenStillValid();

    return await this.keycloakUserService.changePassword(email, newPassword);
  }

  // async sendResetPassword(email: string) {
  //   const token = await this.keycloakAuthService.resetPasswordToken(email);

  //   return this.mailSchedule.sendMail({
  //     template: RESET_PASSWORD_TEMPLATE,
  //     sendTo: [email],
  //     subject: 'Recuperação de senha',
  //     body: {
  //       passwordToken: token,
  //       name: user.name,
  //     },
  //   });
  // }

  // async activeEmail(token: string) {
  //   const email = await this.keycloakUserService.activeUserEmail(token);
  //   await this.userService.activeMail(email);
  // }

  // async sendActiveMail(user: CreateUserDTO) {
  //   const token = await this.keycloakAuthService.resetPasswordToken(user.email);

  //   return this.mailSchedule.sendMail({
  //     template: CONFIRM_MAIL_TEMPLATE,
  //     user: user.dbId,
  //     sendTo: [user.email],
  //     subject: 'Confirme seu email',
  //     body: {
  //       confirmToken: token,
  //       name: user.name,
  //     },
  //   });
  // }

  async removeAccount(userEmail: string) {
    this.keycloakAuthService.checkIfAdminTokenStillValid();
    this.keycloakUserService.removeByEmail(userEmail);
  }
}
