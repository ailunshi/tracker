from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from utils import writing
from .models import WritingSession
from rest_framework.response import Response
from django.utils.timezone import now

SCRIV_FILE_PATH = "/Users/balloon/Bel e Kyre/Bel e Kyre.scriv/"

class StartTrackerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        print(f"checking user info: {request.user} and {request.META['CSRF_COOKIE']}")
        
        #check if get_word_count function is working:
        word_count = writing.get_word_count(SCRIV_FILE_PATH)
        print(f"Current word count: {word_count}")
        session = WritingSession.objects.create(user=user, word_count_start=word_count)
        return Response({
            "session_id": session.id,
            "start_time": session.start_time,
            "start_word_count": word_count,
        })

class StopTrackerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get("session_id")
        session = WritingSession.objects.get(id=session_id, user=request.user)
        session.end_time = now()
        session.word_count_end = writing.get_word_count(SCRIV_FILE_PATH)
        session.save()
        return Response({
            "end_time": session.end_time,
            "end_word_count": session.word_count_end,
        })
