from rest_framework import serializers
from core.models import HrOperation, ChangeHistory

class HrOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrOperation
        fields = '__all__'

class ChangeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChangeHistory
        fields = '__all__'
