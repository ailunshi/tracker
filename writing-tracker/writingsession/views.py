from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
#from utils.writing import start_session
import threading

# Create your views here.
def home(request):
    return render(request, 'writingsession/base.html')

"""@csrf_exempt
def start_session_view(request):
    if request.method == 'POST':
        thread = threading.Thread(target=start_session)
        thread.start()
        return JsonResponse({'status': 'success'})
    
    return JsonResponse({'status': 'error'})"""
