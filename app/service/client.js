const Service = require('egg').Service;

class CientService extends Service {
  async create (client) {
    return (await this.app.model.Client({
      clientId: client.clientId,
      clientSecret: await this.ctx.genHash(client.clientSecret),
      grants: client.grants || [],
      redirectUris: client.redirectUris || [],
      username: client.username
    }).save()).toObject();
  };
  async getById (clientId) {
    return this.app.model.Client.findOne({
      clientId: clientId
    }).lean();
  };
  async update (client) {
    const updateClient =  await this.app.model.Client.findOne({
      clientId: client.clientId
    });
    client.clientSecret && (updateClient.setClientSecret = await this.ctx.genHash(client.clientSecret));
    client.grants && (updateClient.grants = client.grants);
    client.redirectUris && (updateClient.redirectUris = client.redirectUris);
    client.username && (updateClient.username = client.username);
    return (await updateClient.save()).toObject();
  };
  async updateSecretByOldSecret (clientId, oldSecret, newSecret) {
    return this.app.model.Client.findOneAndUpdate({
      clientId: clientId,
      clientSecret: await this.ctx.genHash(oldSecret)
    }, {
      clientSecret: await this.ctx.genHash(newSecret)
    }, { new: true }).lean();
  };
  async delete (clientId) {
    return this.app.model.Client.remove({
      clientId: clientId
    });
  };
}

module.exports = CientService;