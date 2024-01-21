
import CookieService from 'js-cookie';
import {api,msg} from '../services'

import React from 'react';
import ReactDOM from 'react-dom';


class AuthService {
  async UserLogin(credentials) {
    try {
      const response = await api.post('login').values(credentials);
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async handleLoginSuccess(response) {
    console.log('suces',response);
    const token = response
      .toString()
      .substring(parseInt(response.toString().indexOf('|')) + parseInt(1));

    Promise.all(CookieService.set('access_token', token))
      .then()
      .catch((err) => {
        throw err;
      });

  }

  async saveUserDetails(userDet) {
    console.log(userDet);
    CookieService.set('user_id', userDet.id);
    CookieService.set('user_email', userDet.email);
    CookieService.set('user_name', userDet.name); 
    CookieService.set('user_role', userDet.role); 
  }




  async signOutUser() {
    await api.post('logout').values(CookieService.get('user_id'));

   
      CookieService.remove('access_token');
      CookieService.remove('user_id');
      CookieService.remove('user_email');
      CookieService.remove('user_name');
      CookieService.remove('user_role');
      localStorage.clear();
      window.location.reload();

  }




}

export default new AuthService();
