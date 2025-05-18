from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Record
from .serializers import RecordSerializer, UserSerializer
from django.contrib.auth import get_user_model
from django.db import connection

User = get_user_model()

# APIView version of RecordViewSet for handling GET (list) and POST (create) requests
class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

# APIView version of UserRegisterView for handling user registration
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SQLQueryView(APIView):
    def post(self, request):
        query = request.data.get('query')
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                if cursor.description:
                    columns = [col[0] for col in cursor.description]
                    rows = cursor.fetchall()
                    data = [dict(zip(columns, row)) for row in rows]
                    return Response({"status": "success", "data": data}, status=status.HTTP_200_OK)
                return Response({"status": "success", "message": "Query executed successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            