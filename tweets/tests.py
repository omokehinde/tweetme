from django.contrib.auth import get_user_model
from django.http import response
from django.test import TestCase, client

from rest_framework.test import APIClient

from .models import Tweet, User

# Create your tests here.

User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(username='abc', password='somepassword')
        self.user2 = User.objects.create_user(username='abc2', password='somepassword')
        Tweet.objects.create(content='First Test tweet', user=self.user)
        Tweet.objects.create(content='Second Test tweet', user=self.user)
        Tweet.objects.create(content='Third Test tweet', user=self.user2)
        self.currentCount = Tweet.objects.all().count()

    def test_tweet_created(self):
        tweet = Tweet.objects.create(content='Fourth Test tweet', user=self.user)
        self.assertEquals(tweet.id, 4)
        self.assertEquals(tweet.content, tweet.content)
        self.assertEquals(tweet.user, self.user)
    
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client
    
    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweet/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
    
    def test_action_like(self):
        client = self.get_client() 
        response = client.post('/api/tweet/action/', {'id': '1', 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 1)
        print(response.json())
        # self.assertEquals(len(response.json()), 3)
    
    def test_action_unlike(self):
        client = self.get_client()
        response = client.post('/api/tweet/action/', {'id': '2', 'action': 'like'})
        self.assertEqual(response.status_code, 200)
        response = client.delete('/api/tweet/action/', {'id': '2', 'action': 'unlike'})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 0)
        print(response.json())
        # self.assertEquals(len(response.json()), 3)

    def test_action_retweet(self):
        client = self.get_client()
        current_count = self.currentCount
        response = client.post('/api/tweet/action/', {'id': '2', 'action': 'retweet'})
        self.assertEqual(response.status_code, 201)
        print(response.json())
        data = response.json()
        new_tweet_id = data.get('id')
        self.assertNotEqual(2, new_tweet_id)
        self.assertEqual(current_count+1, new_tweet_id)

    def test_create_api_view(self):
        request_data = {'content':'This is my test api view'}
        client = self.get_client()
        response = client.post('/api/tweet/create/', request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_tweet_id = response_data.get('id')
        self.assertNotEqual(3, new_tweet_id)
        self.assertEqual(self.currentCount+1, new_tweet_id)
    
    def tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get('/api/tweet/1/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        _id = data.get('id')
        self.assertEqual(_id, 1)
    
    def tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete('/api/tweet/1/')
        self.assertEqual(response.status_code, 200)
        response = client.delete('/api/tweet/1/')
        self.assertEqual(response.status_code, 404)
        response = client.delete('/api/tweet/3/')
        self.assertEqual(response.status_code, 403)