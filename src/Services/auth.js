import Ls from './ls';
import axios from 'axios';
import ApiRequest from '@/Module/Global/api/apiService.js';
export default {
  logintoken(token) {
    Ls.set('auth.token', token.token_data.token, true);
    Ls.set('auth.token_id', token.token_data.token_id, true);
    Ls.set('auth.section', 'back');
  },
  login(user_data) {
    Ls.set('auth.name', user_data.username);
    Ls.set('auth.role', JSON.stringify(user_data.roles));
    Ls.set('agent', user_data.id);
    Ls.set('auth.section', 'back');
  },
  logout(token_id) {
    let requestData = { token: token_id };
    return ApiRequest.logout(requestData)
      .then((res) => {
        if (res.data.code == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  },
  async clearLocalStorage() {
    Ls.remove('auth.token', true);
    Ls.remove('auth.token_id', true);
    Ls.remove('email');
    Ls.remove('vuex');
    Ls.remove('role');
    Ls.set('auth.name');
    Ls.set('auth.role');
    localStorage.clear();
  },
};
