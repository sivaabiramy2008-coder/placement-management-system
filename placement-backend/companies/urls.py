from django.urls import path

from .views import companies_list, company_detail


urlpatterns = [
    path('companies/', companies_list, name='companies-list'),
    path(
        'companies/<int:company_id>/',
        company_detail,
        name='company-detail'
    ),
]