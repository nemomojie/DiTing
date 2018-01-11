'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
      this.service = ctx.service;
    }

    async getClient(clientId, clientSecret) {
      const client = await this.service.client.getById(clientId);
      if (client && await this.ctx.compare(clientSecret, client.clientSecret)) {
        return {
          id: client.clientId,
          grants: client.grants,
          redirectUris: client.redirectUris,
          username: client.username,
        };
      }
      return null;
    }

    async getUserFromClient(client) {
      if (client.username) {
        const user = await this.service.user.getByName(client.username);
        if (user) {
          return { id: user._id };
        }
      }
      return null;
    }

    async getUser(username, password) {
      const user = await this.service.user.getByName(username);
      if (user && await this.ctx.compare(password, user.password)) {
        return { id: user._id };
      }
      return null;
    }

    async saveToken(token, client, user) {
      const mClient = await this.service.client.getById(client.id);
      if (mClient === null) {
        return null;
      }
      const mUser = await this.service.user.getById(user.id);
      if (mUser === null) {
        return null;
      }

      const accessToken = {
        accessToken: token.accessToken,
        expiresAt: token.accessTokenExpiresAt,
        scope: token.scope,
        clientId: client.id,
        userId: user.id,
      };
      await app.redis.hmset('accessToken:' + accessToken.accessToken, accessToken);
      const accessTokenExpire = parseInt((token.accessTokenExpiresAt.getTime() - new Date().getTime()) / 1000);
      await app.redis.expire('accessToken:' + accessToken.accessToken, accessTokenExpire);

      if (token.refreshToken) {
        const refreshToken = {
          refreshToken: token.refreshToken,
          expiresAt: token.refreshTokenExpiresAt,
          scope: token.scope,
          clientId: client.id,
          userId: user.id,
        };
        await app.redis.hmset('refreshToken:' + refreshToken.refreshToken, refreshToken);
        const refreshTokenExpire = parseInt((token.refreshTokenExpiresAt.getTime() - new Date().getTime()) / 1000);
        await app.redis.expire('refreshToken:' + refreshToken.refreshToken, refreshTokenExpire);

        await app.redis.set('accessTokenByRefreshToken:' + refreshToken.refreshToken, accessToken.accessToken);
        await app.redis.expire('accessTokenByRefreshToken:' + refreshToken.refreshToken, accessTokenExpire);

        return {
          accessToken: accessToken.accessToken,
          accessTokenExpiresAt: accessToken.expiresAt,
          refreshToken: refreshToken.refreshToken,
          refreshTokenExpiresAt: refreshToken.expiresAt,
          scope: accessToken.scope,
          client: { id: accessToken.clientId },
          user: { id: accessToken.userId },
        };
      }

      return {
        accessToken: accessToken.accessToken,
        accessTokenExpiresAt: accessToken.expiresAt,
        scope: accessToken.scope,
        client: { id: accessToken.clientId },
        user: { id: accessToken.userId },
      };
    }

    async getAccessToken(token) {
      const accessToken = await app.redis.hgetall('accessToken:' + token);
      if (accessToken) {
        const client = await this.service.client.getById(accessToken.clientId);
        if (client === null) {
          return null;
        }
        const user = await this.service.user.getById(accessToken.userId);
        if (user === null) {
          return null;
        }
        accessToken.expiresAt = new Date(accessToken.expiresAt);
        return {
          accessToken: accessToken.refreshToken,
          accessTokenExpiresAt: accessToken.expiresAt,
          scope: accessToken.scope,
          client: { id: client.clientId },
          user: { id: user._id },
        };
      }
    }

    async getRefreshToken(token) {
      const refreshToken = await app.redis.hgetall('refreshToken:' + token);
      if (refreshToken) {
        const client = await this.service.client.getById(refreshToken.clientId);
        if (client === null) {
          return null;
        }
        const user = await this.service.user.getById(refreshToken.userId);
        if (user === null) {
          return null;
        }
        refreshToken.expiresAt = new Date(refreshToken.expiresAt);
        return {
          refreshToken: refreshToken.refreshToken,
          refreshTokenExpiresAt: refreshToken.expiresAt,
          scope: refreshToken.scope,
          client: { id: client.clientId },
          user: { id: user._id },
        };
      }
    }

    async revokeToken(token) {
      const result = await app.redis.del('refreshToken:' + token.refreshToken);
      if (result === 1) {
        const accessTokenKey = await app.redis.get('accessTokenByRefreshToken:' + token.refreshToken);
        if (accessTokenKey) {
          await app.redis.del('accessToken:' + accessTokenKey);
          await app.redis.del('accessTokenByRefreshToken:' + token.refreshToken);
        }
        return true;
      }
      return false;
    }

    async validateScope(user, client, scope) {
      // TODO scope
      return true;
    }
  }

  return Model;
};
