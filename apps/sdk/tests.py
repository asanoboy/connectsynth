# coding: UTF-8
import tempfile
from django.test import TestCase
from django.test.client import Client
from django.utils import simplejson
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

import os.path
from common.models import Plugin, TwitterUser
from models import File

class SDKTest(TestCase):
    
    """
    copied from repoo/apps/api/tests.py
    """
    def setUp(self):
        
        
        
        self.c = Client()
        
        self.login_password = "passw0rd"
        self.user = User.objects.create_user("testuser", 'test@test.com', self.login_password)
        self.twitteruser = TwitterUser.objects.create(twitterid=123,
                                                      user=self.user,
                                                      screen_name='testname',
                                                      profile_image_url="http://hoge.com"
                                                      )
        """
        uploaded file information
        """
        self.content = u'ハローワールド!'.encode("utf-8")
        
        self.file_handler = tempfile.TemporaryFile()
        self.file_handler.write(self.content)
        self.file_handler.seek(0)
        
        
        self.image_content = u'test'.encode("utf-8")
        self.image_file_handler = tempfile.TemporaryFile()
        self.image_file_handler.write(self.image_content)
        self.image_file_handler.seek(0)
        
        
        """
        POST information
        """
        self.filepath = "testtest.file"
        self.image_filepath = "image.jpg"

    
    def tearDown(self):
        self.user.delete()
        
    def login(self):
        
        isLogin = self.c.login(username=self.user.username, password=self.login_password)
        self.assertTrue(isLogin)
        
    def create_plugin(self):
        
        res = self.c.get(reverse("sdk_instrument_workspace"), follow=True) # follow redirect
        plugin = Plugin.objects.get(user=self.user)
        self.assertTrue( plugin.code in str(res) )
        return plugin
        
    
    def test_publish(self):
        
        self.login()
        plugin = self.create_plugin()
        
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            self.filepath: self.file_handler,
        })
        self.assertEqual(update_res.status_code, 200)
        self.assertEqual(update_res.content, "ok")
        
        publish_res = self.c.post(reverse("sdk_publish_api", args=[plugin.code]),
                                  {'name': 'hogehoge',
                                   'description': 'fugafuga'})
        self.assertEqual(publish_res.status_code, 200)
        res_obj = simplejson.loads(publish_res.content)
        self.assertEqual(res_obj['status'], "ok")
        
        #info_res = self.c.get(reverse('sdk_private_filelist_api', args=[plugin.code]))
        #info_res = self.c.get(reverse('sdk_plugin_filelist_api', args=[plugin.code]))
        #self.assertEqual(info_res.status_code, 302)
        
        #info_res = self.c.get(reverse('sdk_filelist_api', args=[plugin.code]))
        info_res = self.c.get(reverse('sdk_plugin_filelist_api', args=[plugin.code]))
        self.assertEqual(info_res.status_code, 200)
        self.assertEqual(info_res.content, simplejson.dumps([self.filepath]))
        
        #get_res = self.c.get(reverse('sdk_get_api', args=[plugin.code, self.filepath]))
        get_res = self.c.get(reverse('sdk_plugin_get_api', args=[plugin.code, self.filepath]))
        self.assertEqual(get_res.status_code, 200)
        self.assertEqual(get_res.content, self.content)
        
        new_plugin = Plugin.objects.get(code=plugin.code)
        self.assertTrue(new_plugin.is_public)
        self.assertEqual(new_plugin.user, self.user)
        
    """
    """
    def test_show_sdk(self):
        
        self.login()
        self.create_plugin()
    
    def test_remove_and_reupdate(self):
        
        self.login()
        plugin = self.create_plugin()
        
        filepath1 = "file1.txt"
        filepath2 = "file2.txt"
        
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            filepath1: self.file_handler,
            filepath2: self.file_handler
        })
        self.assertEqual(update_res.status_code, 200)
        self.assertEqual(update_res.content, 'ok')
        
        #list_res = self.c.get(reverse("sdk_private_filelist_api", args=[plugin.code]))
        list_res = self.c.get(reverse("sdk_plugin_filelist_api", args=[plugin.code]))
        self.assertEqual(list_res.content, simplejson.dumps([filepath1, filepath2]))
        
        # Post only filepath1 to expect that filepath2 will be removed.
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            filepath1: self.file_handler,
        })
        
        # Confirm that filepath2 is removed.
        #list_res = self.c.get(reverse("sdk_private_filelist_api", args=[plugin.code]))
        list_res = self.c.get(reverse("sdk_plugin_filelist_api", args=[plugin.code]))
        self.assertEqual(list_res.content, simplejson.dumps([filepath1]))
        
        # Reupdate filepath2
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            filepath1: self.file_handler,
            filepath2: self.file_handler
        })
        
        # Confirm that filepath2 exists again.
        #list_res = self.c.get(reverse("sdk_private_filelist_api", args=[plugin.code]))
        list_res = self.c.get(reverse("sdk_plugin_filelist_api", args=[plugin.code]))
        self.assertEqual(list_res.content, simplejson.dumps([filepath1, filepath2]))
        
        
    def test_extend(self):
        
        self.login()
        plugin = self.create_plugin()
        
        #self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            self.filepath: self.file_handler
        })
        
        self.c.post(reverse("sdk_publish_api", args=[plugin.code]), {
            'name': "hoge",
            'description': "fuga"
        })
        
        # Confirm number of plugins before extend.
        self.assertEqual(Plugin.objects.filter(user=self.user).count(), 1)
        
        # Copy plugin
        rs = self.c.get(reverse("sdk_extend_instrument", args=[plugin.code]), follow=True)
        self.assertEqual(rs.status_code, 200)
        self.assertEqual(simplejson.loads(rs.content)["status"], "ok")
        
        # Confirm number of plugin increments.
        plugins = Plugin.objects.filter(user=self.user)
        self.assertEqual(plugins.count(), 2)
        
        public_plugin = Plugin.objects.get(user=self.user, is_public=True)#plugins[0]
        #print "each_code0 = %s" % each_plugin.code   
        public_files = File.objects.filter(plugin=public_plugin)
        self.assertEqual(public_files.count(), 1)
        self.assertEqual(public_files[0].content.read(), self.content)
        
        #each_plugin = plugins[1]
        private_plugin = Plugin.objects.get(user=self.user, is_public=False)
        private_files = File.objects.filter(plugin=private_plugin)
        self.assertEqual(private_files.count(), 1)
        self.assertEqual(private_files[0].content.read(), self.content)
        
        # Advance test
        # add file
        #self.c.post(reverse("sdk_restful_api", args=[private_plugin.code]), {
        self.c.post(reverse("sdk_plugin_api", args=[private_plugin.code]), {
            self.image_filepath: self.image_file_handler
        })
        
        # Copy plugin again
        rs = self.c.get(reverse("sdk_extend_instrument", args=[plugin.code]), follow=True)
        self.assertEqual(rs.status_code, 200)
        self.assertEqual(simplejson.loads(rs.content)["status"], "ok")
        
        # Confirm number of plugin increments.
        plugins = Plugin.objects.filter(user=self.user)
        self.assertEqual(plugins.count(), 2)
                
    def test_overwrite(self):
        
        self.login()
        plugin = self.create_plugin()
        
        filepath = "main.js"
        file1 = tempfile.TemporaryFile()
        file1.write("file1")
        file1.seek(0)
        
        file2 = tempfile.TemporaryFile()
        file2.write("file2")
        file2.seek(0)
        
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            filepath: file1
        })
        self.assertEqual(update_res.status_code, 200)
        self.assertEqual(update_res.content, "ok")
        
        #get_rs = self.c.get(reverse("sdk_private_get_api", args=[plugin.code, filepath]))
        get_rs = self.c.get(reverse("sdk_plugin_get_api", args=[plugin.code, filepath]))
        self.assertEqual(get_rs.content, "file1")
        
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            filepath: file2
        })
        self.assertEqual(update_res.status_code, 200)
        self.assertEqual(update_res.content, "ok")
        
        #get_rs = self.c.get(reverse("sdk_private_get_api", args=[plugin.code, filepath]))
        get_rs = self.c.get(reverse("sdk_plugin_get_api", args=[plugin.code, filepath]))
        self.assertEqual(get_rs.content, "file2")
        
    
    def test_preset(self):
        self.login()
        plugin = self.create_plugin()
        
        preset_name = "hoge"
        preset_value = "piyo"
        
        # Confirm presets is empty.
        #get_rs = self.c.get(reverse("sdk_private_presetlist", args=[plugin.code]))
        get_rs = self.c.get(reverse("sdk_preset_list", args=[plugin.code]))
        self.assertEqual(get_rs.status_code, 200)
        self.assertEqual(get_rs.content, "[]")
        
        # Post preset
        #post_rs = self.c.post(reverse("sdk_preset_post_api", args=[plugin.code]), 
        post_rs = self.c.post(reverse("sdk_preset_post", args=[plugin.code]), 
                              {"name": preset_name,
                               "value": preset_value})
        self.assertEqual(post_rs.status_code, 200)
        #self.assertEqual(post_rs.content, "ok")
        rs_obj = simplejson.loads(post_rs.content)
        self.assertEqual(rs_obj['status'], "ok")
        self.assertTrue(rs_obj['code'])
        
        
        # Confirm the preset exists.
        #get_rs = self.c.get(reverse("sdk_private_presetlist", args=[plugin.code]))
        get_rs = self.c.get(reverse("sdk_preset_list", args=[plugin.code]))
        self.assertEqual(get_rs.status_code, 200)
        rs = simplejson.loads(get_rs.content)
        self.assertEqual(len(rs), 1)
        self.assertEqual(rs[0]['name'], preset_name)
        self.assertEqual(rs[0]['value'], preset_value)
        
        preset_code = rs[0]['code']
        
        # Delete preset
        #delete_rs = self.c.post(reverse("sdk_preset_delete_api", args=[plugin.code]),
        delete_rs = self.c.post(reverse("sdk_preset_delete", args=[plugin.code]),
                                {"preset_code": preset_code})
        self.assertEqual(delete_rs.status_code, 200)
        self.assertEqual(delete_rs.content, "ok")
        
        # Confirm the preset is deleted.
        #get_rs = self.c.get(reverse("sdk_private_presetlist", args=[plugin.code]))
        get_rs = self.c.get(reverse("sdk_preset_list", args=[plugin.code]))
        self.assertEqual(get_rs.status_code, 200)
        rs = simplejson.loads(get_rs.content)
        self.assertEqual(len(rs), 0)
    

        
    def test_simple(self):
        
        self.login()
        plugin = self.create_plugin()
        
        
        """
        Confirm that plugin is empty.
        """
        #info_res = self.c.get(reverse('sdk_private_filelist_api', args=[plugin.code]))
        info_res = self.c.get(reverse('sdk_plugin_filelist_api', args=[plugin.code]))
        self.assertEquals(info_res.status_code, 200)
        self.assertEquals(info_res.content, '[]')
        
        """
        Post self.file_handler to plugin
        """
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            self.filepath: self.file_handler,
        })
        self.assertEqual(update_res.status_code, 200)
        self.assertEqual(update_res.content, "ok")
        
        
        
        """
        Confirm that plugin includes the file corresponding to self.file_handler.
        """
        #info_res = self.c.get(self.get_info_api(plugin.code), {})
        #info_res = self.c.get(reverse("sdk_private_filelist_api", args=[plugin.code]), {})
        info_res = self.c.get(reverse("sdk_plugin_filelist_api", args=[plugin.code]), {})
        self.assertEqual(info_res.status_code, 200)
        self.assertEqual(info_res.content, simplejson.dumps([self.filepath]))
        
        
        #get_res = self.c.get(os.path.join(self.get_main_api(plugin.code), self.filepath))
        #get_res = self.c.get(reverse("sdk_private_get_api", args=[plugin.code, self.filepath]))
        get_res = self.c.get(reverse("sdk_plugin_get_api", args=[plugin.code, self.filepath]))
        self.assertEqual(get_res.status_code, 200)
        self.assertEqual(get_res.content, self.content)
        
        
        """
        Delete posted file from plugin.
        """
        #delete_res = self.c.delete(reverse("sdk_restful_api", args=[plugin.code]))
        delete_res = self.c.delete(reverse("sdk_plugin_api", args=[plugin.code]))
        self.assertEqual(delete_res.status_code, 200)
        self.assertEqual(delete_res.content, "ok")
        
        """
        Confirm that plugin is empty.
        """
        #info_res = self.c.get(self.get_info_api(plugin.code), {})
        #info_res = self.c.get(reverse("sdk_private_filelist_api", args=[plugin.code]), {})
        info_res = self.c.get(reverse("sdk_plugin_filelist_api", args=[plugin.code]), {})
        self.assertEquals(info_res.status_code, 200)
        self.assertEquals(info_res.content, simplejson.dumps([]))
    
    def test_image(self):
        
        self.login()
        plugin = self.create_plugin()

        
        #update_res = self.c.post(reverse("sdk_restful_api", args=[plugin.code]), {
        update_res = self.c.post(reverse("sdk_plugin_api", args=[plugin.code]), {
            self.image_filepath: self.image_file_handler,
        })
        self.assertEqual(update_res.status_code, 200)
        self.assertEqual(update_res.content, "ok")
        
        #info_res = self.c.get(reverse('sdk_private_filelist_api', args=[plugin.code]), {})
        info_res = self.c.get(reverse('sdk_plugin_filelist_api', args=[plugin.code]), {})
        self.assertEquals(info_res.status_code, 200)
        self.assertEquals(info_res.content, simplejson.dumps([self.image_filepath]))
        
        #get_res = self.c.get(reverse('sdk_private_get_api', args=[plugin.code, self.image_filepath]))
        get_res = self.c.get(reverse('sdk_plugin_get_api', args=[plugin.code, self.image_filepath]))
        self.assertEqual(get_res.status_code, 200)
        self.assertEqual(get_res.content, self.image_content)
        self.assertTrue(get_res.get('Content-Type').find("image/jpeg")>=0)

        