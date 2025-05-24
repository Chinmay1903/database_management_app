from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  TableDataView, TableRowView, UserRegisterView, SQLQueryView, CreateTableView, TableListView, TableColumnsView, DropTableView, TruncateTableView

urlpatterns = [
    path('table/<str:table_name>/', TableDataView.as_view(), name='table-data'),
    path('table/<str:table_name>/<int:pk>/', TableRowView.as_view(), name='table-row'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('execute/', SQLQueryView.as_view(), name='execute-query'),
    path('create-table/', CreateTableView.as_view(), name='create-table'),
    path('tables/', TableListView.as_view(), name='table-list'),
    path('table-columns/<str:table_name>/', TableColumnsView.as_view(), name='table-columns'),
    path('table/drop/<str:table_name>/', DropTableView.as_view(), name='drop-table'),
    path('table/truncate/<str:table_name>/', TruncateTableView.as_view(), name='truncate-table'),
]
