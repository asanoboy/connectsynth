from models import TwitterUser

def userinfo_processor(request):
    
    profile_image_url = ''
    screen_name = ''
    if request.user.is_authenticated():
        twuser = TwitterUser.objects.get(user=request.user)
        profile_image_url = twuser.profile_image_url
        screen_name = twuser.screen_name
    
    return {'screen_name':screen_name,
            'profile_image_url':profile_image_url}