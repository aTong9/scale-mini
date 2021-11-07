import Http from '@/api/http'

export const UserApi = {
  login(params: object) {
    return Http.get('/api/user/user/user_login', params)
  },
  register(params: object) {
    return Http.get('/api/user/user/user_register', params)
  },
  userQuery() {
    return Http.get('/api/user/user/user_query')
  },
  problemQuery() {
    return Http.get('/api/company/problem/problem_query')
  },
  privacyQuery() {
    return Http.get('/api/company/privacy/privacy_query')
  },
  userAvatar(params: object) {
    return Http.post('/api/user/user/user_avatar', params)
  },
  userExtend(params: object) {
    return Http.get('/api/user/user/user_extend', params)
  },
  userUpdate(params: object) {
    return Http.post('/api/user/user/user_update', params)
  },
  //用户昵称修改
  user_nickname(params: object) {
    return Http.post('/api/user/user/user_nickname', params)
  },
  //用户性别修改
  user_gender(params: object) {
    return Http.post('/api/user/user/user_gender', params)
  },
  //用户生日修改
  user_birthday(params: object) {
    return Http.post('/api/user/user/user_birthday', params)
  },
  //用户手机修改
  user_phone(params: object) {
    return Http.post('/api/user/user/user_phone', params)
  },
  //用户身高修改
  user_height(params: object) {
    return Http.post('/api/user/user/user_height', params)
  },
  //用户体重修改
  user_weight(params: object) {
    return Http.post('/api/user/user/user_weight', params)
  }
}
