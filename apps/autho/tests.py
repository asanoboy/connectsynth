"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from django.test.client import Client
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

from common.models import TwitterUser


class AuthTest(TestCase):
    def setUp(self):
        self.c = Client()
        
        self.username = "testname"
        self.password = "passw0rd"
        
        pass
    
    def TearDown(self):
        pass
        
        
    def test_register(self):
        
        res = self.c.post(reverse('autho_register'), {
            'username': self.username,
            'password1': self.password,
            'password2': self.password,
        })
        
        self.assertEquals(res.status_code, 200)
        self.assertEquals(res.content, '1')
        
        isLogin = self.c.login(username=self.username, password=self.password)
        self.assertTrue(isLogin)
        
    def test_login(self):
        
        user = User.objects.create_user(username=self.username,
                                 email='',
                                 password=self.password)
        twitteruser = TwitterUser.objects.create(twitterid=123,
                                              user=user,
                                              screen_name='testname',
                                              profile_image_url="http://hoge.com"
                                              )
        
        self.assertTrue(user.is_authenticated())
        res = self.c.post(reverse('autho_login'), {
                                                   'username': self.username,
                                                   'password': self.password
                                                   })
        
        self.assertEquals(res.status_code, 200)
        self.assertEquals(res.content, '1')
        
        self.c.logout()
        isLogin = self.c.login(username=self.username, password=self.password)
        self.assertTrue(isLogin)
        
