from django.conf import settings
from rest_framework import serializers

from .models import Tweet

MAX_TWEET_LENGHT = settings.MAX_TWEET_LENGHT

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['content']

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGHT:
            raise serializers.ValidationError('Tweet should be less than 240 characters')
        return value