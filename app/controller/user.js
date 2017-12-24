const AbstractController = require('./abstract');

class UserController extends AbstractController {
  async get () {
    const rs = this.service.cookie.getUser()
    if (!rs || !rs._id) {
      this.error({
        code: 401,
        msg: 'Please login'
      })
    }
    const user = await this.service.user.getById(rs._id)
    if (!user || user.modifiedTime > new Date(rs.modifiedTime)) {
      this.error({
        code: 401,
        msg: '信息已发生变更，请重新登录'
      })
    }
    this.success(rs)
  }
  async create () {
    const info = this.ctx.request.body
    const user = await this.service.user.getByName(info.name)
    if (user) {
      this.error('此邮箱已被注册')
    }
    const rs = await this.service.user.create(info)
    delete rs.password
    this.service.cookie.setUser(rs)
    this.success(rs)
  }
  async login () {
    const info = this.ctx.request.body
    const user = await this.service.user.getByName(info.name)
    if (!user) {
      this.error('账号不存在')
    }
    if (user.password !== md5(info.password, this.config.md5Key)) {
      this.error('密码错误')
    }
    delete user.password
    this.service.cookie.setUser(user)
    this.success(user)
  }
  async update () {
    const user = this.ctx.request.body
    const rs = await this.service.user.update(user)
    if (!rs) {
      this.error({
        code: 500,
        msg: '修改失败'
      })
    }
    delete rs.password
    this.service.cookie.setUser(rs)
    this.success(rs)
  }
  async updatePassword () {
    const { originPassword, password, verifyPassword } = this.ctx.request.body;
    if (originPassword.trim() === '' || password.trim() === '' || verifyPassword.trim() === '') {
      this.error('Password can\'t be empty');
    }
    if (password !== verifyPassword) {
      this.error('Two passwords are different');
    }
    console.log(this.ctx.request.body);
    const rs = await this.service.user.updatePasswordByOldPassword(originPassword, password);
    if (!rs) {
      this.error('Password wrong')
    }
    delete rs.password;
    this.service.cookie.setUser(rs);
    this.success(rs);
  }
  logout () {
    this.service.cookie.clearUser();
    this.success('logout success');
  }
}

module.exports = UserController;
