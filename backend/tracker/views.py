import time
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from utils import writing

SCRIV_FILE_PATH = "/Users/balloon/Bel e Kyre/Bel e Kyre.scriv/"

class StartTrackerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        start_time = time.time()
        word_count = writing.get_word_count(SCRIV_FILE_PATH)
        return JsonResponse({
            "start_time": start_time,
            "start_word_count": word_count,
        })

class StopTrackerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        stop_time = time.time()
        word_count = writing.get_word_count(SCRIV_FILE_PATH)
        return JsonResponse({
            "stop_time": stop_time,
            "stop_word_count": word_count,
        })