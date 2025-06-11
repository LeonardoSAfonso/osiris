import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { UserQuery } from '@keycloak/keycloak-admin-client/lib/resources/users';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundError } from './errors/user-not-found.error';
import { User } from 'prisma/client';

@Injectable()
export class KeycloakUserService {
  constructor(
    private readonly admin: KeycloakAdminClient,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: User, password: string): Promise<User> {
    await this.admin.users
      .create({
        username: user.name,
        email: user.email,
        enabled: true,
        credentials: [
          {
            temporary: false,
            type: 'password',
            value: password,
          },
        ],
        attributes: {
          dbId: user.id,
        },
      })
      .catch((e) => {
        throw new Error(JSON.stringify(e));
      });
    return user;
  }

  async removeByEmail(email: string): Promise<void> {
    const user = await this.findFirst({ email });

    await this.remove(user.id);
  }

  async changePassword(
    email: string,
    newPassword: string,
  ): Promise<{ id: string }> {
    const user = await this.findFirst({ email });

    await this.admin.users.resetPassword({
      id: user.id,
      credential: {
        temporary: false,
        type: 'password',
        value: newPassword,
      },
    });

    return { id: user.id };
  }

  async activeUserEmail(token: string): Promise<string> {
    const { email } = await this.jwtService.verifyAsync(token);

    const user = await this.findFirst({ email });

    await this.admin.users.update(
      { id: user.id },
      {
        emailVerified: true,
      },
    );

    return user.email;
  }

  remove(id: string): Promise<void> {
    return this.admin.users.del({ id });
  }

  private async findFirst(query: UserQuery) {
    const [user] = await this.admin.users.find({ ...query, exact: true });

    if (!user.id) {
      throw new UserNotFoundError(JSON.stringify(query));
    }

    return user;
  }

  async verifyToken(token: string): Promise<string> {
    const { email } = await this.jwtService.verifyAsync(token);
    return email;
  }
}
