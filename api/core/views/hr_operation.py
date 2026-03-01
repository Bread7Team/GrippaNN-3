from rest_framework import viewsets
from core.models import HrOperation, ChangeHistory
from core.serializers import HrOperationSerializer, ChangeHistorySerializer

class HrOperationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HrOperation.objects.all()
    serializer_class = HrOperationSerializer

class ChangeHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ChangeHistory.objects.all()
    serializer_class = ChangeHistorySerializer
