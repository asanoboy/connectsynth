"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""
import shutil, os
#import tempfile
from django.test import TestCase
from django.test.client import Client
from django.utils import simplejson
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from common.helpers import REPO_ROOT


class SimpleTest(TestCase):
    def setUp(self):
        self.login_password = "passw0rd"
        self.user = User.objects.create_user("testuser", 'test@test.com', self.login_password)
        self.plugin_name = "Test Plugin"
        self.plugin_description = "This is great instrument!"
        
        self.c = Client()
        self.giturl = "git://github.com/ai/visibility.js.git"
        self.tag = "0.1"
        
        self.zipfile = open(os.path.join(os.path.dirname(__file__), "main.zip"), "r")
    
    def _tearDown(self):
        if os.path.isdir(REPO_ROOT):
            shutil.rmtree(REPO_ROOT)
        
    def test_upload_zip(self):
        """
        Login
        """
        isLogin = self.c.login(username=self.user.username, password=self.login_password)
        self.assertTrue(isLogin)
        
        rs = self.c.post(reverse("upload_instrument_archive"),
                    {"archive": self.zipfile})
        
        self.assertEqual(rs.status_code, 200)
        try:
            rsjson = simplejson.loads(rs.content)
        except:
            self.assertTrue(False)
        
        self.assertTrue("status" in rsjson)
        self.assertTrue("code" in rsjson)
        self.assertEqual(rsjson['status'], '1')
        code = rsjson['code']
        
        self.confirm_valid_code(code)
        
    """    
    def test_valid_sequence(self):
        
        isLogin = self.c.login(username=self.user.username, password=self.login_password)
        self.assertTrue(isLogin)
        
        
        rs = self.c.post(reverse("clone_instrument_external"),
               {"url": self.giturl, "tag": self.tag})
        
        self.assertEqual(rs.status_code, 200)
        try:
            rsjson = simplejson.loads(rs.content)
        except:
            self.assertTrue(False)
        
        self.assertTrue("status" in rsjson)
        self.assertTrue("code" in rsjson)
        self.assertEqual(rsjson['status'], '1')
        code = rsjson['code']
        
        self.confirm_valid_code(code)
    """
    """
    This assumes that self.c was logged in. 
    """    
    def confirm_valid_code(self, code):
        
        """
        Launch instrument player for test
        """
        rs = self.c.get(reverse("launch_instrument_test",
                                kwargs={"code":code}))
        self.assertEqual(rs.status_code, 200)
        
        
        """
        Publish
        """
        imagefile = open(os.path.join(os.path.dirname(__file__), "test.png"), "r")
        rs = self.c.post(reverse("publish_instrument", 
                                 kwargs={"code":code}),
                    {"name": self.plugin_name,
                     "description": self.plugin_description,
                     "image": imagefile})
        
        self.assertEqual(rs.status_code, 200)
        try:
            rsjson = simplejson.loads(rs.content)
        except:
            self.assertTrue(False)
        
        print rs.content
        
        self.assertTrue("status" in rsjson)
        self.assertTrue("code" in rsjson)
        self.assertEqual(rsjson['status'], '1')
        new_code = rsjson['code']
        
        
        """
        Logout
        """
        self.c.logout()
        
        
        """
        Launch public plugin
        """
        rs = self.c.get(reverse("launch_instrument", 
                                kwargs={"code":new_code}))
        self.assertEqual(rs.status_code, 200)
        
        
        """
        Login again
        """
        isLogin = self.c.login(username=self.user.username, password=self.login_password)
        self.assertTrue(isLogin)
        
        
        """
        Disable public plugin
        """
        rs = self.c.post(reverse("disable_instrument", 
                                kwargs={"code":new_code}))
        self.assertEqual(rs.status_code, 200)
        try:
            rsjson = simplejson.loads(rs.content)
        except:
            self.assertTrue(False)
        self.assertTrue("status" in rsjson)
        self.assertEqual(rsjson['status'], '1')
        