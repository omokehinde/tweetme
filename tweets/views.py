from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .forms import TweetForm
from .models import Tweet, User
from .serializers import TweetSerializer, TweetActionSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here
def home_view(request, *args, **kwargs):
    """
    docstring
    """
    print(request.user or None)
    return render(request, "pages/home.html", context={}, status=200)

@api_view(['POST'])
# @authentication_classes([SessionAuthentication, MyCustomAuth])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    """
    DRF creates tweet 
    returns tweet created
    """
    serializer = TweetSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=403)

def tweet_create_view_pure_django(request, *args, **kwargs):
    """
    REST API Create View -> pure django
    """
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = TweetForm(request.POST or None)
    next_url = request.POST.get('next') or None
    print('next url', next_url)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm()
    if form.errors:
        return JsonResponse(form.errors, status=400)
    return render(request, 'components/form.html', context={"form":form})

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    """
    DRF
    returns json data
    """
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def tweet_detail_view(request,tweet_id, *args, **kwargs):
    """
    DRF
    returns json data
    """
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists:
        return Response({}, status=404)
    data = qs.first()
    serializer = TweetSerializer(data)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    """
    id is required.
    Action options are: like, unlike, retweet
    """
<<<<<<< HEAD
    serializer = TweetActionSerializer(data=request.POST)
=======
    serializer = TweetActionSerializer(request.POST)
>>>>>>> 39a5397600c517d25a9352e239163f1ff3579852
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists:
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'Tweet does not exist'}, status=404)
    obj = qs.first()
    if action == 'like':
        obj.likes.add(request.user)
    elif action == 'unlike':
        obj.likes.remove(request.user)
    elif action == 'retweet':
<<<<<<< HEAD
        # this is todo
=======
        # this is to do
>>>>>>> 39a5397600c517d25a9352e239163f1ff3579852
        pass
    return Response({}, status=200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request,tweet_id, *args, **kwargs):
    """
    DRF
    deletes tweet
    """
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists:
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'message':'You cannot delete this tweet'}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({'message': 'Tweet deleted'}, status=200)

def tweet_list_view_pure_django(request, *args, **kwargs):
    """
    REST API VIEW
    returns json data
    """
    qs = Tweet.objects.all()
    tweets_list = [x.serialize() for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW 
    return json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        tweet = Tweet.objects.get(id=tweet_id)
        data["content"] = tweet.content
    except:
        data["error_msg"] = "Not found"
        status = 404
    return JsonResponse(data, status=status)
