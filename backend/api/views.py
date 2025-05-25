from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import RecordSerializer, UserSerializer
from django.contrib.auth import get_user_model
from django.db import connection

User = get_user_model()

class TableDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, table_name):
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM {table_name}")
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()
                if rows:
                    data = [dict(zip(columns, row)) for row in rows]
                else:
                    # Return single row with empty values
                    data = [dict((col, "") for col in columns)]
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

    def post(self, request, table_name):
        try:
            payload = request.data  # should be a dict of column-value pairs

            # Remove 'id' if empty or null to allow auto-increment
            if 'id' in payload and not payload['id']:
                del payload['id']

            # Remove 'created_at' if empty to allow default timestamp
            if 'created_at' in payload and not payload['created_at']:
                del payload['created_at']

            columns = ', '.join(payload.keys())
            values = ', '.join([f"'{v}'" for v in payload.values()])
            query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
            with connection.cursor() as cursor:
                cursor.execute(query)
            return Response({"message": "Row inserted successfully"}, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
        
class TableRowView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, table_name, pk):
        try:
            payload = request.data
            set_clause = ', '.join([f"{k}='{v}'" for k, v in payload.items()])
            query = f"UPDATE {table_name} SET {set_clause} WHERE id = {pk}"
            with connection.cursor() as cursor:
                cursor.execute(query)
            return Response({"message": "Row updated successfully"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def delete(self, request, table_name, pk):
        try:
            query = f"DELETE FROM {table_name} WHERE id = {pk}"
            with connection.cursor() as cursor:
                cursor.execute(query)
            return Response({"message": "Row deleted successfully"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

# APIView version of UserRegisterView for handling user registration
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SQLQueryView(APIView):
    permission_classes = [IsAuthenticated]

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
        
class CreateTableView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            table_name = request.data.get("table_name")
            columns = request.data.get("columns")  # Expecting a list of dictionaries
            if not table_name or not columns:
                return Response({"error": "Table name and columns are required."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Add auto columns
            auto_columns = [
                {"name": "id", "type": "SERIAL PRIMARY KEY"},
                {"name": "created_at", "type": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"}
            ]

            # Combine columns (auto + user-defined)
            full_column_list = auto_columns + columns

            # Construct the SQL query to create a table
            column_definitions = ", ".join([f"{col['name']} {col['type']}" for col in full_column_list])
            query = f"CREATE TABLE {table_name} ({column_definitions});"

            # Execute the query
            with connection.cursor() as cursor:
                cursor.execute(query)

            return Response({"message": "Table created successfully!"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class TableListView(APIView):
    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
                tables = [row[0] for row in cursor.fetchall()]
            return Response({"tables": tables})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class TableColumnsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, table_name):
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
                columns = [col[0] for col in cursor.description]
            return Response({"columns": columns})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
class DropTableView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, table_name):
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"DROP TABLE {table_name}")
            return Response({"message": f"Table '{table_name}' dropped successfully."})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TruncateTableView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, table_name):
        try:
            with connection.cursor() as cursor:
                cursor.execute(f"TRUNCATE TABLE {table_name}")
            return Response({"message": f"Table '{table_name}' truncated successfully."})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            