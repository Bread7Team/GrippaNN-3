from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import Department
from core.serializers import DepartmentSerializer, DepartmentTreeSerializer
from core.mixins import ChangeHistoryMixin, SoftDeleteMixin
from core.permissions import IsAdminOrHrManager


class DepartmentViewSet(SoftDeleteMixin, ChangeHistoryMixin, viewsets.ModelViewSet):
    """CRUD для отделов (с soft-delete и историей)."""

    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    search_fields = ['name']
    ordering_fields = ['name', 'id']
    filterset_fields = ['organization']
    history_object_type = 'department'

    def get_queryset(self):
        qs = Department.objects.select_related('organization', 'parent')
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs

    @action(detail=False, methods=['get'])
    def tree(self, request):
        """Возвращает дерево отделов для указанной организации."""
        org_id = request.query_params.get('organization')
        if not org_id:
            return Response({'error': 'Параметр organization обязателен'}, status=400)
        
        roots = Department.objects.filter(
            organization_id=org_id, 
            parent__isnull=True, 
            deleted_at__isnull=True
        )
        serializer = DepartmentTreeSerializer(roots, many=True)
        return Response(serializer.data)
